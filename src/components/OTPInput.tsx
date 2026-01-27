import { useState, useEffect } from "react";
import { Input } from "./ui/input";

type OtpInputProps = {
	length?: number;
	value?: string;
	onComplete?: (code: string) => void;
};

export function OtpInput({
	length = 6,
	value = "",
	onComplete,
}: OtpInputProps) {
	const [digits, setDigits] = useState<string[]>(
		Array.from({ length }, (_, i) => value[i] ?? "")
	);

	useEffect(() => {
		const code = digits.join("");
		if (code.length === length && !digits.includes("")) {
			onComplete?.(code);
		}
	}, [digits]);

	const handleChange = (index: number, val: string) => {
		if (!/^\d?$/.test(val)) return;

		const next = [...digits];
		next[index] = val;
		setDigits(next);

		if (val && index < length - 1) {
			document.getElementById(`otp-${index + 1}`)?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !digits[index] && index > 0) {
			document.getElementById(`otp-${index - 1}`)?.focus();
		}
	};

	return (
		<div className="flex gap-2 justify-center">
			{digits.map((digit, index) => (
				<Input
					key={index}
					id={`otp-${index}`}
					type="text"
					inputMode="numeric"
					maxLength={1}
					value={digit}
					onChange={(e) => handleChange(index, e.target.value)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					className="w-12 h-12 text-center"
				/>
			))}
		</div>
	);
}
