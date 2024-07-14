import type React from "react";
import "./App.css";
import OpenPayComponent from "./OpenPayComponent";

const App: React.FC = () => {
	return (
		<div className="App">
			<h1>OpenPay Integration</h1>
			<OpenPayComponent />
		</div>
	);
};

export default App;
