const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUser = async(userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};
