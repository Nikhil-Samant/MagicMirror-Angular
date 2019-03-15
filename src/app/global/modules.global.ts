import { ClockComponent } from '../module/clock/clock.component';
import { CalendarComponent } from '../module/calendar/calendar.component';
import { WeatherComponent } from '../module/weather/weather.component';

export let Modules: Map<string, any> = new Map<string, any>();

// tslint:disable-next-line:no-string-literal
Modules['ClockComponent'] = ClockComponent;
// tslint:disable-next-line:no-string-literal
Modules['CalenderComponent'] = CalendarComponent;
// tslint:disable-next-line:no-string-literal
Modules['WeatherComponent'] = WeatherComponent;