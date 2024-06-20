import { useState } from 'react';
import TypingTest from './components/TypingTest';

function App() {
  return (
    <>
      <div className="min-h-screen font-mono text-sky-300/50 bg-sky-950">
        <div className="text-4xl">Yubi</div>
        <TypingTest />
      </div>
    </>
  );
}

export default App;
