import { useToasts } from "react-toast-notifications";

const useToast = () => {
  const { addToast } = useToasts();

  function toastSuccess(message: string) {
    addToast(`${message}!`, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
      placement: "top-center",
    });
  }

  function toastError(message: string) {
    addToast(`${message}!`, {
      appearance: "error",
      autoDismiss: true,
      autoDismissTimeout: 3000,
      placement: "top-center",
    });
  }

  function toastInfo(message: string) {
    addToast(`${message}`, {
      appearance: "info",
      autoDismiss: true,
      autoDismissTimeout: 3000,
      placement: "top-center",
    });
  }

  return { toastError, toastSuccess, toastInfo };
};

export { useToast };
