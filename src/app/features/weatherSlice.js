import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    unit : "metric",
    clouds : {
        all : undefined
    }, 
    name : undefined, 
    main : {
        feels_like : undefined,
        pressure : undefined,
        humidity : undefined,
        temp_max : undefined
    }, 
    sys : {
        country : undefined,
        sunrise : undefined
    }, 
    wind : {
        speed : undefined
    }, 
    weather : undefined,
    isLoaded : false
}

export const WeatherSlice = createSlice({
    name : "weather",
    initialState,
    reducers : {
        setData : (state, action) => {
            const {clouds, name, main, sys, wind, weather} = action.payload
            state.clouds = clouds
            state.name = name
            state.main = main
            state.sys = sys
            state.wind = wind
            state.weather = weather
            state.isLoaded = true
        },
        setTempUnit : (state, action) => {
            state.unit = action.payload
        },
        resetData : (state) => {
            state.isLoaded = false
        }
    }
})

export const {setData, resetData, setTempUnit} = WeatherSlice.actions
export default WeatherSlice.reducer