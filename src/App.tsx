import { useState, useEffect } from 'react';
import type { GameAction } from './types';
import GameSelector from './components/GameSelector';
import LoadingScreen from './components/LoadingScreen';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  const [actions, setActions] = useState<GameAction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) return;
    setLoading(true);
    fetch(selectedFile)
      .then((res) => res.json())
      .then((data: GameAction[]) => {
        setActions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load game data:', err);
        setLoading(false);
      });
  }, [selectedFile]);

  if (!selectedFile) {
    return <GameSelector onSelect={setSelectedFile} />;
  }

  if (loading || !actions) {
    return <LoadingScreen />;
  }

  const handleBack = () => {
    setSelectedFile(null);
    setActions(null);
  };

  return <GameBoard actions={actions} onBack={handleBack} />;
}

export default App;
