const API_URL = 'https://mgrinko-todo-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const addTodo = () => {};

export const moveTodo = async(todoId, newPosition) => {
  await fetch(`${API_URL}/todos/${todoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ position: newPosition }),
  });
};
