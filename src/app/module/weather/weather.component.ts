import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/service/configService/config.service';
import { WeatherService } from 'src/app/service/weatherService/weather.service';
import { Module } from 'src/app/global/config.global';
import { WeatherObject } from 'src/app/global/weather.global';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less']
})
export class WeatherComponent implements OnInit {
  public module: Module = new Module();
  public current = new WeatherObject();
  public loaded = false;
  public service: WeatherService;
  private defaults: any = {
    updateInterval: 10 * 60 * 1000,
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

    initialLoadDelay: 0, // 0 seconds delay
    retryDelay: 2500,

    apiVersion: '2.5',
    apiBase: 'http://api.openweathermap.org/data/',
    weatherEndpoint: '/weather',
    forecastEndpoint: '/forecast',
    apiKey: '200c42689d5de66cd3fee0fd8f9e4347',

    appendLocationNameToHeader: true,
    calendarClass: 'calendar',
    tableClass: 'small',

    onlyTemp: false,
    showRainAmount: true,
    colored: false,
    showFeelsLike: false
  };
  constructor(private weatherService: WeatherService, private configService: ConfigService) {
    this.service = weatherService;
  }

  ngOnInit() {
    const conf = this.configService.getConf();
    this.module = conf.modules.find((c: { module: string; }) => c.module === 'weather');
    this.module.config = Object.assign(this.defaults, this.module.config);
    this.weatherService.fetchWeather(this.module.config);
    this.current = this.weatherService.getWeather();
    this.loaded = true;
    console.log(this.module.config);
    console.log(this.current);
  //   setInterval(() => {
  //     this.loaded = true;
  //     this.GetWeather();
  //  }, 1000);
  }

  // GetWeather() {
  //   this.current = this.weatherService.getWeather();
  //   return this.current;
  // }
}
