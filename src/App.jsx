import TaskList from './components/TaskList';
import { TaskProvider } from './hooks/TaskContext';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<TaskProvider>
					<TaskList />
				</TaskProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
