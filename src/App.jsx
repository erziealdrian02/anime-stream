import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-orange-400 text-6xl">Hellow Word</h1>
    </>
  );
}

export default App;
