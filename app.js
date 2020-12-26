"use strict";
//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const name = document.getElementById("name");

//Event Listeners event listener when HTML document has been completely loaded
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
name.addEventListener("keydown", setName);
name.addEventListener("blur", setName);

//Run
getName();

//Functions
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.append(newTodo);
  //Add todo to localStorage
  savedLocalTodos(todoInput.value);
  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.append(completedButton);
  //Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.append(trashButton);
  //Append to list
  todoList.append(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //e.target gets the element I'm clicking on (the event target)
  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation with remove todoDiv when transition ends
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.children;
  for (let todo of todos) {
    switch (e.target.value) {
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        todo.style.display = "flex";
    }
  }
}
function checkLocalTodos() {
  //check if I already stored todos in localStorage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function savedLocalTodos(todo) {
  let todos = checkLocalTodos();
  console.log(todos);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = checkLocalTodos();
  todos.forEach((todo) => {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.append(newTodo);
    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.append(completedButton);
    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.append(trashButton);
    //Append to list
    todoList.append(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos = checkLocalTodos();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Set Name
function setName(e) {
  if (e.type === "keydown") {
    //Make sure enter is pressed
    if (e.key === "Enter") {
      localStorage.setItem("name", e.target.textContent);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.textContent);
  }
}

//Get Name
function getName() {
  let savedName = localStorage.getItem("name");
  if (savedName === null) {
    name.textContent = "<What is your name?>";
  } else {
    name.textContent = savedName;
  }
}
