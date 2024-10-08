import { WiRaindrop } from "react-icons/wi";

export default function MiniWidget({ time, image, temperature, rain }: { time: string, image: string, temperature: string, rain: string}) {
    
    // Calculate the grayscale value based on the rain percentage (0-100)
    const rainPercentage = parseInt(rain.replace('%', ''), 10);
    const grayScaleValue = Math.floor(((100 - rainPercentage) / 100) * 255); // Value between 0 and 255
    const rainDropColor = `rgb(${grayScaleValue}, ${grayScaleValue}, ${grayScaleValue})`; // Grayscale color
    
    return (
    // <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-blue-100 rounded-3xl shadow-lg text-royalBlue transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-200">  
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 text-white">  
        <h1 className="mt-2 text-lg sm:text-xl md:text-2xl">{time}</h1>
        <img src={image} alt={time} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
        <div className="mt-4 text-sm sm:text-base md:text-lg">{temperature}</div>
        <div className="mt-4"><div className="flex"><WiRaindrop style={{ color: rainDropColor }}/>{rain}</div></div>
    </div>
    )
}