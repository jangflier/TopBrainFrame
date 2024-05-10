import { Provider as ReduxProvider } from "react-redux";
import AppRoutes from "../routes";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import { ToastsProvider } from "../features/notification/ToastsProvider";

function App() {
	return (
		<ReduxProvider store={store}>
			<ToastsProvider>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</ToastsProvider>
		</ReduxProvider>
	);
}

export default App;
