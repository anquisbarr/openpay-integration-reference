import type React from "react";
import { useState } from "react";
import "./App.css";
import OpenPayComponent from "./OpenPayComponent";
import OpenPayWrapper from "./OpenPayWrapper";

const App: React.FC = () => {
	const [deviceSessionId, setDeviceSessionId] = useState<string>("");
	const [tokenId, setTokenId] = useState<string>("");

	return (
		<div className="App">
			<h1>OpenPay Integration</h1>
			<OpenPayWrapper setDeviceSessionId={setDeviceSessionId} />
			<OpenPayComponent
				deviceSessionId={deviceSessionId}
				setTokenId={setTokenId}
			/>
		</div>
	);
};

export default App;
