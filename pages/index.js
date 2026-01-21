import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

// ===== DOM ELEMENTS =====
const addTodoButton = document.querySelector(".button_action_add"); // ✅ grab modal open button
const addTodoPopup = document.querySelector("#add-todo-popup"); // ✅ modal element
const addTodoForm = addTodoPopup.querySelector(".popup__form"); // ✅ form element inside modal
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close"); // ✅ modal close button
const todosList = document.querySelector(".todos__list"); // ✅ ul container for todos
const counterText = document.querySelector(".counter__text"); // ✅ counter text element

// ===== FORM VALIDATION =====
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();
// ✅ This enables validation on the form and handles showing/hiding errors + disabling/enabling submit button
// ✅ Also handles resetValidation(), which resets form values, errors, and button state (satisfies instructor’s feedback)

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
  const todos = Array.from(todosList.querySelectorAll(".todo")); // ✅ get all current todos

  const completedCount = todos.filter((todo) => {
    const checkbox = todo.querySelector(".todo__completed");
    return checkbox && checkbox.checked;
  }).length;

  counterText.textContent = `Showing ${completedCount} out of ${todos.length} completed`;
  // ✅ dynamically updates the counter whenever todos are added/removed/checked
};

// ===== TODO CREATION =====
function generateTodo(data) {
  const todo = new Todo(data, "#todo-template"); // ✅ Uses the Todo class (required)
  const todoElement = todo.getView(); // ✅ returns the DOM element for this todo

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
  evt.preventDefault(); // ✅ prevents default form submission

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const todoData = {
    id: uuidv4(), // ✅ ensures new todos get a unique ID (satisfies Task 4)
    name,
    completed: false,
    date,
  };

  const todo = generateTodo(todoData);
  todosList.append(todo);

  updateCounter(); // ✅ updates counter after adding a todo
  addTodoFormValidator.resetValidation(); // ✅ resets form values, error messages, and button state (satisfies Task 6)
  closeModal(addTodoPopup); // ✅ closes modal
});

// ===== INITIAL RENDER =====
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

updateCounter(); // ✅ initial render counter update
