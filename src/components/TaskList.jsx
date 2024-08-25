import React, { useState, useEffect } from 'react';
import ItemTask from './ItemTask';
import { useTasks } from './../hooks/TaskContext';
import ButtonTime from './ButtonTime';
import AddTask from './AddTask'; // Asegúrate de importar AddTask
import styled from '@emotion/styled';
import colors from '../styles/colors';

const StyledApp = styled.div`
	max-width: 1280px;
	margin: 0 auto;
	padding: 1.5rem 0;
	text-align: center;
	display: flex;
	justify-content: center;
	flex-direction: column;

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		padding: 2rem 1rem;
		flex-direction: column;
		align-items: center;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		padding: 1rem 0.5rem;
	}
`;

const StyledScrollbar = styled.div`
	height: calc(
		100vh - 265px
	); /* Ajuste dinámico: resta el espacio ocupado por otros elementos y el textarea */

	overflow-y: auto;
	/* Asegura que el último ítem sea visible */
	padding-bottom: 50px;

	&::-webkit-scrollbar {
		width: 12px;
	}
	&::-webkit-scrollbar-track {
		background: ${colors.controls.primaryOff};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${colors.controls.secondaryOff};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: ${colors.controls.primary};
	}
	&::-webkit-scrollbar-button {
		display: none;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		height: calc(100vh - 235px); /* Ajuste específico para móviles */
	}
`;

const StyledApp2 = styled.div`
	width: 100%;
	max-width: 1280px;
	margin: 0 auto;
	display: flex;
	flex-direction: column; /* Mantiene los elementos en una columna */
	gap: 20px; /* Espacio entre los elementos */

	@media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
		width: 100%;
		gap: 15px;
		margin: 0 auto;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		width: 100%;
		margin: 0 auto;
		gap: 12px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 100%;
		margin: 0 auto;
		gap: 10px;
	}
`;

const StyledContainerButtonTime = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	justify-content: center; /* Centra los botones horizontalmente */
	width: 100%; /* Asegura que ocupe todo el ancho del contenedor padre */
	max-width: 1280px; /* Puedes ajustar este valor según tu diseño */
	margin: 0 auto; /* Centra el contenedor en la pantalla */

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		align-items: center;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		gap: 5px;
	}
`;

const StyledNoHayTareas = styled.p`
	font-style: italic;
	font-synthesis: style; /* Permite la síntesis de estilos como cursiva */
	font-size: 15px;
	color: ${colors.text.fifth};
	text-align: center;
`;

const StyledFechaHoy = styled.p`
	color: ${(props) => props.theme.colors.text.fifth};
	text-align: center;
	font-weight: bold;
	font-style: italic;
