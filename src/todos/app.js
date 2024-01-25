import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos } from "./use-cases";

const ElementIDs = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  clearCompleted: ".clear-completed",
  TodoFilters: ".filtro",
};

/**
 *
 * @param {string} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
  };

  // Cuando funciona la app se va a llamar
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // HTML references

  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompleted = document.querySelector(ElementIDs.clearCompleted);
  const filtersUL = document.querySelectorAll(ElementIDs.TodoFilters);

  // Listener

  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length == 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUL.addEventListener("click", (event) => {
    if (!event.target.classList.contains("destroy")) return;
    const element = event.target.closest("[data-id]");
    todoStore.deleteTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  clearCompleted.addEventListener("click", (event) => {
    todoStore.deleteCompletedTodos();
    displayTodos();
  });

  filtersUL.forEach((element) => {
    element.addEventListener('click', (element) => {
        filtersUL.forEach( (el) => el.classList.remove('selected'));
        element.target.classList.add('selected');
        switch(element.target.text){
            case 'Todos':
                todoStore.setSelectedFilter(Filters.All);
                break;
            case 'Pendientes':
                todoStore.setSelectedFilter(Filters.Pending);
                break;
            case 'Completados':
                todoStore.setSelectedFilter(Filters.Completed);
                break;
            default:
                throw new Error("This filter doesn't exist");
        }

        displayTodos();
    });
  });

};
