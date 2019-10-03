const API_URL = 'https://mgrinko-todo-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const updateTodo = (
  todoId, newTitleOfTodo, todoCompleted, todoIndex
) => {
  const data = {
    title: newTitleOfTodo,
    completed: todoCompleted,
    position: todoIndex,
  };

  fetch(`https://mgrinko-todo-api.herokuapp.com/todos/:${todoId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    // eslint-disable-next-line
    .then((res) => { console.log(res); })
    // eslint-disable-next-line
    .catch((res) => { console.error(res); });
};

export const addTodo = () => {};
