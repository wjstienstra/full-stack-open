import { useState, useEffect } from 'react'
import Searchresult from './components/Searchresult'
import searchService from './services/search'


function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    searchService.getAll()
    .then(data => {
      setCountries(data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

   
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
    <form>
      find countries <input value={search} onChange={handleChange}/>
    </form>

    <Searchresult key={search} search={search} countries={countries}/>
    
    </>
  )
}

export default App

