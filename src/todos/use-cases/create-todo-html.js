import Todo from '../models/todo.model.js'

export const createTodoHTML = ( todo ) => {
    if (!todo) throw new Error('A TODO object is required');
    const html = `<h1>${ todo.description }</h1>`;
    const liElement = document.createElement('li');
    console.log(liElement)
    liElement.innerHTML = html;
    return liElement;
}