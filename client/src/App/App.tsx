import { Provider } from "react-redux";
import AppRoutes from "../routes";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import { ToastsProvider } from "../features/notification/ToastsProvider";

function App() {
	return (
		<Provider store={store}>
			<ToastsProvider>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</ToastsProvider>
		</Provider>
	);
}

export default App;
