import React from "react"
import WeatherInfo from "./WeatherInfo"


const Content = ({ filteredCountries, searchFilter, setSearchFilter }) => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.entries(country.languages).map(([key, name]) => (<li key={key}>{name}</li>))}
          </ul>
          <img src={country.flags.svg} alt={country.name.common} width="10%"/>
          <WeatherInfo countryCapitalLatLng={country.capitalInfo.latlng} />
        </div>
      )
    }
  
    let content
    if (searchFilter === '') {
      content = null;
    } else if (filteredCountries.length >  10) {
      content = <p>Too many matches</p>
    } else {
      content = filteredCountries.map(country => {
        return (
          <div key={country.name.common}>
            {country.name.common} <button value={country.name.common} onClick={(event) => setSearchFilter(event.target.value)}>show</button>
          </div>
        )})
    }
  
    return <>{content}</>
  }

export default Content;