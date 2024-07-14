import type { Card, OpenPayError, Token } from "openpay";
import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { env } from "./env";
import useOpenPay from "./hooks/useOpenPay";

const cardFormData = z.object({
	card_number: z.string(),
	holder_name: z.string(),
	expiration_year: z.string(),
	expiration_month: z.string(),
	cvv2: z.string(),
	address: z.optional(
		z.object({
			city: z.string(),
			country_code: z.string(),
			postal_code: z.string(),
			line1: z.string(),
			line2: z.optional(z.string()),
			line3: z.optional(z.string()),
			state: z.string(),
		}),
	),
});

const OpenPayComponent = () => {
	const { deviceSessionId } = useOpenPay(
		env.VITE_OPENPAY_MERCHANT_ID,
		env.VITE_OPENPAY_PUBLIC_KEY,
		true,
	);
	const [tokenId, setTokenId] = useState<string | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const formDataObj = Object.fromEntries(formData.entries());
		const cardData = cardFormData.safeParse(formDataObj);

		if (!cardData.success) {
			console.error("Invalid card data:", cardData.error);
			return;
		}

		if (!window.OpenPay) {
			console.error("OpenPay is not defined");
			return;
		}

		window.OpenPay.token.create(
			cardData.data as Card,
			(response: Token) => {
				console.log("Token created:", response.data);
				setTokenId(response.data.id);
			},
			(error: OpenPayError) => {
				console.error("Token creation error:", error);
			},
		);
	};

	useEffect(() => {
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
					<input type="text" name="holder_name" required />
				</label>
				<br />
				<label>
					Número de tarjeta:
					<input type="text" name="card_number" required />
				</label>
				<br />
				<label>
					CVV:
					<input type="text" name="cvv2" required />
				</label>
				<br />
				<label>
					Mes de expiración:
					<input type="text" name="expiration_month" required />
				</label>
				<br />
				<label>
					Año de expiración:
					<input type="text" name="expiration_year" required />
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
