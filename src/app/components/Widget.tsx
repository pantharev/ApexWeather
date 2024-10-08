import { TiWeatherCloudy, TiWeatherSunny, TiWeatherDownpour, TiWeatherSnow, TiWeatherStormy, TiWeatherShower   } from "react-icons/ti";
import WeatherModal from "./WeatherModal";

export default function Widget({ title, description, image, weather, weatherDay }: { title: string, description: string, image: string, weather: string, weatherDay?: any}) {
  
  let weatherIcon = null;

  switch(weather) {
    case "Sunny":
      weatherIcon = <TiWeatherSunny />;
      break;
    case "Cloudy":
      weatherIcon = <TiWeatherCloudy />;
      break;
    case "Rainy":
      weatherIcon = <TiWeatherShower />;
      break;
    case "Snowy":
      weatherIcon = <TiWeatherSnow />;
      break;
    default:
      weatherIcon = <TiWeatherCloudy />;
  }
  
  return (
    <div className="flex items-center p-1 bg-blue-100 rounded-[100px] shadow-lg text-royalBlue transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-200">
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <img src={image} alt={title} className="w-12 h-12" />
      <p className="mt-2">{description}</p>
      <div className="mt-4">{weatherIcon}</div>
      <WeatherModal title={title} description={description} image={image} weather={weather} weatherDay={JSON.stringify(weatherDay)} />
    </div>
  );
}