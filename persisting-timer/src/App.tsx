/* eslint-disable */
import './App.css';
import { usePersistentTimer } from './hooks/usePersistentTimer';

function App() {
  const currentTimer = usePersistentTimer({ minutes: 7, seconds: 19 });

  return <>{currentTimer}</>;
}

export default App;
