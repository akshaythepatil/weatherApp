import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent {


weatherData:any;

ngOnInit() {
  this.weatherData = {
    main : {},
    isDay: true
  };
  this.getWeatherData();
  console.log(this.weatherData);
}

getWeatherData()
{
  fetch('https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=dc2d40d2f3f3b80cf21851bb4273d2d0')
  .then(response=>response.json())
  .then(data=>{this.setWeatherData(data);})
  // let data=JSON.parse('{"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":275.92,"feels_like":275.92,"temp_min":274.29,"temp_max":281.08,"pressure":1031,"humidity":79,"sea_level":1031,"grnd_level":942},"visibility":10000,"wind":{"speed":0.92,"deg":245,"gust":0.86},"clouds":{"all":7},"dt":1708233969,"sys":{"type":2,"id":2011351,"country":"IT","sunrise":1708236757,"sunset":1708274863},"timezone":3600,"id":3163858,"name":"Zocca","cod":200}');
  // this.setWeatherData(data);
}

setWeatherData(data:any)
{
this.weatherData=data;
let sunsetTime=new Date(this.weatherData.sys.sunset*1000);
this.weatherData.sunset_time=sunsetTime.toLocaleTimeString();

let currentDate=new Date();
this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);

}

}
