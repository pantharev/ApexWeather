import Image from "next/image";
import Widget from "./components/Widget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center text-royalBlue">Welcome to ApexWeather!</h1>
      <p className="text-royalBlue my-5">Here you can check the weather and share with your family, friends, colleagues, strangers, anyone!</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-5">
        <Widget
          title="Monday"
          description="The temperature is 75 degrees Fahrenheit. It is sunny."
          image="/images/1.jpg"
          weather="Sunny"
        />
        <Widget
          title="Tuesday"
          description="The temperature is 65 degrees Fahrenheit. It is rainy."
          image="/images/2.jpg"
          weather="Rainy"
        />
        <Widget
          title="Wednesday"
          description="The temperature is 80 degrees Fahrenheit. It is sunny."
          image="/images/3.jpg"
          weather="Sunny"
        />
        <Widget
          title="Thursday"
          description="The temperature is 55 degrees Fahrenheit. It is rainy."
          image="/images/4.jpg"
          weather="Rainy"
        />
        <Widget
          title="Friday"
          description="The temperature is 32 degrees Fahrenheit. It is snowing."
          image="/images/5.jpg"
          weather="Snowy"
        />
        <Widget
          title="Saturday"
          description="The temperature is 70 degrees Fahrenheit. It is cloudy."
          image="/images/6.jpg"
          weather="Cloudy"
        />
      </div>  
    </main>
  );
}
