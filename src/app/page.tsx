"use client";
import Image from "next/image";
import Widget from "./components/Widget";
import { useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            <Widget title={weather.location.name} description={weather.current.temp_f + "°F - " + weather.current.condition.text} image={weather.current.condition.icon} weather={weather.current.condition.text} />
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
