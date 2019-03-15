import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherObject } from 'src/app/global/weather.global';
import * as moment from 'moment';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends WeatherObject {
  private weatherInfo: WeatherObject;
  private WEATHER_KEY = 'WeatherKey';
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, public http: HttpClient) {
    super();
  }

  private getUrl(config: any): string {
    let url: string;
    // Check whether you are calling for Current or Forecast
    if (config.type === 'current') {
      url =  config.apiBase + config.apiVersion + config.weatherEndpoint;
    } else {
      url = config.apiBase + config.apiVersion + config.forecastEndpoint;
    }
    url += this.getParams(config);
    return url;
  }

  private getParams(config: any): string {
    let params = '?';
    if(config.locationID) {
      params += 'id=' + config.locationID;
    } else if (config.location) {
      params += 'q=' + config.cityName + ',' + config.country;
    }
    // else {
    //   this.hide(this.config.animationSpeed, {lockString: this.identifier});
    //   return;
    // }

    params += '&units=' + config.units;
    params += '&lang=' + config.lang;
    params += '&APPID=' + config.apiKey;

    return params;
  }

  public async fetchWeather(config: any) {
    const url = this.getUrl(config);
    const weather = await this.http.get(url).toPromise();
    this.weatherInfo = this.generateWeatherObjectFromCurrentWeather(weather);
    this.saveWeatherInfoInLocal(this.WEATHER_KEY, this.weatherInfo);
  }

  public getWeather() {
    return this.getWeatherInfoFromLocal(this.WEATHER_KEY);
  }

  private generateWeatherObjectFromCurrentWeather(currentWeatherData: any) {
    const currentWeather = new WeatherObject();
    currentWeather.humidity = currentWeatherData.main.humidity;
    currentWeather.temperature = currentWeatherData.main.temp;
    currentWeather.windSpeed = currentWeatherData.wind.speed;
    currentWeather.windDirection = currentWeatherData.wind.deg;
    currentWeather.weatherType = this.convertWeatherType(currentWeatherData.weather[0].icon);
    currentWeather.sunrise = moment(currentWeatherData.sys.sunrise, 'X');
    currentWeather.sunset = moment(currentWeatherData.sys.sunset, 'X');
    return currentWeather;
  }

  private saveWeatherInfoInLocal(key, val): void {
    this.storage.set(key, val);
    this.weatherInfo = this.storage.get(key);
  }

  private getWeatherInfoFromLocal(key): WeatherObject {
    this.weatherInfo = this.storage.get(key);
    return this.weatherInfo;
  }

  public cardinalWindDirection(): string {
    if (this.windDirection > 11.25 && this.windDirection <= 33.75) {
      return 'NNE';
    } else if (this.windDirection > 33.75 && this.windDirection <= 56.25) {
      return 'NE';
    } else if (this.windDirection > 56.25 && this.windDirection <= 78.75) {
      return 'ENE';
    } else if (this.windDirection > 78.75 && this.windDirection <= 101.25) {
      return 'E';
    } else if (this.windDirection > 101.25 && this.windDirection <= 123.75) {
      return 'ESE';
    } else if (this.windDirection > 123.75 && this.windDirection <= 146.25) {
      return 'SE';
    } else if (this.windDirection > 146.25 && this.windDirection <= 168.75) {
      return 'SSE';
    } else if (this.windDirection > 168.75 && this.windDirection <= 191.25) {
      return 'S';
    } else if (this.windDirection > 191.25 && this.windDirection <= 213.75) {
      return 'SSW';
    } else if (this.windDirection > 213.75 && this.windDirection <= 236.25) {
      return 'SW';
    } else if (this.windDirection > 236.25 && this.windDirection <= 258.75) {
      return 'WSW';
    } else if (this.windDirection > 258.75 && this.windDirection <= 281.25) {
      return 'W';
    } else if (this.windDirection > 281.25 && this.windDirection <= 303.75) {
      return 'WNW';
    } else if (this.windDirection > 303.75 && this.windDirection <= 326.25) {
      return 'NW';
    } else if (this.windDirection > 326.25 && this.windDirection <= 348.75) {
      return 'NNW';
    } else {
      return 'N';
    }
  }

  public beaufortWindSpeed(): number {
    const windInKmh =
      this.units === 'imperial'
        ? this.windSpeed * 1.609344
        : (this.windSpeed * 60 * 60) / 1000;
    const speeds: number[] = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
    for (const speed of speeds) {
      if (speed > windInKmh) {
        return speed;
      }
    }
    return 12;
  }

  public nextSunAction(): string {
    return moment().isBetween(this.sunrise, this.sunset) ? 'sunset' : 'sunrise';
  }

  public feelsLike(): number {
    const windInMph =
      this.units === 'imperial' ? this.windSpeed : this.windSpeed * 2.23694;
    const tempInF =
      this.units === 'imperial'
        ? this.temperature
        : (this.temperature * 9) / 5 + 32;
    let feelsLike = tempInF;

    if (windInMph > 3 && tempInF < 50) {
      feelsLike = Math.round(
        35.74 +
          0.6215 * tempInF -
          35.75 * Math.pow(windInMph, 0.16) +
          0.4275 * tempInF * Math.pow(windInMph, 0.16)
      );
    } else if (tempInF > 80 && this.humidity > 40) {
      feelsLike =
        -42.379 +
        2.04901523 * tempInF +
        10.14333127 * this.humidity -
        0.22475541 * tempInF * this.humidity -
        6.83783 * Math.pow(10, -3) * tempInF * tempInF -
        5.481717 * Math.pow(10, -2) * this.humidity * this.humidity +
        1.22874 * Math.pow(10, -3) * tempInF * tempInF * this.humidity +
        8.5282 * Math.pow(10, -4) * tempInF * this.humidity * this.humidity -
        1.99 *
          Math.pow(10, -6) *
          tempInF *
          tempInF *
          this.humidity *
          this.humidity;
    }

    return this.units === 'imperial' ? feelsLike : ((feelsLike - 32) * 5) / 9;
  }

  public convertWeatherType(weatherType): string {
    const weatherTypes = {
      '01d': 'day-sunny',
      '02d': 'day-cloudy',
      '03d': 'cloudy',
      '04d': 'cloudy-windy',
      '09d': 'showers',
      '10d': 'rain',
      '11d': 'thunderstorm',
      '13d': 'snow',
      '50d': 'fog',
      '01n': 'night-clear',
      '02n': 'night-cloudy',
      '03n': 'night-cloudy',
      '04n': 'night-cloudy',
      '09n': 'night-showers',
      '10n': 'night-rain',
      '11n': 'night-thunderstorm',
      '13n': 'night-snow',
      '50n': 'night-alt-cloudy-windy'
    };

    return weatherTypes.hasOwnProperty(weatherType) ? weatherTypes[weatherType] : null;
	}
}
