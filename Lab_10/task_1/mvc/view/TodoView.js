export class TodoView {
    constructor (containerId) {
        this.container = document.getElement;

        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        };


        this.onAddTodo = null;
        this.onToggleTodo = null;
        this.onDeleteTodo = null;
        this.onEditTodo = null;

        console.log('TodoView created');

        this.renderInitialSrtucture();
        this.bindEvents();
    };


    renderInitialSrtucture() {
        this.container.innerHTML = `
            <div class = "todo-app">
                <h1>MVC Todo List</h1>
                <div class = "todo-stats" id = "stats">
                    <span> Total: ${todos.length}</span>
                    <span>Completed: ${completedCount}</span>
                    <span>Pending: ${pendingCount}</span>
                </div>

            
                <form class="todo-form" id="addForm">
                    <input type="text" id="todoInput" placeholder="Add a new todo..." required />
                    <button type="submit">Add</button>
                </form>

                <ul class="todo-list">
                    ${todos.map(todo => `
                        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                            <input
                                type="checkbox"
                                class="todo-toggle"
                                ${todo.completed ? 'checked' : ''}
                                data-action="toggle"
                            />
                            <span class="todo-text" data-action="edit">${todo.text}</span>
                            <button class="todo-delete" data-action="delete">Delete</button>
                        </li>
                `).join('')}
                </ul>
            </div>
        `;

        this.attachEventListeners();
    };


    
}