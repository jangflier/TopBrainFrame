import { Provider as ReduxProvider } from "react-redux";
import AppRoutes from "../routes";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import { ToastsProvider } from "../features/notification/ToastsProvider";
import { ThemeProvider } from "../features/theme/ThemeProvider";

function App() {
	return (
		<ReduxProvider store={store}>
			<ToastsProvider>
				<ThemeProvider>
					<BrowserRouter>
						<AppRoutes />
					</BrowserRouter>
				</ThemeProvider>
			</ToastsProvider>
		</ReduxProvider>
	);
}

export default App;
