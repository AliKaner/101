import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import type { GameAction } from './types';
import GameSelector from './components/GameSelector';
import LoadingScreen from './components/LoadingScreen';
import GameBoard from './components/GameBoard';
import MovesTable from './components/MovesTable';
import './App.css';

function GameApp() {
  const [actions, setActions] = useState<GameAction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleShowTable = () => {
    navigate('/table', { state: { actions } });
  };

  return (
    <GameBoard
      actions={actions}
      onBack={handleBack}
      onShowTable={handleShowTable}
    />
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameApp />} />
      <Route path="/table" element={<MovesTable />} />
    </Routes>
  );
}

export default App;
