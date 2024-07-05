import type React from "react";
import "./App.css";
import OpenPayComponent from "./OpenPayComponent";

const App: React.FC = () => {
	return (
		<div className="App">
			<h1>Prueba de OpenPay en React</h1>
			{/* Render the OpenPay component */}
			<OpenPayComponent />
		</div>
	);
};

export default App;
