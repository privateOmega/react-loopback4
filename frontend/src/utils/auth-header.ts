const authHeader: () => {Authorization: string} | {} = () => {
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : {};
  if (user && user.token) {
    return {Authorization: user.token};
  } else {
    return {};
  }
};

export default authHeader;
