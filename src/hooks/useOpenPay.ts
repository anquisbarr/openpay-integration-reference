import { useCallback, useEffect, useState } from "react";

const loadScript = (src: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => resolve();
		script.onerror = reject;
		document.body.appendChild(script);
	});
};

const useOpenPay = (
	merchantId: string,
	apiKey: string,
	sandboxMode: boolean,
) => {
	const [deviceSessionId, setDeviceSessionId] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const initializeOpenPay = useCallback(async () => {
		try {
			await loadScript("https://js.openpay.pe/openpay.v1.min.js");
			await loadScript("https://js.openpay.pe/openpay-data.v1.min.js");

			window.OpenPay.setId(merchantId);
			window.OpenPay.setApiKey(apiKey);
			window.OpenPay.setSandboxMode(sandboxMode);

			const sessionId = window.OpenPay.deviceData.setup(
				"payment-form",
				"deviceIdHiddenFieldName",
			);
			setDeviceSessionId(sessionId);
			setLoading(false);
		} catch (error) {
			console.error("Error initializing OpenPay:", error);
			setError(
				error instanceof Error
					? error
					: new Error("Failed to initialize OpenPay"),
			);
			setLoading(false);
		}
	}, [merchantId, apiKey, sandboxMode]);

	useEffect(() => {
		initializeOpenPay();
		return () => {
			document
				.querySelectorAll("script[src^='https://js.openpay.pe']")
				.forEach((script) => script.remove());
		};
	}, [initializeOpenPay]);

	return { deviceSessionId, loading, error };
};

export default useOpenPay;
