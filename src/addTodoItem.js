import { removeTodoFromSStorage, getTodosFromSStorage } from "./sessionStorage";
import { addDisabledSelect } from "./index";

export const getTodoItem = (text) => {
  // Create Todo Item
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  // Create and add Todo Text
  const todoText = document.createElement("span");
  todoText.innerText = text;
  todoText.classList.add("todo-text");
  todoItem.appendChild(todoText);

  // Create and add Check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("todo-check-button");
  checkButton.addEventListener("click", toggleCheckButton(todoItem));
  todoItem.appendChild(checkButton);

  // Create and add Remove button
  const removeButton = document.createElement("button");
  removeButton.innerHTML = '<i class="fas fa-trash"></i>';
  removeButton.classList.add("todo-remove-button");
  removeButton.addEventListener("click", removeTodoItem(todoItem));
  todoItem.appendChild(removeButton);

  return todoItem;
};



function removeTodoItem(todoItem) {
  return (e) => {
    e.preventDefault();
    todoItem.classList.add("todo-item_fall");
    todoItem.addEventListener("transitionend", function () {
      removeTodoFromSStorage(todoItem);
      todoItem.remove();
      addDisabledSelect();
    });
  };
}

function toggleCheckButton(todoItem) {
  return (e) => {
    let todos = getTodosFromSStorage();
    const todoText = Array.from(todoItem.childNodes).find((node) =>
      node.classList.contains("todo-text"));

    if (todoText) {
      const filtredTodos = todos.map((item) => {
        if (item.value == todoText.innerText && item.status === "uncompleted") {
          return {
            value: todoText.innerText,
            status: "completed"
          }
        } else if (item.value == todoText.innerText && item.status === "completed") {
          return {
            value: todoText.innerText,
            status: "uncompleted"
          }
        }
        return item
      }
      );
    sessionStorage.setItem("todos", JSON.stringify(filtredTodos));
  }
    e.preventDefault();
    todoItem.classList.toggle("todo-item_completed");
  };
}
