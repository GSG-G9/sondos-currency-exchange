import React, {useEffect, useState} from 'react'

function Conversion(props) {
  
  const [input, setInput] = useState();
  const [amount, setAmount] = useState();
  const [conversionResult, setConversionResult] = useState();
  const [notFound, setNotFound] = useState();

  const {firstCurrency, secondCurrency, isEditing} = props;


  const handleChange= (event) => {
    setInput(event.target.value)
  }

  const handleExchange = () => {
    props.setIsEditing(false)
    if(!firstCurrency || !secondCurrency){
      setNotFound('please, enter the two countries first !')
    } else{
    setAmount(input)
    }
  }

  useEffect(() => {
    let isCancelled = false;
    if(amount && firstCurrency && secondCurrency){
      fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`)
      .then(res=>res.json())
      .then(res=>{
        if(!isCancelled){
          setNotFound()
          setConversionResult(res.rates[secondCurrency])
          
          }
        }
      )
      .catch(err=>{
        setConversionResult()
        setNotFound('Conversion rate is not available for these two currencies !')
      })
    }
    return () => {
      isCancelled = true;
    }
  }, [amount])

  let basicConversion = `${amount}  ${firstCurrency} Equal ${conversionResult} ${secondCurrency}`;
  let basicRate = `1 ${firstCurrency} = ${(conversionResult/amount).toFixed(3)} ${secondCurrency}`;
  let inverseRate = `1 ${secondCurrency} = ${(amount/conversionResult).toFixed(3)} ${firstCurrency}`
  return (
    
    <div>
      <label> How much you need to exchange?
        <input type="text" onChange={handleChange}></input>
      </label>
      <button onClick={handleExchange}>Exchange</button>
      {conversionResult
      ? !isEditing && <div>
          <p>{basicConversion}</p>
          <p>{basicRate}</p>
          <p>{inverseRate}</p>
        </div>
      :  <p>{notFound}</p>}
      
    </div>
  )
}

export default Conversion

