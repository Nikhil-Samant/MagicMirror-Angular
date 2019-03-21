import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/configService/config.service';
import { NewsService } from 'src/app/service/newsService/news.service';
import { Module } from 'src/app/global/config.global';
import * as _ from 'lodash';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {
  public module: Module;
  public loaded = false;
  public newsItem: any;
  public activeItem = 0;

  private defaults: any = {
    updateInterval: 5000,
    country: 'in',
    newstype: '/top-headlines',
    initialLoadDelay: 0, // 0 seconds delay
    retryDelay: 2500,
    apiVersion: 'v2',
    apiBase: 'https://newsapi.org/',
    apiKey: 'dbd9f99ca8c54512af1f1165ab16e928',
    showSourceTitle: true,
    showPublishDate: true,
    showDescription: false,
    wrapTitle: true,
    wrapDescription: true,
    truncDescription: true,
    lengthDescription: 400,
    reloadInterval: 60 * 60 * 1000,
    hideLoading: false,
    animationSpeed: 2.5 * 1000,
    maxNewsItems: 0, // 0 for unlimited
    ignoreOldItems: false,
    ignoreOlderThan: 24 * 60 * 60 * 1000, // 1 day
  };

  constructor(private configService: ConfigService, private news: NewsService) { }

  ngOnInit() {
    const conf = this.configService.getConf();
    this.module = this.configService.mapDefaultConfigs('news', this.defaults, conf);
    this.news.fetchNews(this.module.config);
    this.reloadNewsItems();
    setInterval(() => {
      this.getNews();
      }, this.module.config.updateInterval);
  }

  getNews() {
    this.newsItem = this.news.getNews();
    if (!_.isEmpty(this.newsItem)) {
      this.loaded = true;
    }
    return this.newsItem;
  }

  reloadNewsItems() {
   setInterval(() => {
    this.news.fetchNews(this.module.config);
    }, this.module.config.reloadInterval);
  }

}
