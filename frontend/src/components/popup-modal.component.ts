import Swal from 'sweetalert2';

interface PopupModalOptionsInterface {
  titleText?: string;
  text?: string;
  icon?: 'success' | 'error' | 'question' | 'info' | 'warning';
  timer?: number;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

async function PopupModal(
  {
    titleText = 'Popup',
    text = 'message',
    icon,
    timer,
    showConfirmButton = false,
    showCancelButton = false,
    confirmButtonText = 'Ok',
    cancelButtonText = 'Cancel',
  }: PopupModalOptionsInterface,
  onSubmit = () => {},
  onCancel = () => {},
) {
  const swal = await Swal.fire({
    titleText,
    text,
    icon,
    timer,
    showConfirmButton,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
  });
  if (swal.value) {
    onSubmit();
  } else {
    onCancel();
  }
  return null;
}

export default PopupModal;