`;

const TaskList = () => {
	const { tasks, removeTask, editTask, addNewTask, processAndFilterTasks } =
		useTasks();
	console.log('Tasks recibidas en TaskList:', tasks);
	const [view, setView] = useState('today');
	const [loading, setLoading] = useState(true); // Estado de carga para indicar si se están obteniendo tareas
	const [currentDate, setCurrentDate] = useState('');

	// Accede a las tareas de hoy y mañana
	const todayTasks = tasks.today || [];
	const tomorrowTasks = tasks.tomorrow || [];

	// Función para formatear la fecha
	const formatDate = (date) => {
		return new Intl.DateTimeFormat('es-ES', {
			weekday: 'long', // Nombre del día de la semana
			year: 'numeric', // Año
			month: 'long', // Nombre del mes
			day: 'numeric', // Día del mes
		}).format(date);
	};

	// console.log(JSON.stringify(tasks, null, 2));
	// Define las fechas usando toLocaleDateString para obtener la fecha en español
	const today = new Date();
	const tomorrow = new Date(Date.now() + 86400000);

	// useEffect para simular la carga de tareas al montar el componente
	useEffect(() => {
		// Simular un retraso en la carga para demostrar el estado de carga
		const loadTasks = () => {
			setLoading(true); // Establecer estado de carga a true antes de simular la carga
			setTimeout(() => {
				setLoading(false); // Establecer estado de carga a false después del retraso
				// Establecer la fecha actual según la vista inicial
				setCurrentDate(formatDate(new Date())); // Asignar la fecha de hoy por defecto
			}, 1000); // Simular un retraso de 1 segundo para la carga
		};
		loadTasks(); // Llama a la función que simula la carga
	}, []); // Este efecto solo se ejecuta una vez al montar el componente

	const handleViewChange = (newView) => {
		setView(newView);
		// Actualiza la fecha actual según el botón presionado
		if (newView === 'today') {
			setCurrentDate(formatDate(new Date()));
		} else if (newView === 'tomorrow') {
			setCurrentDate(formatDate(new Date(Date.now() + 86400000)));
		}
	};

	const handleEdit = async (updatedTask) => {
		await editTask(updatedTask);
		await processAndFilterTasks();
	};

	const handleDelete = async (id) => {
		await removeTask(id);
		await processAndFilterTasks();
	};

	const handleComplete = async (task) => {
		const updatedTask = { ...task, completed: !task.completed };
		await editTask(updatedTask);
		await processAndFilterTasks();
	};

	const handleAddTask = async (newTask) => {
		// Asigna la fecha según el botón activo
		const created_at = view === 'today' ? today : tomorrow;
		const taskWithDate = { ...newTask, created_at };
		await addNewTask(taskWithDate);
		await processAndFilterTasks();
	};

	// Selecciona las tareas basadas en la vista actual
	const filteredTasks = view === 'today' ? todayTasks : tomorrowTasks;
	// console.log('Tareas filtradas a renderizar:', filteredTasks);
	return (
		<>
			<StyledApp>
				<StyledContainerButtonTime>
					<ButtonTime
						// isClicked pasa un valor true or false; booleano.
						isClicked={view === 'today'}
						// Aqui le indicamos que cuango haga click se active handleViewChange(view)
						onClick={() => handleViewChange(view)}
						titleButton='Hoy'
						// Paso como prop handleViewChange al ButtonTime
						// para evaluar alli, que valor en view se enviara como argumento de la
						// funcion, y luego la funcion se ejecuta.
						handleViewChange={handleViewChange}
					/>
					<ButtonTime
						// isClicked pasa un valor true or false; booleano.
						isClicked={view === 'tomorrow'}
						// Cuando se hace click se activa esta funcion que activa el setView con el valor
						// de la view actual.
						// y como sabemos cual es el valor de la view actual?
						onClick={() => handleViewChange(view)}
						titleButton='Mañana'
						// Se le pasa la funcion como prop a ButtonTime
						handleViewChange={handleViewChange}
					/>
				</StyledContainerButtonTime>
			</StyledApp>
			<StyledFechaHoy>{currentDate}</StyledFechaHoy>
			<StyledScrollbar>
				<StyledApp2>
					{/* Verifica si está cargando y muestra un mensaje de carga */}
					{loading ? (
						<p
							style={{
								color: `${colors.text.fifth}`,
								textAlign: 'center',
							}}
						>
							Cargando...
						</p> // Mensaje mientras se cargan las tareas
					) : filteredTasks.length === 0 ? (
						<StyledNoHayTareas>
							No hay tareas para{' '}
							{view === 'today' ? 'hoy' : 'mañana'}
						</StyledNoHayTareas> // Mensaje si no hay tareas
					) : (
						filteredTasks.map((task) => (
							<ItemTask
								key={task.id}
								task={task}
								onEdit={handleEdit}
								onDelete={handleDelete}
								onComplete={handleComplete}
							/>
						))
					)}
				</StyledApp2>
			</StyledScrollbar>
			<AddTask onAddTask={handleAddTask} />
		</>
	);
};
export default TaskList;
