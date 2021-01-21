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
      <div className="country1">
        <label>Enter your country<br></br>
          <input type="text"
          onChange={handleChangeFirstCountry}
          ></input>
        </label>
        { notFound1
          ? <p>{notFound1}</p>
          : firstCountry && 
            <div>
              {firstFlag && <img  class="flag" src={firstFlag} alt="country flag"></img>}
              <p>{firstCurrency}</p>
            </div>
        }
        
        
      </div>

      <div className="country2">
        <label>Enter country you need to exchange your currency to.<br></br>
          <input type="text"
          onChange={handleChangeSecondCountry}
          ></input>
        </label>
        { notFound2
          ? <p>{notFound2}</p>
          : secondCountry &&
            <div>
              {secondFlag && <img class="flag" src={secondFlag} alt="country flag"></img>}
               <p>{secondCurrency}</p>
            </div>
        }
       
        
      </div>
    </div>
    <Conversion firstCurrency={firstCurrency} secondCurrency={secondCurrency} isEditing={isEditing} setIsEditing={setIsEditing} />
    </>
  )
}

export default Countries
