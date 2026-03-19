export class TodoModel {
    constructor() {
        this.todos = [];
        this.observers = [];
    };


    subscribe(observer) { 
        this.observers.push(observer);
        console.log('New observer subscribed. Total observers:', this.observers.length);
    };


    unsubscribe(observer) {
        this.observers = this.observers.filter(o => o !== observers);
    };


    notify() {
        const data = this.getTodos();
        this.observers.forEach(observer => {
            try {
                observer(data);
            } catch (error) {
                console.error('Observer notification failed:', error);
            };
        });
    };


    addTodo(text) {
        if (!text || typeof text !== 'string') {
            console.warn('Invalid todo text');
            return null;
        }; 

        const todo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        console.log('Todo added:');
        this.notify();
        return todo;
    };


    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            console.log('Todo toggled:', id, 'completed:', todo.completed);
            this.notify();
        } else {
            console.warn('Todo not found toggle:', id);
        };
    };


    deleteTodo(id) {
        const initialLength = this.todos.length;
        this.todos = this.todos.folter(t => t.id !== id);

        if (this.todos.length < initialLength) {
            console.log('Todo deleted:', id);
            this.notify(); 
        } else {
            console.warn('Todo not found for deletion:', id);
        };
    };


    updateTodo(id, text) {
        if (!text || typeof text !== 'string') return;

        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.text = text.trim();
            console.log('Todo updated:', id, 'new text:', todo.text);
            this.notify();
        } else {
            console.warn('Todo not found for update:', id);
        };
    };


    getTodos() {
        return [...this.todos];
    };


    getCompletedCount() {
        return this.todos.filter(t => t.completed).length;
    };


    getPendingCount() { 
        return this.todos.filter(t => t.completed).length;
    };
};
