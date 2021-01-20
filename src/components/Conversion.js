import React, {useEffect, useState} from 'react'

function Conversion(props) {
  
  const [input, setInput] = useState();
  const [amount, setAmount] = useState();
  const [conversionResult, setConversionResult] = useState();

  const {firstCurrency, secondCurrency} = props;

  const handleChange= (event) => {
    setInput(event.target.value)

  }

  const handleExchange = () => {
    setAmount(input)
  }

  useEffect(() => {
    if(amount){
      fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`)
      .then(res=>res.json())
      .then(res=>{
        setConversionResult(res.rates[secondCurrency])
      })
    }
    return () => {
    }
  }, [amount, firstCurrency, secondCurrency])

  return (
    <div>
      <label> How much you need to exchange?
        <input type="text" onChange={handleChange}></input>
      </label>
      <button onClick={handleExchange}>Exchange</button>
      {conversionResult && <p>{conversionResult}</p>}
    </div>
  )
}

export default Conversion
