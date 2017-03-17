import React from 'react';

const TodosList = props => {
	return (
		<section className="todos_list">
			<ul>
				{
					props.todos.map((todo, index) => {
						return (
							<li key={`todo-${index}`}
								className={todo.done ? 'done' : ''}
								onDoubleClick={e => {
									if (e.target == e.currentTarget) {
										if (!todo.editing) {
											todo.editing = !todo.editing;
										}
										props.editTodo(e, todo.editing, todo.content, index);
										e.preventDefault();
										e.stopPropagation();
									}
								}}>
								<input
									type="checkbox"
									checked={todo.done ? 'checked' : ''}
									onChange={() => {
										todo.done = !todo.done;
										props.changeTodoStatus(todo.done, index);
									}}
								/>
								<input
									type="text"
									style={{ display: todo.editing ? 'block' : 'none' }}
									onBlur={() => {
										props.cancelEdit(index);
									}}
									onKeyUp={e => {
										if (e.keyCode == 13) {
											let edited_value = e.target.value.trim();
											props.doneEdit(edited_value, todo, index);
										}
									}}
								/>
								{todo.content}
							</li>
						)
					})
				}
			</ul>
		</section>
	);
}

export default TodosList;
