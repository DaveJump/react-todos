import React from 'react';

const TodosFilter = props => {
  return (
    <section
      className="todos_filter">
      <span
        className={props.filter == 'all' ? 'current' : ''}
        onClick={() => {props.filterTodo('all')}}>
        All
      </span>
      <span
        className={props.filter == 'done' ? 'current' : ''}
        onClick={() => {props.filterTodo('done')}}>
        Done
      </span>
      <span
        className={props.filter == 'undone' ? 'current' : ''}
        onClick={() => {props.filterTodo('undone')}}>
        Undone
      </span>
    </section>
  );
}

export default TodosFilter;