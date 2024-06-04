import { TiWeatherCloudy, TiWeatherSunny, TiWeatherDownpour, TiWeatherSnow, TiWeatherStormy, TiWeatherShower   } from "react-icons/ti";

export default function Widget({ title, description, image, weather }: { title: string, description: string, image: string, weather: string }) {
  
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
    <div className="flex flex-col items-center p-8 bg-blue-100 rounded-lg shadow-lg text-royalBlue">
      <img src={image} alt={title} className="w-24 h-24" />
      <h2 className="text-2xl font-bold mt-4">{title}</h2>
      <p className="mt-2">{description}</p>
      <div className="mt-4">{weatherIcon}</div>
      <button className="bg-lightBlue hover:bg-blue-300 rounded-md p-5 text-royalBlue">More info</button>
    </div>
  );
}