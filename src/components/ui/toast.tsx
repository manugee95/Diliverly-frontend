"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon, TriangleAlertIcon } from "lucide-react";
import useAlert from "@/hooks/useAlert";

export default function Toast() {
	const { alert, dismissAlert, isSuccess, isWarning, isError } = useAlert();

	return (
		<AnimatePresence>
			{alert.show && (
				<motion.div
					initial={{ translateX: 1000 }}
					animate={{ translateX: 0 }}
					exit={{ translateX: 1000 }}
					className={`fixed top-[3%] h-[65px] rounded-2xl w-[90%] md:w-[500px] border-[1.5px] right-[10px] flex items-center gap-[10px] px-[10px] shadow-lg z-[999999999999999]! ${
						isSuccess ? "bg-[#E7FFE8] border-[#7BCD7996]" : ""
					} ${isError ? "border-[#ED323799] bg-[#FFE7E7]" : ""} ${
						isWarning ? "border-[#94611a99] bg-[#feeedb]" : ""
					}`}>
					<div
						className={`shrink-0 w-[35px] h-[35px] rounded-full flex items-center justify-center  ${
							isSuccess ? "bg-[#048F2B30]" : ""
						} ${isError ? "bg-[#ED3237]" : ""} ${
							isWarning ? "bg-[#ed9c32]" : ""
						}`}>
						<TriangleAlertIcon stroke="#048F2B" />
					</div>
					<div className="grow flex items-center justify-between">
						<span className="text-sm font-medium">{alert.message}</span>
						<button
							onClick={() => dismissAlert()}
							className="w-[35px] h-[35px] rounded-full flex items-center justify-center">
							<XIcon
								fill={isSuccess ? "#048F2B" : isError ? "#ED3237" : "#ed9c32"}
							/>
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
