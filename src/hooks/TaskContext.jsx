import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	useCallback,
} from 'react';
import { useIndexedDB } from './useIndexedDB';

const TaskContext = createContext();

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState({ today: [], tomorrow: [] });
	const { getTasks, addTask, deleteTask, updateTask } = useIndexedDB();

	const isSameDay = (date1, date2) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	};
	const processYesterdayTasks = async () => {
		try {
			const allTasks = await getTasks();
			const today = new Date();
			const yesterday = new Date(today);
			yesterday.setDate(yesterday.getDate() - 1);

			const processedTasks = allTasks.flatMap((task) => {
				const taskDate = new Date(task.created_at);

				if (isSameDay(taskDate, yesterday)) {
					if (task.completed) {
						deleteTask(task.id);
						return [];
					} else {
						const updatedTask = {
							...task,
							created_at: today.toISOString(),
						};
						updateTask(updatedTask);
						return [updatedTask];
					}
				}

				return [task];
			});

			setTasks(processedTasks);
		} catch (error) {
			console.error('Error al procesar las tareas de ayer:', error);
		}
	};

	const processAndFilterTasks = useCallback(async () => {
		try {
			const allTasks = await getTasks();
			const today = new Date();
			const tomorrow = new Date(today);
			tomorrow.setDate(tomorrow.getDate() + 1);

			const todayTasks = allTasks.filter((task) =>
				isSameDay(new Date(task.created_at), today)
			);
			const tomorrowTasks = allTasks.filter((task) =>
				isSameDay(new Date(task.created_at), tomorrow)
			);

			const sortTasks = (tasks) =>
				tasks.sort((a, b) =>
					a.completed === b.completed ? 0 : a.completed ? 1 : -1
				);

			setTasks({
				today: sortTasks(todayTasks),
				tomorrow: sortTasks(tomorrowTasks),
			});
		} catch (error) {
			console.error('Error al procesar las tareas:', error);
		}
	}, [getTasks]);

	useEffect(() => {
		processYesterdayTasks();
	}, []);

	useEffect(() => {
		processAndFilterTasks();
	}, []);

	const addNewTask = async (newTask) => {
		try {
			await addTask(newTask);
			await processAndFilterTasks();
		} catch (error) {
			console.error('Error al agregar la tarea:', error);
		}
	};

	const removeTask = async (id) => {
		try {
			await deleteTask(id);
			await processAndFilterTasks();
		} catch (error) {
			console.error('Error al eliminar la tarea:', error);
		}
	};

	const editTask = async (updatedTask) => {
		try {
			await updateTask(updatedTask);
			await processAndFilterTasks();
		} catch (error) {
			console.error('Error al actualizar la tarea:', error);
		}
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				addNewTask,
				removeTask,
				editTask,
				processAndFilterTasks,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}

export function useTasks() {
	return useContext(TaskContext);
}
