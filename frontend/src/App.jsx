import { useState } from 'react';
import Header from './components/Header';
import TypingTest from './components/TypingTest';

function App() {
  return (
    <>
      <div className="flex flex-col items-center min-w-80 font-mono text-sky-300/50">
        <Header />
        <TypingTest />
      </div>
    </>
  );
}

export default App;
