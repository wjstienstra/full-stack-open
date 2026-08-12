import Countrydetail from './Countrydetail'
import {useState} from 'react'

const Searchresult = ({search, countries}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    const list = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

    if (selectedCountry) {
        return (
            <div>
                <Countrydetail country={selectedCountry.name.common} />
            </div>
        )
    }


    return (
        <div>
            {list.length > 10 ? 'Too many matches, specify another filter' :
            list.length > 1 ? 
            list.map(c => 
                <div key={c.name.common}>{c.name.common}<button onClick={() => setSelectedCountry(c)}>Show</button></div>) :
                list.length === 1 ? 
                <Countrydetail country={list[0].name.common} /> :
                <div>No countries found, try again</div>                
            } 
        </div>    
    
    )

}

export default Searchresult
