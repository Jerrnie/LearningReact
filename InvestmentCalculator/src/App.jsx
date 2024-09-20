import {useState} from 'react';
import Header from "./components/Header"
import UserInput from "./components/UserInput"
import ResultTable from "./components/ResultTable"

const INITAL_INVESTMENT_VALUE = {
  initialInvestment: 10000,
  anualInvestment: 1200,
  expectedReturn: 6,
  duration: 10
};


function App() {
  const [investments,setInvestments] = useState(INITAL_INVESTMENT_VALUE);
  const [errorMessage,setErrorMessage] = useState('');


  function handleInput(id, value) {

    if (id==='duration' && (value === '' || isNaN(value) || value < 1)) {
      setErrorMessage("Please make sure the duration is greater than 1 year");
    }

    else{
      setErrorMessage("");
      setInvestments((prevInvestments) => {
        const updatedValue = {
          ...prevInvestments,   
          [id]: value           
        };
        console.log(updatedValue);
        return updatedValue;      
      });
    }

  }

  return (
    <>
      <Header /> 
      <div id="user-input">
        <div className="input-group">

          <UserInput 
            handleChange={handleInput} 
            label="Initial Investment"
            inputId='initialInvestment'
            initialInputValue={investments['initialInvestment']}
          />

          <UserInput 
            handleChange={handleInput} 
            label="Anual Investment"
            inputId='anualInvestment'
            initialInputValue={investments['anualInvestment']}
          />
        </div> 
        <br/>
        <div className="input-group">

          <UserInput 
            handleChange={handleInput} 
            label="Expected Return"
            inputId='expectedReturn'
            initialInputValue={investments['expectedReturn']}
          />

          <UserInput 
            handleChange={handleInput} 
            label="Duration"
            inputId='duration'
            initialInputValue={investments['duration']}
          />

        </div> 
        {errorMessage && <p>{errorMessage}</p> }
      </div>

      <ResultTable investmentData={investments}/>
    </>
  );
}

export default App
