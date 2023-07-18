import NotionPage from './components/NotionPage';
import './App.css';
import SelectPage from './components/SelectPage';
import { useEffect, useState } from 'react';

function App() {
  const [loginIn, setLoginIn] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('secrete'))) {
      setLoginIn(true);
    }
  }, []);

  return (
    <div className="App">
      <div className="App_container">
        {loginIn ? (
          <NotionPage setLoginIn={setLoginIn} />
        ) : (
          <SelectPage setLoginIn={setLoginIn} />
        )}
      </div>
    </div>
  );
}

export default App;
