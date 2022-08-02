import { useState, useEffect } from 'react'
import axios from 'axios'

const ListCandidateCountries = ({validNames, showClickedCountry}) => {
  return (
    <ul>
      {validNames.map(name =>  
        <li key={name}>
          {name} <button onClick={() => showClickedCountry(name)}>show</button>
        </li>
      )}
    </ul>
  )
}

const CountryInfo = ({country, curWeather, setCurWeather}) => {
  const latlng = country.capitalInfo.latlng
  useEffect(() => { 
    const getWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latlng[0] + '&lon=' + latlng[1] +'&appid=' + process.env.REACT_APP_OPEN_WEATHER_API_KEY
    axios
      .get(getWeatherURL)
      .then(response => setCurWeather(response.data))
  }, [])

  const weatherImgURL=  'http://openweathermap.org/img/wn/' + curWeather.weather[0].icon + '@2x.png'
  return (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h2>languages:</h2>
    <ul>  
      {Object.values(country.languages).map((lang) =>
        <li key={lang}>{lang}</li>
      )}
    </ul>
    <img src={country.flags.png} />
    <h1>Weather in {country.capital}</h1>
    <p>temperature {curWeather.main.temp}  Celcius</p>
    <img src={weatherImgURL} />
    <p>wind {curWeather.wind.speed} m/s</p>

  </div>
  )
}
 
const App = () => {
  const [curWeather, setCurWeather] = useState({main:{temp:''}, wind:{speed:''}, weather:[{icon:''}]})
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
    }
  , [])


  let countryNames = countries.map(country => country.name.common)
  let validNames = countryNames.filter(name => RegExp(countryFilter.toLowerCase()).test(name.toLowerCase()))

  return (
    <div>
      find countries <input value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} />
      {validNames.length > 10 && <p>Too many matches, specify another filter</p>}
      {validNames.length < 10 && validNames.length > 1 && <ListCandidateCountries validNames={validNames} showClickedCountry={(name)=>
        setCountryFilter(name)} />}
      {validNames.length === 1 && <CountryInfo country={countries.find(country => country.name.common===validNames[0])} 
        curWeather={curWeather} setCurWeather={setCurWeather} />}
    </div>
  )

}




export default App;
