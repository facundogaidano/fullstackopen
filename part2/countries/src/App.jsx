import { useState, useEffect } from "react"
import React from "react"
import axios from 'axios'
import Content from "./components/Content"

const App = () => {
  const [searchFilter, setSearchFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div>
      find countries <input value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} />
      <Content filteredCountries={filteredCountries} searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
    </div>
  )
}

export default App