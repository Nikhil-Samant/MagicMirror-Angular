import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/service/configService/config.service';
import { WeatherService } from 'src/app/service/weatherService/weather.service';
import { Module } from 'src/app/global/config.global';
import * as _ from 'lodash';
import { WeatherObject } from 'src/app/global/weather.global';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less']
})
export class WeatherComponent implements OnInit {
  public module: Module;
  public current: WeatherObject;
  public loaded = false;
  private defaults: any = {
    updateInterval: 5000,
    reloadInterval: 60 * 60 * 1000,
    weatherProvider: 'openweathermap',
    roundTemp: false,
    type: 'current', // current, forecast
    location: true,
    locationID: false,
    cityName: 'Thane',
    country: 'In',
    appid: '',
    units: 'metric',
    animationSpeed: 1000,
    timeFormat: 24,
    showPeriod: true,
    showPeriodUpper: false,
    showWindDirection: true,
    showWindDirectionAsArrow: false,
    useBeaufort: false,
    showHumidity: false,
    degreeLabel: false,
    showIndoorTemperature: false,
    showIndoorHumidity: false,
    apiVersion: '2.5',
    apiBase: 'http://api.openweathermap.org/data/',
    weatherEndpoint: '/weather',
    forecastEndpoint: '/forecast',
    apiKey: 'Your API Key',
    appendLocationNameToHeader: true,
    calendarClass: 'calendar',
    tableClass: 'small',
    onlyTemp: false,
    showRainAmount: true,
    colored: false,
    showFeelsLike: false
  };
  constructor(public weatherService: WeatherService, private configService: ConfigService) {}

  ngOnInit() {
    const conf = this.configService.getConf();
    this.module = this.configService.mapDefaultConfigs('weather', this.defaults, conf);
    this.weatherService.fetchWeather(this.module.config);
    this.reloadWeatherDetails();
    setInterval(() => {
      this.getWeather();
      }, this.module.config.updateInterval);
  }

  getWeather() {
    this.current = this.weatherService.getWeather();
    if (!_.isEmpty(this.current)) {
      this.loaded = true;
    }
    return this.current;
  }

  reloadWeatherDetails() {
   setInterval(() => {
    this.weatherService.fetchWeather(this.module.config);
    }, this.module.config.reloadInterval);
  }
}
