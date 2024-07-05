import type openpay from "openpay";

declare global {
	interface Window {
		OpenPay: typeof openpay;
	}
}
