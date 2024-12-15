import { useEffect } from 'react';

const useUndoKey = (onUndo) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isUndoKeyPressed = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z';

      if (isUndoKeyPressed) {
        e.preventDefault();
        onUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUndo]);
};

export default useUndoKey;
