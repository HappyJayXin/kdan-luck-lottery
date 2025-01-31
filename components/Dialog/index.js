import { useEffect, useRef } from 'react';
import { useDialog } from './context';

const Dialog = () => {
  const { isOpen, message, closeDialog } = useDialog();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef}>
      <p>{message}</p>
      <button onClick={closeDialog}>關閉</button>
    </dialog>
  );
};

export default Dialog;
