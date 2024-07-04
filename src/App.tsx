import type React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import OpenPayComponent from "./OpenPayComponent"; // Ensure the import path is correct

const App: React.FC = () => {
	return (
		<div className="App">
			<Helmet>
				{/* Load OpenPay scripts */}
				{/* <script src="https://js.openpay.pe/openpay.v1.min.js" type="text/javascript" />
                <script src="https://js.openpay.pe/openpay-data.v1.min.js" type="text/javascript" /> */}
			</Helmet>
			<h1>Prueba de OpenPay en React</h1>
			{/* Render the OpenPay component */}
			<OpenPayComponent />
		</div>
	);
};

export default App;
