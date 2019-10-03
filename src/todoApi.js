const API_URL = 'https://mgrinko-todo-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const removeTodo = async(id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  
  return response.json();
};

export const addTodoOnServer = async(title) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  return response.json();
};
