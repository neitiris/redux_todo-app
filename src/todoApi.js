const API_URL = 'https://mgrinko-todo-api.herokuapp.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const updateTodo = (todo, newTitleOfTodo, todoIndex) => {
  const data = {
    title: newTitleOfTodo,
    completed: false,
    position: todoIndex,
  };

  fetch(`https://mgrinko-todo-api.herokuapp.com/todos/:${todo.id}`,
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    })
    // eslint-disable-next-line
    .then((res) => res.json())
    // eslint-disable-next-line
    .then((response) => { console.log('Success:', response); } )
    // eslint-disable-next-line
    .catch((res) => { console.error(res); });
};

export const addTodo = () => {};
