import { ClockComponent } from '../module/clock/clock.component';
import { CalendarComponent } from '../module/calendar/calendar.component';
import { WeatherComponent } from '../module/weather/weather.component';
import { NewsComponent } from '../module/news/news.component';

export let Modules: Map<string, any> = new Map<string, any>();

Modules['ClockComponent'] = ClockComponent;
Modules['CalenderComponent'] = CalendarComponent;
Modules['WeatherComponent'] = WeatherComponent;
Modules['NewsComponent'] = NewsComponent;
