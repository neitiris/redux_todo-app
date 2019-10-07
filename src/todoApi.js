const API_URL = 'https://mgrinko-todo-api.herokuapp.com';
// const API_URL = 'http://localhost:5000';

const wait = delay => new Promise(resolve => setTimeout(resolve, delay));
const patchToServer = async(todoId, body) => fetch(
  `${API_URL}/todos/${todoId}`,
  {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  }
);

export const getTodos = async() => {
  await wait(500);
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const moveTodo = (todoId, newPosition) => {
  patchToServer(todoId, { position: newPosition });
};

export const updateTodoTitle = (todoId, newTitleOfTodo) => {
  patchToServer(todoId, { title: newTitleOfTodo });
};

export const toggleAll = async(allCompleted, todoIds) => {
  try {
    const fetchedTodo = async(todoId) => {
      await patchToServer(todoId, { completed: !allCompleted });
    };

    await Promise.all(
      todoIds.map(todoId => fetchedTodo(todoId))
    );

    return 'success fetching toggleAll';
  } catch {
    return 'error while fetching toggleAll';
  }
};

export const toggleTodo = async(todo) => {
  try {
    await patchToServer(todo.id, { completed: !todo.completed });

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

export const removeCompleted = async(completed) => {
  await wait(500);
  completed.map(todo => removeTodo(todo.id));
};

export const addTodoOnServer = async(title) => {
  await wait(1000);

  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  return response.json();
};
