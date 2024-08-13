import { WiRaindrop } from "react-icons/wi";

export default function MiniWidget({ time, image, temperature }: { time: string, image: string, temperature: string}) {
    return (
        <div className="flex flex-col items-center p-8 bg-blue-100 rounded-[100px] shadow-lg text-royalBlue transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-200">  
            <h1 className="mt-2">{time}</h1>
            <img src={image} alt={time} className="w-24 h-24" />
            <div className="mt-4">{temperature}</div>
        </div>
    )
}