import React, {useEffect, useState} from 'react'
import Conversion from './Conversion'

function Countries() {

  const [firstCountry, setFirstCountry] = useState();
  const [firstCurrency, setFirstCurrency] = useState();
  const [firstFlag, setFirstFlag] = useState();
  const [notFound1, setNotFound1] = useState();

  const [secondCountry, setSecondCountry] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [secondFlag, setSecondFlag] = useState();
  const [notFound2, setNotFound2] = useState();
  const [isEditing, setIsEditing] = useState(false);
  

  const handleChangeFirstCountry = (event) => {
    setIsEditing(true)
    setFirstCountry(event.target.value)

  }

  const handleChangeSecondCountry = (event) => {
    setIsEditing(true)
    setSecondCountry(event.target.value)
  }

  useEffect(() => {
    let isCancelled = false;
    if(firstCountry){
      fetch(`https://restcountries.eu/rest/v2/name/${firstCountry}`)
      .then(res=>res.json())
      .then(res=>{
        if(!isCancelled){
          if(res.status===404){
            setNotFound1('The country you are looking for is not available')
          } else {
            setNotFound1()
            setFirstCurrency(res[0].currencies[0].code)
            setFirstFlag(res[0].flag)
          }
        }
      })
    }
    return () => {
      isCancelled = true;
    }
      
  }, [firstCountry])
  
  useEffect(() => {
    let isCancelled = false;
    if(secondCountry){
      fetch(`https://restcountries.eu/rest/v2/name/${secondCountry}`)
      .then(res=>res.json())
      .then(res=>{
        if(!isCancelled){
          if(res.status===404){
            setNotFound2('The country you are looking for is not available')
          } else{
            setNotFound2()
            setSecondCurrency(res[0].currencies[0].code)
            setSecondFlag(res[0].flag)
          }
        } 
      })
    }
    return () => {
      isCancelled = true;
    }
      
  }, [secondCountry])

  return (
    <>
    <div className="countries">
      <div className="country-item">
        <label>Enter your country</label>
          <input className="input-country" type="text"
          onChange={handleChangeFirstCountry}
          ></input>
        <div className="result-container">
          { notFound1
            ? <p>{notFound1}</p>
            : firstCountry && 
              <div className="flag-container">
                {firstFlag && <img  class="flag" src={firstFlag} alt="country flag"></img>}
                <p>{firstCurrency}</p>
              </div>
          }
        </div>
      </div>

      <div className="country-item">
        <label>Enter country you need to exchange your currency to.</label>
          <input className="input-country" type="text"
          onChange={handleChangeSecondCountry}
          ></input>
        
        <div className="result-container">
          { notFound2
            ? <p>{notFound2}</p>
            : secondCountry &&
              <div className="flag-container">
                {secondFlag &&<div className="flagg-container"> <img class="flag" src={secondFlag} alt="country flag"></img></div>}
                 <p>{secondCurrency}</p>
              </div>
          }
        </div>
       
        
      </div>
    </div>
    <Conversion firstCurrency={firstCurrency} secondCurrency={secondCurrency} isEditing={isEditing} setIsEditing={setIsEditing} />
    </>
  )
}

export default Countries
