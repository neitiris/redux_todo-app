const API_URL = 'https://mgrinko-todo-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const addTodo = () => {};

export const toggleTodo = async(todo) => {
  try {
    await fetch(`${API_URL}/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todo.completed }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    return 'success fetching todoToggle';
  } catch {
    return 'error while fetching todoToggle';
  }
};
