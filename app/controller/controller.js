import { getItem, setItem } from '../utils/storage';

function updateTodo(new_todo, modelName, callback){
  let todolist = getTodos('todos');
  const updatedTodos = todolist.map(todo => {
    if(todo.id == new_todo.id){
      todo = new_todo;
    }
    return todo;
  });
  saveTodos(updatedTodos, modelName, callback);
}

function addTodo(todo, modelName){
  let todolist = getTodos('todos');
  const concated_todos = todolist.concat([todo]);
  saveTodos(concated_todos, modelName);
}

function deleteTodo(predelete_todo, modelName){
  let todolist = getTodos('todos');
  let foundIndex;
  todolist.forEach((todo, index) => {
    if(todo.id == predelete_todo.id){
      foundIndex = index;
    }
  });
  todolist.splice(foundIndex, 1);
  saveTodos(todolist, modelName);
}

function getTodos(modelName){
  let todolist = getItem(modelName) || [];
  if(typeof todolist == 'string')
    todolist = JSON.parse(todolist);
  return todolist;
}

function saveTodos(todos, modelName, callback){
  if(typeof todos != 'string')
    todos = JSON.stringify(todos);
  setItem(modelName, todos);
  setTimeout(() => {
    callback && callback();
  }, 50);
}

export { updateTodo, addTodo, deleteTodo }