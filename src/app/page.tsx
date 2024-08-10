"use client";
import Image from "next/image";
import Widget from "./components/Widget";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import SubscriptionModal from "./components/SubscriptionModal";

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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    color: 'black',
  },
};

export default function Home() {
  let subtitle: HTMLHeadingElement | null;
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#modals');
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      <div className="font-bold text-black flex flex-col items-center space-y-5">
        <div>Subscribe here to be notified daily of the latest weather forecast in your area: </div>
        <div>{<SubscriptionModal />}</div>
      </div>
      <form onSubmit={fetchWeather} className="my-5 flex flex-col items-center space-y-5">
        <h1 className="font-bold text-black">Enter the name of a city below to see its forecast:</h1>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="text-black border-black border-2" />
        <button type="submit" className="bg-royalBlue text-white p-2 rounded-md">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {/* {weather && (
            <Widget title={weather.location?.name} description={`${weather.current?.temp_f}°F - ${weather.current?.condition.text}`} image={weather.current?.condition.icon} weather={weather.current?.condition.text} />
      )} */}
            
      <h2 className="font-bold text-royalBlue text-xl">{weather?.location?.name}</h2>
      {weather && (<div className="grid grid-cols-4 gap-5 lg:grid-cols-4 items-center">
      {weather && (
            <Widget title="Today" description={`${weather.current?.temp_f}°F - ${weather.current?.temp_c}°C - ${weather.current?.condition.text}`} image={weather.current?.condition.icon} weather={weather.current?.condition.text} />
      )}
      {weather.forecast.forecastday.map((day) => (
        <div key={day.date} className="my-5">
          <Widget title={getWeekdayFromDate(day.date)} description={day.day.condition.text + " - " + day.day.avgtemp_f + "°F - " + day.day.avgtemp_c + "°C"} image={day.day.condition.icon} weather={day.day.condition.text} weatherDay={day.day} />
        </div>
      ))}
      </div>
      )}
    </main>
  );
}
