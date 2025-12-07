import { configureStore } from "@reduxjs/toolkit";
import WeatherSlice from "../features/weatherSlice";

export const store = configureStore({
    reducer : {
        weather : WeatherSlice
    }
})