import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private activeItem = 0;
  private NEWS_KEY = 'newsKey';
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public http: HttpClient) {}

  private getParams(config: any): string {
    let params = '?';
    if(config.country) {
      params += 'country=' + config.country;
    }
    if (config.category) {
      params += 'category=' + config.category;
    }
    if (config.newstype === '/sources' && (!config.country || !config.category)) {
      params += 'sources=' + config.sources;
    }
    if (config.specific) {
      params += 'q=' + config.specific;
    }
    if (config.page) {
      params += 'q=' + config.cityName;
    }

    params += '&apiKey=' + config.apiKey;

    return params;
  }

  private getUrl(config: any): string {
    let url: string;
    url = config.apiBase + config.apiVersion + config.newstype;
    url += this.getParams(config);
    return url;
  }

  private saveNewsInLocal(key: string, val: any) {
    this.storage.set(key, val);
  }

  private getNewsInfoFromLocal(key) {
    return this.storage.get(key);
  }

  public async fetchNews(config: any) {
    const url = this.getUrl(config);
    await this.http.get(url).subscribe(news => {
      this.saveNewsInLocal(this.NEWS_KEY, news);
    });
  }

  public getNews() {
    let news;
    const newsItem = this.getNewsInfoFromLocal(this.NEWS_KEY);
    if (this.activeItem >= newsItem.articles.length) {
      this.activeItem = 0;
    }

    if (newsItem.articles.length > 0) {
      news = newsItem.articles[this.activeItem];
      news.source.name += ', ' + moment(new Date(news.publishedAt)).fromNow();
    }
    this.activeItem++;
    return news;
  }
}
