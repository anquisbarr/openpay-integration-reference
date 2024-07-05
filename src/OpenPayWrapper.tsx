import type React from "react";
import { useEffect } from "react";
import { env } from "./env";

interface OpenPayWrapperProps {
	setDeviceSessionId: React.Dispatch<React.SetStateAction<string>>;
}

const OpenPayWrapper: React.FC<OpenPayWrapperProps> = ({
	setDeviceSessionId,
}) => {
	useEffect(() => {
		const loadScript = (src: string): Promise<void> => {
			return new Promise((resolve, reject) => {
				const script = document.createElement("script");
				script.src = src;
				script.onload = () => resolve();
				script.onerror = () =>
					reject(new Error(`Script load error for ${src}`));
				document.body.appendChild(script);
			});
		};

		const initializeOpenPay = async () => {
			try {
				await loadScript("https://js.openpay.pe/openpay.v1.min.js");
				await loadScript("https://js.openpay.pe/openpay-data.v1.min.js");

				window.OpenPay.setId(env.VITE_OPENPAY_MERCHANT_ID);
				window.OpenPay.setApiKey(env.VITE_OPENPAY_PUBLIC_KEY);
				window.OpenPay.setSandboxMode(true);

				const sessionId = window.OpenPay.deviceData.setup(
					"payment-form",
					"deviceIdHiddenFieldName",
				);
				setDeviceSessionId(sessionId);
			} catch (error) {
				console.error("Error initializing OpenPay:", error);
			}
		};

		initializeOpenPay();
	}, [setDeviceSessionId]);

	return null;
};

export default OpenPayWrapper;
