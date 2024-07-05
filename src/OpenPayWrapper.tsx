import type React from "react";
import { useEffect, useState } from "react";

interface OpenPayWrapperProps {
	onLoad: () => void;
}

const OpenPayWrapper: React.FC<OpenPayWrapperProps> = ({ onLoad }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const loadScripts = async () => {
			const script1 = document.createElement("script");
			script1.src = "https://js.openpay.pe/openpay.v1.min.js";
			script1.async = true;
			script1.onload = () => {
				const script2 = document.createElement("script");
				script2.src = "https://js.openpay.pe/openpay-data.v1.min.js";
				script2.async = true;
				script2.onload = () => {
					setLoaded(true);
					onLoad();
				};
				document.body.appendChild(script2);
			};
			document.body.appendChild(script1);
		};

		if (!window.OpenPay) {
			loadScripts();
		} else {
			setLoaded(true);
			onLoad();
		}
	}, [onLoad]);

	if (!loaded) {
		return <div>Loading payment gateway...</div>;
	}

	return null;
};

export default OpenPayWrapper;
