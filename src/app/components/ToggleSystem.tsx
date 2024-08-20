import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function ToggleSystem({ onChange }: { onChange: (isOn: boolean) => void }) {
    const [isOn, setIsOn] = useState(false);
    
    const handleToggle = () => {
        console.log("Before toggle", isOn);
        setIsOn(!isOn);
        console.log("After toggle", isOn);
        onChange(isOn);
    }

    return (
        <div className="flex items-center justify-center">
            <h1>Toggle Celcius/Fahrenheit</h1>
            <Switch checked={isOn} onCheckedChange={handleToggle} className="!bg-blue-500"/>
            <h1>{isOn ? "Celcius" : "Fahrenheit"}</h1>
        </div>
    )
}