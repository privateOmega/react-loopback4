const {REACT_POPUP_CLOSE_TIME} = process.env;

export const POPUP_CLOSE_TIME: number = +(REACT_POPUP_CLOSE_TIME || 1500);

interface PopupTypeInterface {
  [P: string]: 'success' | 'error' | 'warning' | 'info' | 'question';
}

export const POPUP_TYPE: PopupTypeInterface = {
  SUCCESS: 'success',
  ERROR: 'error',
  QUESTION: 'question',
  INFORMATION: 'info',
  WARNING: 'warning',
};

export const CONFIRM_BUTTON = {
  YES: 'Yes',
  NO: 'No',
};

export const STRINGS = {
  OKAY: 'Okay',
  CLOSE: 'Close',
  CONTINUE: 'Continue',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  RESET: 'Reset',
};

// Login
export const LOGIN_SUCCESS_TITLE = 'Login Successful';
export const LOGIN_SUCCESS_MESSAGE = 'User login successful';
export const LOGIN_FAILURE_TITLE = 'Login Failure';
export const LOGIN_FAILURE_MESSAGE = 'User login failed';
