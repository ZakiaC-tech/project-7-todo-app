import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

// ===== DOM ELEMENTS =====
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");

// ===== FORM VALIDATION =====
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

// ===== MODAL HELPERS =====
const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup);
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose);
};

// ===== COUNTER =====
const updateCounter = () => {
  const todos = Array.from(todosList.children);
  const completedCount = todos.filter(
    (todo) => todo.querySelector(".todo__completed").checked
  ).length;

  counterText.textContent = `Showing ${completedCount} out of ${todos.length} completed`;
};

// ===== TODO CREATION =====
function generateTodo(data) {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  // Update counter when checkbox changes or item is deleted
  const checkbox = todoElement.querySelector(".todo__completed");
  const deleteBtn = todoElement.querySelector(".todo__delete-btn");

  checkbox.addEventListener("change", updateCounter);
  deleteBtn.addEventListener("click", updateCounter);

  return todoElement;
}

// ===== EVENT LISTENERS =====
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const todoData = {
    id: uuidv4(),
    name,
    completed: false,
    date,
  };

  const todo = generateTodo(todoData);
  todosList.append(todo);

  updateCounter();
  addTodoFormValidator.resetValidation();
  closeModal(addTodoPopup);
});

// ===== INITIAL RENDER =====
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

updateCounter();
