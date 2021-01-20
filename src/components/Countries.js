import React, {useEffect, useState} from 'react'

function Countries() {

  const [firstCountry, setFirstCountry] = useState();
  const [firstCurrency, setFirstCurrency] = useState();
  const [firstFlag, setFirstFlag] = useState();
  const [secondCountry, setSecondCountry] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [secondFlag, setSecondFlag] = useState();

  const handleChangeFirstCountry = (event) => {
    setFirstCountry(event.target.value)
  }

  const handleChangeSecondCountry = (event) => {
    setSecondCountry(event.target.value)
  }

  useEffect(() => {
    if(firstCountry)
    fetch(`https://restcountries.eu/rest/v2/name/${firstCountry}`)
    .then(res=>res.json())
    .then(res=>{
      setFirstCurrency(res[0].currencies[0].code)
      setFirstFlag(res[0].flag)
    })
    return () => {}
      
  }, [firstCountry])
  
  useEffect(() => {
    if(secondCountry)
    fetch(`https://restcountries.eu/rest/v2/name/${secondCountry}`)
    .then(res=>res.json())
    .then(res=>{
      setSecondCurrency(res[0].currencies[0].code)
      setSecondFlag(res[0].flag)
    })
    return () => {}
      
  }, [secondCountry])

  return (
    <div className="countries">
      <div className="country1">
        <label>Enter your country<br></br>
          <input type="text"
          onChange={handleChangeFirstCountry}
          ></input>
        </label>
        {firstFlag && <img  class="flag" src={firstFlag} alt="country flag"></img>}
        <p>{firstCurrency}</p>
      </div>
      <div className="country2">
        <label>Enter country you need to exchange your currency to.<br></br>
          <input type="text"
          onChange={handleChangeSecondCountry}
          ></input>
        </label>
        {secondFlag && <img class="flag" src={secondFlag} alt="country flag"></img>}
        <p>{secondCurrency}</p>
      </div>
    </div>
  )
}

export default Countries
