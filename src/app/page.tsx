"use client";
import Image from "next/image";
import Widget from "./components/Widget";
import { useState } from "react";

type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

type WeatherLocation = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

type WeatherCurrent = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

type WeatherForecastDay = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: WeatherCondition;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
  };
  hour: WeatherHour[];
};

type WeatherHour = {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
};

type WeatherForecast = {
  forecastday: WeatherForecastDay[];
};

type WeatherData = {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: WeatherForecast;
};

type ErrorType = {
  message: string;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const fetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const response = await fetch(`/api/weather`, {
      method: "POST",
      body: JSON.stringify({ city: city }),
    });
    const data = await response.json();
    console.log("Weather Data: ", data);
    setWeather(data);
    setLoading(false);
  };

  function getWeekdayFromDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center text-royalBlue">Welcome to ApexWeather!</h1>
      <p className="text-royalBlue my-5">Here you can check the weather and share with your family, friends, colleagues, strangers, anyone!</p>
      <form onSubmit={fetchWeather} className="my-5">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="text-black" />
        <button type="submit" className="bg-royalBlue text-white p-2 rounded-md">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {weather && (
            <Widget title={weather.location?.name} description={`${weather.current?.temp_f}°F - ${weather.current?.condition.text}`} image={weather.current?.condition.icon} weather={weather.current?.condition.text} />
      )}
      {weather && (<div className="grid grid-cols-2 gap-5 lg:grid-cols-3 items-center">
      {weather.forecast.forecastday.map((day) => (
        <div key={day.date} className="my-5">
          <Widget title={getWeekdayFromDate(day.date)} description={day.day.condition.text + " - " + day.day.avgtemp_f + "°F"} image={day.day.condition.icon} weather={day.day.condition.text} />
        </div>
      ))}
      </div>
      )}
      {/* //   <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-5">
      //     <Widget
      //     title="Monday"
      //     description="The temperature is 75 degrees Fahrenheit. It is sunny."
      //     image="/images/1.jpg"
      //     weather="Sunny"
      //   />
      //   <Widget
      //     title="Tuesday"
      //     description="The temperature is 65 degrees Fahrenheit. It is rainy."
      //     image="/images/2.jpg"
      //     weather="Rainy"
      //   />
      //   <Widget
      //     title="Wednesday"
      //     description="The temperature is 80 degrees Fahrenheit. It is sunny."
      //     image="/images/3.jpg"
      //     weather="Sunny"
      //   />
      //   <Widget
      //     title="Thursday"
      //     description="The temperature is 55 degrees Fahrenheit. It is rainy."
      //     image="/images/4.jpg"
      //     weather="Rainy"
      //   />
      //   <Widget
      //     title="Friday"
      //     description="The temperature is 32 degrees Fahrenheit. It is snowing."
      //     image="/images/5.jpg"
      //     weather="Snowy"
      //   />
      //   <Widget
      //     title="Saturday"
      //     description="The temperature is 70 degrees Fahrenheit. It is cloudy."
      //     image="/images/6.jpg"
      //     weather="Cloudy"
      //   />
      // </div>   */}
    </main>
  );
}
