"use client";
import Image from "next/image";
import Widget from "./components/Widget";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import SubscriptionModal from "./components/SubscriptionModal";
import moment from "moment";
import MiniWidget from "./components/MiniWidget";
import Slider from "react-slick";
import SimpleSlider from "./components/SimpleSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ToggleSystem from "./components/ToggleSystem";

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
  const [isCelcius, setIsCelcius] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };

  const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    Modal.setAppElement('#modals');
    const weatherCondition = weather?.current?.condition.text;
    const isDay = weather?.current?.is_day;
    // change based on current weather. so when Get Weather is pressed, change the background color.

    weather?.forecast.forecastday.map((day) => {
      console.log("Day: ", day);
      console.log("Hour");
      console.log("Hour: ", day.hour);
      day.hour.map((hour) => {
        console.log("hour time: ", hour.time);
      })
    });

    console.log("Weather Condition: ", weatherCondition);
    if(weatherCondition && weatherCondition.includes("Rain") || weatherCondition?.includes("rain") || weatherCondition?.includes("Drizzle") || weatherCondition?.includes("drizzle")) {
      changeBackground('0, 0, 0', '128, 128, 128');
      changeForeground('255, 255, 255');
    } else if(weatherCondition && weatherCondition.includes("Cloudy") || weatherCondition?.includes("cloudy")) {
      changeBackground('128, 128, 128', '219, 219, 219');
      changeForeground('0, 0, 0');
    } else if(weatherCondition?.includes("Sunny")) {
      changeBackground('120, 199, 255', '238, 248, 255');
      changeForeground('0, 0, 0');
    } else if(weatherCondition?.includes("snow") || weatherCondition?.includes("Snow")) {
      changeBackground('246, 250, 252', '255, 255, 255');
      changeForeground('0, 0, 0');
    } else if(weatherCondition?.includes("Clear") || weatherCondition?.includes("clear") && isDay === 0) {
      changeBackground('0, 0, 0', '0, 0, 0');
      changeForeground('255, 255, 255');
    } else if(weatherCondition?.includes("Clear") || weatherCondition?.includes("clear") && isDay === 1) {
      changeBackground('120, 199, 255', '120, 199, 255');
      changeForeground('255, 255, 255');
    }
  }, [weather])

  const changeBackground = (start: string, end: string) => {
    const root = document.documentElement;
    root.style.setProperty('--background-start-rgb', start);
    root.style.setProperty('--background-end-rgb', end);
  };

  const changeForeground = (color: string) => {
    const root = document.documentElement;
    root.style.setProperty('--foreground-rgb', color);
  };

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

  function handleToggle(isOn: boolean) {
    console.log("Toggle: ", isOn);
    setIsCelcius(isOn);
  }

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <ToggleSystem onChange={handleToggle} />
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
      
      {weather && (
            <Widget title="Today" description={`${isCelcius ? weather.current?.temp_c + "°C" : weather.current?.temp_f + "°F"}` + " - " + weather.current?.condition.text} image={weather.current?.condition.icon} weather={weather.current?.condition.text} />
      )}
      {weather && (<div className="grid grid-cols-1 gap-5 lg:grid-cols-3 items-center">

      {weather && <h1 className="font-bold text-xl">Weekly forecast</h1>}
      <Slider {...settings2}>
        {weather && (
          weather?.forecast?.forecastday?.map((day) => (
            <div key={day.date} className="my-5">
              <Widget title={getWeekdayFromDate(day.date)} description={day.day.condition.text + " - " + `${isCelcius ? day.day.avgtemp_c + "°C" : day.day.avgtemp_f + "°F"}` + " - " + day.day.daily_chance_of_rain + "%" + " - max wind " + day.day.maxwind_mph + "mph"} image={day.day.condition.icon} weather={day.day.condition.text} weatherDay={day.day} />
            </div>
          ))
        )}
      </Slider>
      {/* {weather.forecast.forecastday.map((day) => (
        <div key={day.date} className="my-5">
          <Widget title={getWeekdayFromDate(day.date)} description={day.day.condition.text + " - " + day.day.avgtemp_f + "°F - " + day.day.avgtemp_c + "°C - rain " + day.day.daily_chance_of_rain + "%" + " - max wind " + day.day.maxwind_mph + "mph"} image={day.day.condition.icon} weather={day.day.condition.text} weatherDay={day.day} />
        </div>
      ))} */}

      {weather && <h1 className="font-bold text-xl">Hourly forecast</h1>}
      {weather && (
        weather?.forecast.forecastday.map((day) => (
          <div className="my-5 p-3 bg-blue-400 rounded-md">
            <p className="text-left text-white font-bold">{moment(day.hour[0].time).format("dddd, MMMM D")}</p>
            <Slider {...settings}>
            {day.hour.map((hour) => (
              <div key={hour.time_epoch} className="my-5 bg-blue-400 rounded-md">
                {/* <MiniWidget time={moment(hour.time).format("h:mm A")} image={hour.condition.icon} temperature={hour.temp_f + "°F - " + hour.temp_c + "°C - rain " + hour.chance_of_rain + "% - wind " + hour.wind_dir + " " + hour.wind_mph + " mph"} /> */}
                <MiniWidget time={moment(hour.time).format("h A")} image={hour.condition.icon} temperature={Math.round(hour.temp_f) + "°"} rain={hour.chance_of_rain + "%"} />
              </div>
            ))}
            </Slider>
          </div>
        ))
      )}
      </div>
      )}
    </main>
    </>
  );
}
