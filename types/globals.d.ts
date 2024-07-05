import type { Jsonp, OpenPay } from "openpay";

declare global {
	interface Window {
		OpenPay: OpenPay;
		$jsonp: Jsonp;
	}
}
