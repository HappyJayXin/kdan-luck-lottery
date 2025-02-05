import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDialog } from './context';

const DialogWrapper = styled.dialog`
  width: 400px;
  border: none;
  border-radius: 10px;
  padding: 20px;
  background: white;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #333;
	margin: 20px 0 10px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #198754;
  color: white;
  font-size: 14px;
  cursor: pointer;
`;

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
    <DialogWrapper ref={dialogRef}>
      <DialogContent>
        <Message>{message}</Message>
        <CloseButton onClick={closeDialog}>關閉</CloseButton>
      </DialogContent>
    </DialogWrapper>
  );
};

export default Dialog;
