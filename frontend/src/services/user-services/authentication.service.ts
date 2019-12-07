import {authHeader, handleResponse} from '../../utils';

async function login(email: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/login`,
      requestOptions,
    );
    const loginResponse = await handleResponse(response);
    return loginResponse;
  } catch (error) {
    throw error;
  }
}

async function register(body: object) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users`,
      requestOptions,
    );
    const registerResponse = await handleResponse(response);
    return registerResponse;
  } catch (error) {
    throw error;
  }
}

async function logout() {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
  };
  try {
    await fetch(
      `${process.env.REACT_APP_API_URL}/users/logout`,
      requestOptions,
    );
  } catch (error) {
    // NOOP
  } finally {
    localStorage.removeItem('user');
  }
}

export {login, register, logout};
