import Todo from '../todos/models/todo.model.js'

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos:[
        new Todo('Levantarse'),
        new Todo('Sacar perros'),
        new Todo('Desayunar')
    ],
    filter: Filters.All
}

const initStore = () => {
    console.log('InitStore');
    console.log(state)
}

const loadStore = () =>{
    throw new Error('Not implemented');
}

const addTodo = (description) =>{
    if (!description) throw new Error('The description is required,');
    state.todos.push( new Todo(description));
}

const getTodos = (filter = Filters.All) => {
    switch( filter ){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid.`)
    }
}

const toggleTodo = (todoId) => {
    
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })
}

const deleteTodo = (todoId) =>{
    state.todos = state.todos.filter( todo => todo.id !== todoId );
}

const deleteCompletedTodos = () =>{
    state.todos = state.todos.filter( todo => todo.done );
}

const setSelectedFilter = (newFilter = Filters.All) => {
    if (Object.keys(Filters).includes(newFilter)){
        state.filter = newFilter;
    }else{
        throw new Error(`The filter ${newFilter} doesn't exist.`)
    }


}

const getCurrentFilter = () => {
    return state.filter;
}




export default{
    initStore,
    loadStore,
    addTodo,
    getTodos,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
    setSelectedFilter,
    getCurrentFilter,
}