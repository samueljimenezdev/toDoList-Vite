import html from './app.html?raw'

/**
 * 
 * @param {string} elementId 
 */
export const App = (elementId) => {
// Cuando funciona la app se va a llamar
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
})();
}