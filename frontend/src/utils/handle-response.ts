const handleResponse = async (response: Response) => {
  const text = await response.text();
  if (!response.ok) {
    if (response.status === 401) {
      // TODO: auto logout if 401 response
    }
    const error = response.statusText;
    throw new Error(error);
  }
  return text && JSON.parse(text);
};

export default handleResponse;
