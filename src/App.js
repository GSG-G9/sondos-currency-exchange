import './App.css';
import Countries from './components/Countries';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <a href="index.html" class="logo_link"><p class="logo">Currency <span class="xchange_xletter">X </span>change</p></a>
      </header>
      <Countries/>
      
    </div>
  );
}

export default App;
