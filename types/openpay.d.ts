declare module "openpay" {
	interface OpenPayError {
		category: string;
		description: string;
		error_code: number;
		http_code: number;
		request_id: string;
	}

	interface Card {
		id: string;
		type: string;
		brand: string;
		allows_charges: boolean;
		allows_payouts: boolean;
		creation_date: string;
		bank_name: string;
		holder_name: string;
		card_number: string;
		expiration_month: string;
		expiration_year: string;
		address: Address;
	}

	interface Address {
		city: string;
		country_code: string;
		postal_code: string;
		line1: string;
		line2?: string;
		line3?: string;
		state: string;
	}

	interface TokenData {
		id: string;
		card: Card;
		creation_date: string;
	}

	interface Token {
		data: TokenData;
	}

	type SuccessCallback<T> = (response: T) => void;
	type ErrorCallback = (error: OpenPayError) => void;

	interface JsonpOptions<TData = unknown, TError = unknown> {
		callbackName: string;
		onSuccess: (data: TData) => void;
		onError: (error: TError) => void;
		timeout: number;
		url: string;
		data: TData;
	}

	export interface Jsonp {
		send<TData = unknown, TError = unknown>(
			options: JsonpOptions<TData, TError>,
		): void;
	}

	export interface OpenPay {
		setId(id: string): void;
		getId(): string;
		setApiKey(key: string): void;
		getApiKey(): string;
		setSandboxMode(mode: boolean): void;
		getSandboxMode(): boolean;
		card: {
			create(
				data: {
					card_number: string;
					holder_name: string;
					expiration_year: string;
					expiration_month: string;
					cvv2?: string;
					address?: Address;
				},
				success: SuccessCallback<Token>,
				error: ErrorCallback,
			): void;
			validateCardNumber(cardNumber: string): boolean;
			validateCVC(cvc: string): boolean;
			validateExpiry(month: string, year: string): boolean;
		};
		token: {
			create(
				data: {
					card_number: string;
					holder_name: string;
					expiration_year: string;
					expiration_month: string;
					cvv2?: string;
					address?: Address;
				},
				success: SuccessCallback<Token>,
				error: ErrorCallback,
			): void;
		};
		deviceData: {
			setup(elementId: string, deviceIdFieldName?: string): string;
		};
	}

	const openpay: OpenPay;
	export default openpay;
}
