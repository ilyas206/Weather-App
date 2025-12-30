import { useDispatch, useSelector } from "react-redux";
import { setTempUnit } from "../app/features/weatherSlice";
import Sunrise from "./sunrise";
import Wind from "./wind";
import Pressure from "./pressure";
import Humidity from "./humidity";
import Location from "./location";
import Time from "./time";
import UpTemp from "./uptemp";
import LowTemp from "./lowtemp";
import Sunset from "./sunset";
import { motion } from "framer-motion";
import Temp from "./temp";
import { Tooltip } from "@mui/material";

export default function Main() {
    const weather = useSelector((state) => state.weather)
    const dispatch = useDispatch()

    function formatTime(sec) {
        const date = new Date(sec * 1000); 
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    function formatDate() {
        const currentDate = new Date()
        const currentDay = String(currentDate.getDate())
        const currentWeekDay = currentDate.toLocaleDateString("en-GB", { weekday: "long" })
        const currentMonth = currentDate.toLocaleDateString("en-GB", { month: "short" })
        const currentYear = currentDate.getFullYear()

        const hours = String(currentDate.getHours()).padStart(2, '0')
        const minutes = String(currentDate.getMinutes()).padStart(2, '0')

        return `${currentWeekDay}, ${currentMonth} ${currentDay}, ${currentYear} ${hours}:${minutes} PM`
    }

    const displayDatePeriod = () => {
        const hours = new Date().getHours()

        if(hours > 7 && hours < 12){
            return "Good morning"
        }else if(hours >= 12 && hours < 16){
            return "Good afternoon"
        }else{
            return "Good evening"
        }
    }

    // formating and displaying temperature depending on the first three digits ex : -17.3 , -4.9 , 12.3 , 8.2
    const displayCurrentTemp = () => {
        const currentTemp = weather.main.feels_like.toString()
        const tempParts = weather.main.feels_like.toString().split('.')

        if(currentTemp.includes('-') && tempParts[0].length === 3 ){
            return weather.main.feels_like.toString().slice(0, 5)
        }else if(currentTemp.includes('-') && tempParts[0].length === 2 ){
            return weather.main.feels_like.toString().slice(0, 4)
        }else if(!currentTemp.includes('-') && tempParts[0].length === 2 ){
            return weather.main.feels_like.toString().slice(0, 4)
        }else{
            return weather.main.feels_like.toString().slice(0, 3)
        }
    }

    const switchTempUnit = value => {
        dispatch(setTempUnit(value))
    }

    return(
        <div className="overflow-x-auto">
            {
                weather.isLoaded ?
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-1">
                    <motion.div
                        initial={{
                            x : '-100vw'
                        }}
                        animate={{
                            x : 0
                        }}
                        transition={{
                            duration : .5
                        }}
                        className="h-[80vh] w-[95vw] lg:w-[48vw] bg-[#ffffff1a] my-4 mx-auto p-3 border-none rounded-2xl backdrop-blur-md relative">
                        <motion.div 
                            initial={{
                                y : '-2rem',
                                opacity : 0
                            }}
                            animate={{
                                y : 0,
                                opacity : 1
                            }}
                            transition={{
                                duration : .5,
                                delay : .6
                            }}
                            className="flex items-center"
                            >
                            <div className="w-1/5 p-1 flex items-center justify-center gap-1 rounded-md bg-[#b2b2b279] absolute left-4 top-6">
                                <Temp/>
                                <h5 className="font-bold">
                                    {displayCurrentTemp()} {weather.unit === 'metric' ? '°C' : '°F'}
                                </h5>
                            </div>
                            <div className="w-1/5 p-1 flex items-center justify-center gap-1 rounded-md bg-[#b2b2b279] absolute right-4 top-6">
                                <Location/>
                                <h5 className="font-bold">
                                    {weather.sys.country}
                                </h5>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{
                                opacity : 0
                            }}
                            animate={{
                                opacity : 1
                            }}
                            transition={{
                                duration : .5,
                                delay : 1
                            }}
                            className="h-3/4 flex flex-col justify-center">
                            <div className="text-center font-semibold text-5xl my-4">
                                <h1>{weather.name}</h1>
                            </div>
                            <div className="flex justify-center gap-2">
                                <p className="font-light">{formatDate()}</p>
                                <Time/>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{
                                y : '2rem',
                                opacity : 0
                            }}
                            animate={{
                                y : 0,
                                opacity : 1
                            }}
                            transition={{
                                duration : .5,
                                delay : .6
                            }}
                            className="w-full h-1/4 bg-[#b2b2b279] rounded-lg flex gap-2 items-center">
                            <div className="w-1/4 flex flex-col items-center font-bold">
                                <Sunrise/>
                                <span>Sunrise</span>
                                <span>{formatTime(weather.sys.sunrise)}</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center font-bold">
                                <Sunset/>
                                <span>Sunset</span>
                                <span>{formatTime(weather.sys.sunset)}</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center font-bold">
                                <Wind/>
                                <span>Wind</span>
                                <span>{weather.wind.speed} m/s</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center font-bold">
                                <Pressure/>
                                <span>Pressure</span>
                                <span>{weather.main.pressure}Pa</span>
                            </div>
                            <div className="w-1/4 flex flex-col items-center font-bold">
                                <Humidity/>
                                <span>Humidity</span>
                                <span>{weather.main.humidity}%</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{
                            x : '100vw'
                        }}
                        animate={{
                            x : 0
                        }}
                        transition={{
                            duration : .5
                        }}                        
                        className="h-[80vh] w-[95vw] lg:w-[48vw] bg-[#ffffff1a] text-white my-4 mx-auto p-3 border-none rounded-2xl backdrop-blur-md flex flex-col justify-between items-center">
                        <h1 className="text-3xl font-bold hidden lg:block mb-2">{displayDatePeriod()}</h1>

                        <motion.div 
                            initial={{
                                y : '-2rem',
                                opacity : 0
                            }}
                            animate={{
                                y : 0,
                                opacity : 1
                            }}
                            transition={{
                                duration : .5,
                                delay : .6
                            }}
                            className="flex flex-col lg:flex-row w-full gap-2 mt-3">
                            <div className="w-full flex items-center justify-evenly gap-2 rounded-md bg-[#b2b2b279]">
                                <Tooltip title="Weather condition" arrow>
                                    <img className="w-16 h-16" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather forecast"/>
                                </Tooltip>
                                <h4 className="font-medium">{weather.weather[0].description}</h4>
                            </div>
                            <div className="w-full flex items-center justify-evenly gap-2 rounded-md bg-[#b2b2b279]">
                                <Tooltip title="Cloudiness" arrow>
                                    <img className="w-16 h-16" src="https://openweathermap.org/img/wn/03d@2x.png" alt="Cloudiness"/>
                                </Tooltip>
                                <h4 className="font-medium">{weather.clouds.all} %</h4>
                            </div>
                        </motion.div>

                        <div
                            className="w-full h-[80%] flex items-center justify-around">
                            <motion.h1 
                                initial={{
                                    opacity : 0
                                }}
                                animate={{
                                    opacity : 1
                                }}
                                transition={{
                                    duration : .5,
                                    delay : 1
                                }}
                                className="text-5xl font-bold">
                                {displayCurrentTemp()} 
                                <span 
                                    onClick={() => switchTempUnit('metric')} 
                                    className={`cursor-pointer ${weather.unit !== 'metric' && 'text-slate-700'}`}> °C
                                </span> | 
                                <span 
                                    onClick={() => switchTempUnit('imperial')} 
                                    className={`cursor-pointer ${weather.unit !== 'imperial' && 'text-slate-700'}`}>°F
                                </span>
                            </motion.h1>
                        </div>
                        <motion.div 
                            initial={{
                                y : '2rem',
                                opacity : 0
                            }}
                            animate={{
                                y : 0,
                                opacity : 1
                            }}
                            transition={{
                                duration : .5,
                                delay : .6
                            }}
                            className="w-full p-2 flex items-center justify-around gap-12 rounded-md bg-[#b2b2b279]">
                            <div className="flex flex-col lg:flex-row justify-center items-center">
                                <div>
                                    <span className="font-medium">Upper Temp</span>
                                    <UpTemp/>
                                </div>
                                <span className="font-bold">{weather.main.temp_max} °C</span>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-center items-center">
                                <div>
                                    <span className="font-medium">Lower Temp</span>
                                    <LowTemp/>
                                </div>
                                <span className="font-bold">{weather.main.temp_min} °C</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div> :
                <motion.div 
                    initial={{
                        opacity : 0,
                        y : '-5rem'
                    }}
                    animate={{
                        opacity : 1,
                        y : 0
                    }}
                    transition={{
                        duration : .5
                    }}
                    className="h-[15vh] w-[90vw] bg-[#ffffff1a] text-[#000000a9] my-4 mx-auto border-none rounded-2xl backdrop-blur-md flex items-center justify-center">
                    <h3 className="font-medium text-center">Please type a city name</h3>
                </motion.div>
            }
        </div>
    )
}