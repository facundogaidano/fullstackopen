import { useState, useEffect } from "react"
import axios from 'axios'
import React from "react"

const WeatherInfo = ({ countryCapitalLatLng }) => {
    const [temperature, setTemperature] = useState(null)
  
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
              latitude: countryCapitalLatLng[0], // Latitud
              longitude: countryCapitalLatLng[1], // Longitud
              hourly: 'temperature_2m',
            },
          })
  
          if (response.data && response.data.hourly) {
            // Asumiendo que quieres mostrar la temperatura de la próxima hora
            const nextHourTemperature = response.data.hourly.temperature_2m[0];
            setTemperature(nextHourTemperature);
          }
        } catch (error) {
          console.error('Error fetching weather data:', error)
        }
      }
  
      fetchWeatherData();
    }, [countryCapitalLatLng])
  
    return (
      <div>
        Temperature: {temperature ? `${temperature}°C` : 'Loading...'}
      </div>
    )
  }

export default WeatherInfo;