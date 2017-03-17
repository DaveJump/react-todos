require('normalize.css/normalize.css');
require('styles/todos.scss');

import React from 'react';

//components
import TodosList from 'components/TodosList';
import TodosInput from 'components/TodosInput';
import TodosFilter from 'components/TodosFilter';

//controller
import { updateTodo, addTodo, deleteTodo } from '../controller/controller';
import { getItem } from '../utils/storage';

class TodosBox extends React.Component {
	constructor(props){
		super();
		this.state = {
			todos: props.initTodos,
			filter: 'all'
		}
	}
	componentDidMount(){
		this.setState({
			todos: getItem('todos') || []
		});
	}
	shouldComponentUpdate(prevState,nextState){
		if(prevState.todos !== nextState.todos){
			return true;
		}
		return false;
	}
	filterTodo(filter){
		let AllTodos = getItem('todos') || [];
		let filteredTodos = AllTodos.filter(todo => {
			if(filter == 'all'){
				return todo;
			}else if(filter == 'done'){
				if(todo.done)
					return todo;
			}else if(filter == 'undone'){
				if(!todo.done)
					return todo;
			}
		});
		this.setState({ filter, todos: filteredTodos });
	}
	addTodo(e){
		let _random = Math.random().toFixed(6);
		let _new_todo = {
			id: _random,
			done: false,
			editing: false,
			content: e.target.value
		};
		if(this.state.filter == 'all' || this.state.filter == 'undone'){
			this.state.todos = this.state.todos.concat([_new_todo]);
		}
		this.setState({
			todos: this.state.todos
		}, () => {
			addTodo(_new_todo, 'todos');
		});
		e.target.value = '';
	}
	editTodo(e, status, content, index){
		this.state.todos[index].editing = status;
		const _editInput = e.target.children[1];
		this.setState({
			todos: this.state.todos
		},() => {
			_editInput.value = content;
			_editInput.focus();
		});
	}
	doneEdit(content, todo, index){
		this.state.todos[index].editing = false;
		if(!content.length){
			this.deleteTodo(todo, index);
			this.setState({
				todos: this.state.todos
			});
		}else{
			this.state.todos[index].content = content;
			this.setState({
				todos: this.state.todos
			}, () => {
				updateTodo(this.state.todos[index], 'todos');
			});
		}
	}
	cancelEdit(index){
		if(this.state.todos.length && typeof index != 'undefined'){
			this.state.todos[index].editing = false;
			this.setState({
				todos: this.state.todos
			});
		}
	}
	deleteTodo(todo, index){
		this.state.todos.splice(index,1);
		deleteTodo(todo,'todos');
	}
	changeTodoStatus(status, index){
		this.state.todos[index].done = status;
		this.setState({
			todos: this.state.todos
		}, () => {
			updateTodo(this.state.todos[index], 'todos', () => {
				this.filterTodo(this.state.filter);
			});
		});
	}
  render() {
    return (
    	<div>
	    	<h1><i>Things todo</i></h1>
	    	<h3>"enter" to add an item <br/>"doubleclick" to edit an item, "enter" to done edit</h3>
	      <section className="todos_box">
	      	<TodosInput addTodo={this.addTodo.bind(this)}/>
	        <TodosList
						todos={this.state.todos}
						changeTodoStatus={this.changeTodoStatus.bind(this)}
						editTodo={this.editTodo.bind(this)}
						cancelEdit={this.cancelEdit.bind(this)}
						doneEdit={this.doneEdit.bind(this)}
						deleteTodo={this.deleteTodo}
					/>
					<TodosFilter
						filter={this.state.filter}
						filterTodo={this.filterTodo.bind(this)}/>
	      </section>
    	</div>
    );
  }
}

export default TodosBox;
