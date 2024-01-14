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


export default{
    initStore
}