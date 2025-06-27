import React, { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import Dashboard from './components/Dashboard';
import Tips from './components/Tips';
import DarkModeToggle from './components/DarkModeToggle';
import useDarkMode from './hooks/useDarkMode';
import { calculateEmissions } from './utils/calculator';

function App() {
  const [dark, setDark] = useDarkMode();
  const [result, setResult] = useState<ReturnType<typeof calculateEmissions> | null>(null);

  function handleSubmit(input: ActivityInput, mode: 'daily' | 'monthly') {
    setResult(calculateEmissions(input, mode));
  }

  function handleReset() {
    setResult(null);
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <header>
        <h1>Carbon Footprint Estimator</h1>
        <DarkModeToggle dark={dark} setDark={setDark} />
      </header>
      {!result
        ? <ActivityForm onSubmit={handleSubmit} onReset={handleReset} />
        : (
          <>
            <Dashboard total={result.total} breakdown={result.breakdown} />
            <Tips breakdown={result.breakdown} />
            <button onClick={handleReset} style={{ marginTop: 16 }}>Reset</button>
          </>
        )
      }
      <footer style={{ marginTop: 24 }}>
        <small>Built with React, Vite, TypeScript · Data: IPCC, EPA, OurWorldInData</small>
      </footer>
    </div>
  );
}

export default App;