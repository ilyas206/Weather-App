import { Form } from "react-bootstrap";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetData, setData, setTempUnit } from "../app/features/weatherSlice";
import Location from "./location";

export default function SearchBar() {
    const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API
    
    const unit = useSelector((state) => state.weather.unit)
    const dispatch = useDispatch()
    const [cities, setCities] = useState([])
    const [selectedCoord, setSelectedCoord] = useState(undefined)

    useEffect(() => {
        getGeoLocation()
    },[])

    useEffect(() => {
        if(selectedCoord){
            const {lat, lon} = selectedCoord

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${unit}&lon=${lon}&appid=${WEATHER_API_KEY}`)
                .then(response => response.json())
                .then(response => {
                    const {clouds, name, main, sys, wind, weather} = response
                    dispatch(setData({clouds, name, main, sys, wind, weather}))
                    dispatch(setTempUnit(unit))
            })
        }
    },[unit])

    useEffect(() => {
        getData()
    },[selectedCoord])

    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setSelectedCoord({
                lat : position.coords.latitude,
                lon : position.coords.longitude
            })
        })
    }

    const handleInputChange = e => {
        const value = e.target.value
        if(value){
            // fetching cities
            fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`)
                .then(response => response.json())
                .then(response => setCities(response.results.map(data => {
                    const {lon, lat, city, country, formatted} = data
                    return {lon, lat, city, country, formatted}
            })))
        }
    }

    const getData = () => {
        if(selectedCoord){
            const {lat, lon} = selectedCoord

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${unit}&lon=${lon}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(response => {
                const {clouds, name, main, sys, wind, weather} = response
                dispatch(setData({clouds, name, main, sys, wind, weather}))
                dispatch(setTempUnit(unit))
            })
        }
    }

    const handleAutocompleteSelect = (e, value) => {
        if(value){
            const {lon, lat} = value
            setSelectedCoord({ lon: lon, lat: lat })
            // fetching selected city weather
            getData()
        }else{
            dispatch(resetData())
        }
    }

    return(
        <Form className="search-form">
            <Autocomplete 
                className="search-input" 
                clearOnBlur={false}
                onChange={handleAutocompleteSelect}
                getOptionLabel={(option) => option.formatted}
                renderInput={(params) => 
                    <TextField onChange={handleInputChange} {...params} placeholder="Enter your city..." variant="outlined" />} 
                options={cities}/>  
            <Button sx={{background : '#e3f8ffd1'}} onClick={() => getGeoLocation()}>
                <Location color='#31a1caff' width="2.5rem" height="2.5rem"/>
            </Button>     
        </Form>
    )
}