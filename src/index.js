import "../styles/index.css";
import "../index.html";

import { getTodoItem} from "./addTodoItem";
import { saveTodoToSStorage, getTodosFromSStorage } from "./sessionStorage";
import { filterTodoItems } from "./filterTodoItems";
import {
  clearTodoInput,
  getTodoInputItems,
  validateTodoInput,
  helperInvisible,
} from "./todoInput";

const todoInputWrapper = document.querySelector(".todo-input-wrapper");
const { todoInput, todoButton } = getTodoInputItems(todoInputWrapper);
const todoList = document.querySelector(".todo-list");
const todoSelect = document.querySelector(".todo-select");
const todoSelectWrapper = document.querySelector(".todo-select-wrapper")

document.addEventListener("DOMContentLoaded", onDOMLoaded);
todoInput.addEventListener("input", () => validateTodoInput(todoInputWrapper));
todoInput.addEventListener("keydown", preventSubmitEnter);
todoInput.addEventListener("focus", () => validateTodoInput(todoInputWrapper));
todoInput.addEventListener("blur", () => helperInvisible(todoInputWrapper))
todoButton.addEventListener("click", addTodo);
todoSelect.addEventListener("change", filterTodos);


function onDOMLoaded() {
  renderTodosFromSStorage();
  addDisabledSelect();
  //helperInvisible(todoInputWrapper)
  //validateTodoInput(todoInputWrapper);
}

export function addDisabledSelect() {
  if (!todoList.children.length) {
      todoSelect.setAttribute("disabled", "disabled");
      todoSelectWrapper.classList.add('todo-select-wrapper_disabled')
  }
}

function removeDisabledSelect() {
 if (todoList.children.length) {
    todoSelect.removeAttribute("disabled")
    todoSelectWrapper.classList.remove('todo-select-wrapper_disabled')
  }
}

function renderTodosFromSStorage() {
  let todos = getTodosFromSStorage();
  console.log(todos)

  todos.forEach((todoValue) => {
    const todoItem = getTodoItem(todoValue.value);
    if (todoValue.status === 'completed') {
      todoItem.classList.add('todo-item_completed')
    }
    // Add todo item to list
    todoList.appendChild(todoItem);
  });
}

function preventSubmitEnter(e) {
  if ((e.key === "Enter") && (todoInput.value.length < 3) )
    {e.preventDefault()}
}

function addTodo(event) {
  event.preventDefault();
  const valueForStorage = {
    value: todoInput.value,
    status: "uncompleted"
  }
  saveTodoToSStorage(valueForStorage);
  const todoItem = getTodoItem(todoInput.value);
  todoList.appendChild(todoItem);
  removeDisabledSelect()


  clearTodoInput(todoInputWrapper);
}

function filterTodos(e) {
  const todoItems = todoList.childNodes;

  filterTodoItems(todoItems, e.target.value);
}

// TODO fix bugs:
// 1. select should be disabled when no option is displayed
// 2. forbid form submit with enter key, when input value is less than 3 characters
// 3. when todoInput is not in focus, helper text should not be displayed
// 4. save to session storage todo state: completed, not completed - and update it