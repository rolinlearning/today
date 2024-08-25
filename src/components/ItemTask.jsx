import ButtonEdit from './ButtonEdit';
import styled from '@emotion/styled';
import TaskIcon from './../assets/taskIcon.svg?react';
import ButtonDelete from './ButtonDelete';
import colors from '../styles/colors';
import EditTaskModal from './EditTaskModal';
import { useState } from 'react';
import CheckIcon from './../assets/check.svg?react';

const StyledItemTask = styled.div`
	width: 90%; /* O puedes especificar un ancho fijo como 1024px */
	margin: 0 auto; /* Esto centrará el contenedor en la pantalla */
	display: flex;
	flex-direction: row; /* Mantiene los elementos en una columna */
	align-items: center;
	background-color: ${colors.container.primaryOff};
	gap: 20px; /* Espacio entre los elementos */
	border-radius: 40px;
	padding: 0 10px;

	&:hover {
		background-color: ${colors.container.primary};
	}

	&:fade-enter {
		opacity: 0;
		transform: translateY(-400px);
		transition: transform 5s;
	}

	&:fade-exit {
		opacity: 0;
		transform: translateY(400px);
		transition: transform 5s ease;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
		width: 85%;
		gap: 15px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		width: 75%;
		gap: 12px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 90%;
		display: flex;
		flex-direction: column;
		border-radius: 30px;
		gap: 0px;
	}
`;

const StyleTaskIcon = styled(TaskIcon)`
	width: 18px;
	height: 18px;
	fill: ${colors.button.primaryIcon};

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 16px;
		height: 16px;
	}
`;

const StyledMyTask = styled.p`
	width: 100%;
	max-width: 470px;
	text-align: left;
	font-size: 15px;
	padding: 5px;
	border-radius: 20px;
	color: ${(props) =>
		props.isclicked === 'true'
			? colors.text.secondary
			: colors.text.primary};
	&:hover {
		cursor: pointer;
		background-color: ${colors.container.secondaryOffMax};
	}

	pointer-events: ${(props) =>
		props.isclicked === 'true' ? 'none' : 'auto'};

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		font-size: 14px;
		max-width: 100%;
	}
`;

const StyledIconsContainer = styled.div`
	width: 100%;
	max-width: 300px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		right: 10px;
		width: auto; /* Ajuste automático del ancho en tablet */
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
`;

const StyledCheckContainer = styled.div`
	width: 38px;
	height: 26px;
	background: linear-gradient(
		to right,
		${(props) =>
			props.isclicked === 'true'
				? `${colors.button.primaryOff} 10%, ${colors.button.secondaryIconOff} 90%`
				: `${colors.button.primaryIcon} 25%, ${colors.button.primaryIconOff} 75%`}
	);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	transition: background-color 0.3s ease;
	&:hover {
		cursor: pointer;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 34px;
		height: 22px;
	}
`;

const StyledCheckIcon = styled(CheckIcon)`
	width: 18px;
	height: 18px;
	color: ${(props) =>
		props.isclicked === 'true'
			? colors.button.secondaryIcon
			: colors.button.primaryIcon};
	stroke-width: 3;
	display: ${(props) => (props.isclicked == 'true' ? 'block' : 'none')};

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		width: 16px;
		height: 16px;
	}
`;
const StyledCategory = styled.p`
	font-size: 12px;
	color: ${(props) =>
		props.isclicked === 'true'
			? colors.text.secondary
			: colors.text.primary};

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		font-size: 11px;
	}
`;

const StyledContainerNameTask = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;

	@media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
		gap: 8px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
		gap: 8px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
		display: flex;
		gap: 5px;
	}
`;

export default function ItemTask({ task, onEdit, onDelete, onComplete }) {
	const [editingTask, setEditingTask] = useState(null);

	// for (const [key, value] of Object.entries(task)) {
	// 	console.log(`${key}: ${value}`);
	// }

	const handleDelete = () => {
		onDelete(task.id);
	};

	const handleEditSave = (updatedTask) => {
		onEdit(updatedTask);
		setEditingTask(null);
	};

	return (
		<>
			<StyledItemTask
				className={task.completed ? 'fade-exit' : 'fade-enter'}
			>
				<StyledContainerNameTask>
					<StyleTaskIcon />
					<StyledMyTask
						onClick={() => setEditingTask(task)}
						isclicked={task.completed.toString()}
					>
						{task.title}
					</StyledMyTask>
				</StyledContainerNameTask>

				<StyledIconsContainer>
					<StyledCategory isclicked={task.completed.toString()}>
						{task.category}
					</StyledCategory>
					<ButtonEdit
						isclicked={task.completed.toString()}
						onClick={() => setEditingTask(task)}
						isCompleted={task.completed}
					/>
					<ButtonDelete
						onClick={handleDelete}
						isCompleted={task.completed}
					/>
					<StyledCheckContainer
						isclicked={task.completed.toString()}
						onClick={() => onComplete(task)}
					>
						<StyledCheckIcon
							isclicked={task.completed.toString()}
						/>
					</StyledCheckContainer>
				</StyledIconsContainer>
			</StyledItemTask>
			{editingTask && (
				<EditTaskModal
					task={editingTask}
					onSave={handleEditSave}
					onClose={() => setEditingTask(null)}
				/>
			)}
		</>
	);
}
