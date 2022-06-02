import { toast } from "react-toastify";

export function showLoadingToaster(message: string): any {
  toast.loading(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
}

export function showSuccessToaster(
  action: any,
  message: string,
  type: any = "success"
): any {
  if (!action.payload.sucessToasterAlreadyDisplayed) {
    toast.dismiss();
    toast(message, {
      type,
      autoClose: 3000,
      theme: "colored",
    });
  }
  action.payload.sucessToasterAlreadyDisplayed = true;
}

export function showErrorToaster(message: string): void {
  toast.dismiss();
  toast.error(message, {
    type: "error",
    autoClose: 3000,
    theme: "colored",
  });
}
