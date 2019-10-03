const API_URL = 'https://mgrinko-todo-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);

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

export const updateTodo = (todoId, newTitleOfTodo) => {
  const data = {
    title: newTitleOfTodo,
  };

  fetch(`https://mgrinko-todo-api.herokuapp.com/todos/${todoId}`,
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    });
};

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

export const removeTodo = async(id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  return response.json();
};
