import './App.css';
import CountryCapitalGame from './components/CountryCapitalGame';

const initialObjectData = {
  Germany: 'Berlin',
  Denmark: 'Copenhagen',
};

function App() {
  return <CountryCapitalGame data={initialObjectData} />;
}

export default App;
