// EditTaskModal.jsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import colors from '../styles/colors';
import CloseIcon from './../assets/closeIcon.svg?react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.background.primaryOff};
  z-index: 1; /* Asegúrate de que esté por debajo del modal */
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
  background: ${colors.container.primaryOff};
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  z-index: 2; /* Asegúrate de que esté por encima del overlay */
  width: 95%; /* Ocupa el 90% del ancho de la pantalla */
  max-width: 600px; /* Ancho máximo del modal */
  height: auto; /* Altura automática para ajustarse al contenido */

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 15px;
    width: 85%;
  }
`;
const StyledInput = styled.input`
  background-color: ${colors.container.secondaryOffMax};
  border: none;
  padding: 5px;
  font-size: 14px;
  border-radius: 10px;
  color: ${colors.general.white};
  display: inline-block;
  width: 100%;
  margin-bottom: 5px;

  &:focus {
    outline: 1px solid ${colors.border.primaryOff};
  }
`;

const StyledTextarea = styled.textarea`
  background-color: ${colors.container.secondaryOffMax};
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 10px;
  color: ${colors.general.white};
  width: 100%;
  resize: none; /* Evita que el usuario pueda redimensionar manualmente el textarea */
  min-height: 100px; /* Altura mínima del textarea */
  max-height: 300px; /* Altura máxima del textarea */

  &:focus {
    outline: 1px solid ${colors.border.primaryOff};
  }
`;

const StyledButton = styled.button`
  background-color: ${colors.button.primary};
  font-size: 14px;
  padding: 5px 15px;
  border: 1px solid transparent;
  border-radius: 5px;
  color: ${colors.text.primary};
  margin-left: 5px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.button.primaryOff};
    border: 1px solid ${colors.border.primary};
  }
`;

const StyledContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  height: 38px;
  color: ${colors.button.primary};

  &:hover {
    cursor: pointer;
    color: ${colors.button.secondaryIcon};
  }
`;
const StyledContainerHeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const StyledTitleModal = styled.h2`
  padding: 0;
  margin: 0;
`;

const StyledContainerDataModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 90%;
  }
`;
export default function EditTaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [completed, setCompleted] = useState(task.completed);

  const handleSave = () => {
    onSave({ ...task, title, category, completed });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <StyledModal>
        <StyledContainerHeaderModal>
          <StyledTitleModal>Editar Tarea</StyledTitleModal>
          <StyledCloseIcon onClick={onClose} />
        </StyledContainerHeaderModal>

        <StyledContainerDataModal>
          <StyledTextarea
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <StyledInput
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </StyledContainerDataModal>
        <StyledContainerButton>
          <StyledButton onClick={handleSave}>Guardar</StyledButton>
          <StyledButton onClick={onClose}>Cerrar</StyledButton>
        </StyledContainerButton>
      </StyledModal>
    </>
  );
}
