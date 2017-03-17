import React from 'react';

const TodosInput = props => {
	return (
		<section className="todos_input">
			<input
				type="text"
				placeholder="What would you want to do?"
				onKeyUp={e => {
					if (e.keyCode == 13 && e.target.value.trim() !== '') {
						props.addTodo(e);
					}
				}}
			/>
		</section>
	);
}

export default TodosInput;
