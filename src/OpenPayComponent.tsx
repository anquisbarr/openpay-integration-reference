import type React from "react";
import { useEffect, useState } from "react";
import { env } from "./env";

const OpenPayComponent: React.FC = () => {
	const [deviceSessionId, setDeviceSessionId] = useState("");
	const [tokenId, setTokenId] = useState("");

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
					"formularioPago_1",
					"deviceIdHiddenFieldName",
				);
				setDeviceSessionId(sessionId);
			} catch (error) {
				console.error("Error al inicializar OpenPay:", error);
			}
		};

		initializeOpenPay();
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Formulario enviado");

		const formData = new FormData(event.currentTarget);

		const cardData = {
			card_number: formData.get("cardNumber")?.toString() || "",
			holder_name: formData.get("cardholderName")?.toString() || "",
			expiration_year: formData.get("expirationYear")?.toString() || "",
			expiration_month: formData.get("expirationMonth")?.toString() || "",
			cvv2: formData.get("cvv")?.toString() || "",
		};

		if (!window.OpenPay) {
			console.error("OpenPay is not defined");
			return;
		}

		window.OpenPay.token.create(
			cardData,
			(response) => {
				console.log("Token created:", response.data);
				setTokenId(response.data.id);
			},
			(error) => {
				console.error("Token creation error:", error);
			},
		);
	};

	useEffect(() => {
		// Ensure that the token ID is set once is being updated after the form submission
		if (tokenId) {
			console.log("Token ID:", tokenId);
		}
	}, [tokenId]);

	return (
		<div>
			<h2>Formulario de Pago</h2>
			<form id="formularioPago_1" onSubmit={handleSubmit}>
				<label>
					Nombre en la tarjeta:
					<input type="text" name="cardholderName" required />
				</label>
				<br />
				<label>
					Número de tarjeta:
					<input type="text" name="cardNumber" required />
				</label>
				<br />
				<label>
					CVV:
					<input type="text" name="cvv" required />
				</label>
				<br />
				<label>
					Mes de expiración:
					<input type="text" name="expirationMonth" required />
				</label>
				<br />
				<label>
					Año de expiración:
					<input type="text" name="expirationYear" required />
				</label>
				<br />
				<input
					type="text"
					id="deviceIdHiddenFieldName"
					name="deviceIdHiddenFieldName"
					value={deviceSessionId}
					readOnly
				/>
				<button type="submit">Pagar</button>
			</form>
		</div>
	);
};

export default OpenPayComponent;
