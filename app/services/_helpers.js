export const setToken = (key, token) => {
  const object = { token, timestamp: new Date().getTime() };
  localStorage.setItem(key, JSON.stringify(object));
};

export const getToken = (key, delay) => {
  const object = JSON.parse(localStorage.getItem(key));
  const dateString = object.timestamp;
  const now = new Date().getTime().toString();

  if (now - dateString < delay * 1000) {
    return object.token;
  }
  return false;
};
