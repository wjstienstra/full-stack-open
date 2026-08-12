import { useState, useEffect } from 'react'
import weatherService from '../services/search'
import axios from 'axios'

const Countrydetail = ({country}) => {
    const [detail, setDetail] = useState(null)
    const [weather, setWeather] = useState(null)
    
    useEffect(() => {
        const baseUrl = `https://studies.cs.helsinki.fi/restcountries`
        axios.get(`${baseUrl}/api/name/${country}`)
        .then(res => {
            setDetail(res.data)
        })
    },[country])

    useEffect(() => {
        if (detail && detail.capital) {
            weatherService.getWeather(detail.capital)
            .then(data => setWeather(data)
            )
        }    
    }, [detail])

    if (!detail) {
        return <p>Loading...</p>
    }


    return (
        <div>
            <h1>{detail.name.common}</h1>
            <div>capital: {detail.capital}</div>
            <div>area: {detail.area}</div>
            <br></br>
            <h2>Languages</h2>
            <ul>
                {Object.values(detail.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <br></br>
            <img src={detail.flags.png} alt={`flag of ${detail.name.common}`}></img>
            
            {weather && (
            <div>
                <h1>Weather in {detail.capital}</h1>
                <div>Temperature: {weather.main.temp} Celsius</div>
                <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description} 
                    />
                    <div>wind {weather.wind.speed} m/s</div>
            </div>
     
            )}
            
            
            

            

        </div>    
    
    )

}

export default Countrydetail
