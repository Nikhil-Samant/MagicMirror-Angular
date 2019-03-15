import * as moment from 'moment';

export class WeatherObject {
  units: string;
  date: Date;
  windSpeed: number;
  windDirection: number;
  sunrise: Date;
  sunset: Date;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  weatherType: string;
  humidity: number;
  rain: number;

  constructor() {
    this.units = null;
    this.date = null;
    this.windSpeed = null;
    this.windDirection = null;
    this.sunrise = null;
    this.sunset = null;
    this.temperature = null;
    this.minTemperature = null;
    this.maxTemperature = null;
    this.weatherType = null;
    this.humidity = null;
    this.rain = null;
  }
}
