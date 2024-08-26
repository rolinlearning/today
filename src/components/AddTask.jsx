import styled from '@emotion/styled';
import SendIcon from './../assets/sendIcon.svg?react';
import colors from './../styles/colors';
import { useState, useRef } from 'react';

const StyledPrincipalContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const StyledAddTaskContainer = styled.div`
	position: fixed; /* Fija el contenedor en la ventana del navegador */
	bottom: 20px;
	width: 100%; /* Cambiado a un 100% de ancho para aprovechar todo el espacio disponible */
	max-width: 1280px; /* Limitar el ancho máximo */
	padding: 0 20px; /* Añadir padding para evitar que se pegue a los bordes */
	display: flex; /* Usar flexbox para alinear los elementos */
	justify-content: center; /* Centra verticalmente el input y el ícono */
	box-sizing: border-box; /* Incluye el padding en el cálculo del ancho */
	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		padding: 0 20px;
		width: 100%;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 100%;
		padding: 0 10px;
		bottom: 10px;
	}
`;

const StyledTextareaContainer = styled.div`
	display: flex;
	align-items: center;
	width: 80%; /* El textarea ocupará el 80% del contenedor */
	border-radius: 20px;
	position: relative;

	@media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
		width: 90%;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		width: 90%;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 100%;
	}
`;

const StyledTextareaCreate = styled.textarea`
	flex: 1;
	padding: 10px;
	box-sizing: border-box;
	border-radius: 20px;
	background-color: ${colors.input.primaryOff};
	border: solid 1px ${colors.border.primaryOff};
	resize: none; /* Evita que el usuario pueda redimensionar manualmente el textarea */
	outline: none;
	font-size: 15px;
	font-family: inherit;
	line-height: 1.5;
	overflow: hidden; /* Esconde el scrollbar cuando no es necesario */

	color: ${(props) =>
		props.hashText ? colors.text.primary : colors.text.placeholder};

	&:focus {
		border: solid 1px ${colors.border.primary};
		outline: none;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
		font-size: 14px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		font-size: 14px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		font-size: 12px;
	}
`;

const StyledSendIcon = styled(SendIcon)`
	margin-left: 10px; /* Espacio entre el textarea y el icono */
	height: auto;
	width: 48px; /* Tamaño base del ícono */
	cursor: pointer;

	&:hover {
		cursor: pointer;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
		width: 46px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		width: 44px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 42px;
	}
`;

export default function AddTask({ onAddTask }) {
	const [inputValue, setInputValue] = useState('');
	const textareaRef = useRef(null);
	const categoryValue = 'Personal';

	const handleInputChange = (e) => {
		const textarea = e.target;
		setInputValue(textarea.value);

		// Ajustar la altura del textarea automáticamente
		textarea.style.height = 'auto'; // Reinicia la altura
		textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura según el contenido
	};

	// Add task implementation
	const handleAddTask = () => {
		if (inputValue.trim()) {
			const newTask = {
				title: inputValue,
				category: categoryValue,
				completed: false,
			};
			// Llama a onAddTask que es la prop para agregar una nueva tarea..
			onAddTask(newTask).catch((error) => {
				console.error('Error adding task:', error); // Manejo de errores
			});

			setInputValue('');
			// Restablecer la altura después de enviar
			if (textareaRef.current) {
				textareaRef.current.style.height = '40px'; // Valor original o deseado
			}
		}
	};

	const handleFocus = () => {
		setTimeout(() => {
			if (textareaRef.current) {
				textareaRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
		}, 300); // El retraso ayuda a asegurar que el teclado ya esté desplegado.
	};
	return (
		<>
			<StyledPrincipalContainer>
				<StyledAddTaskContainer>
					<StyledTextareaContainer>
						<StyledTextareaCreate
							ref={textareaRef}
							type='text'
							placeholder='Agregar Nueva Tarea..'
							value={inputValue}
							onChange={handleInputChange}
							hashText={inputValue !== ''}
							// onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
							rows={1} // Empieza con una sola línea visible
							onFocus={handleFocus} // llama a la funcion que mejora el scroll
						/>
						<StyledSendIcon
							style={{
								color:
									inputValue !== ''
										? colors.button.secondaryIcon
										: colors.button.secondaryIconOff,
							}}
							onClick={handleAddTask}
						></StyledSendIcon>
					</StyledTextareaContainer>
				</StyledAddTaskContainer>
			</StyledPrincipalContainer>
		</>
	);
}
