import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import TodosBox from './components/TodosBox';

const initTodos = [];
// Render the main component into the dom
ReactDOM.render(
	<TodosBox initTodos={initTodos}/>,
	document.getElementById('app')
);
