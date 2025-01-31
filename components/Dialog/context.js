import { createContext, useState, useContext } from 'react';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openDialog = (msg) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setMessage('');
  };

  return (
    <DialogContext.Provider value={{ isOpen, message, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
