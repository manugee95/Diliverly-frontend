import { Alert, useRootStore } from "@/components/providers/RootProvider";

let timeoutID: any;
export default function useAlert() {
	const { alert, setAlert } = useRootStore();
	const isError = alert.type === "error";
	const isWarning = alert.type === "warning";
	const isSuccess = alert.type === "success";

	const dismissAlert = () => {
		setAlert({ ...alert, show: false });
	};

	const showAlert = ({ message, type }: Alert) => {
		setAlert({ show: true, message, type });
	};

	const showAndHideAlert = ({ message, type }: Alert) => {
		clearTimeout(timeoutID);
		showAlert({ message, type });
		timeoutID = setTimeout(() => {
			dismissAlert();
		}, 5000);
	};

	return {
		isError,
		isWarning,
		isSuccess,
		dismissAlert,
		showAndHideAlert,
		showAlert,
		alert,
	};
}
