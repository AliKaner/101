import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

interface WinnerContextType {
  winnerName: string | null;
  showWinner: (name: string) => void;
  clearWinner: () => void;
  onDismiss: () => void;
  setOnDismiss: (cb: () => void) => void;
}

const WinnerContext = createContext<WinnerContextType>({
  winnerName: null,
  showWinner: () => {},
  clearWinner: () => {},
  onDismiss: () => {},
  setOnDismiss: () => {},
});

export const useWinner = () => useContext(WinnerContext);

export const WinnerProvider = ({ children }: { children: ReactNode }) => {
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const dismissRef = useRef<() => void>(() => {});

  const showWinner = useCallback((name: string) => {
    setWinnerName(name);
  }, []);

  const clearWinner = useCallback(() => {
    setWinnerName(null);
  }, []);

  const onDismiss = useCallback(() => {
    dismissRef.current();
  }, []);

  const setOnDismiss = useCallback((cb: () => void) => {
    dismissRef.current = cb;
  }, []);

  return (
    <WinnerContext.Provider value={{ winnerName, showWinner, clearWinner, onDismiss, setOnDismiss }}>
      {children}
    </WinnerContext.Provider>
  );
};

export default WinnerContext;
