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
        <div>
            {
                weather.isLoaded ?
                <div className="main">
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
                        className="details-card">
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
                            className="details-country">
                            <Location color='#0b749a' width="2rem" height="2rem"/>
                            <h5 className="fw-bold mt-2">{weather.sys.country}</h5>
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
                            className="details-top">
                            <div>
                                <h1>{weather.name}</h1>
                            </div>
                            <div>
                                <p className="fw-light">{formatDate()}</p>
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
                            className="details-bottom">
                            <div>
                                <Sunrise/>
                                <span>Sunrise</span>
                                <span>{formatTime(weather.sys.sunrise)}</span>
                            </div>
                            <div>
                                <Sunset/>
                                <span>Sunset</span>
                                <span>{formatTime(weather.sys.sunset)}</span>
                            </div>
                            <div>
                                <Wind/>
                                <span>Wind</span>
                                <span>{weather.wind.speed} m/s</span>
                            </div>
                            <div>
                                <Pressure/>
                                <span>Pressure</span>
                                <span>{weather.main.pressure}Pa</span>
                            </div>
                            <div>
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
                        className="status-card">
                        <h1 className="fw-bold text-center">{displayDatePeriod()}</h1>

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
                            className="d-flex w-100 gap-2">
                            <div className="description">
                                <img style={{width : '4rem', height : '4rem'}} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather forecast"/>
                                <h4 className="fw-light">{weather.weather[0].description}</h4>
                            </div>
                            <div className="cloudiness">
                                <h4 className="fw-light">Cloudiness</h4>
                                <h4 className="fw-bold">{weather.clouds.all} %</h4>
                            </div>
                        </motion.div>

                        <div
                            className="status-details">
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
                                className="display-5 fw-bold">
                                {displayCurrentTemp()} 
                                <span 
                                    onClick={() => switchTempUnit('metric')} 
                                    className={`cel ${weather.unit !== 'metric' && 'text-muted'}`}> °C
                                </span> | 
                                <span 
                                    onClick={() => switchTempUnit('imperial')} 
                                    className={`fer ${weather.unit !== 'imperial' && 'text-muted'}`}>°F
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
                            className="temps">
                            <div>
                                <span className="fw-light">Upper Temp</span>
                                <UpTemp/>
                                <span className="fw-bold">{weather.main.temp_max} °C</span>
                            </div>
                            <div>
                                <span className="fw-light">Lower Temp</span>
                                <LowTemp/>
                                <span className="fw-bold">{weather.main.temp_min} °C</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div> :
                <motion.div 
                className="initial-card">
                    <h3 className="fw-light text-center">Please type a city name</h3>
                </motion.div>
            }
        </div>
    )
}