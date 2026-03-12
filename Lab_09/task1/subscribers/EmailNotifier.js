import eventBus from "../pubsub/EventBus";

export class EmailNotifier {
    constructor(email) {
        this.email = email;
        this.subscriptions = [];
        this.sentCount = 0;
        this.receivedarticles = [];
        console.log(`[Email] Создан уведомитель для ${email}`); 
    };

    subscribe(categories) {
        categories.forEach(category => {
            const unsubscribe = eventBus.subscribe(`news:${category}`, (article) => {
                this.sendEmail(article);
            });
            this.subscriptions.push(unsubscribe);
        });

        console.log(`[Email] Подписан на: ${categories.join(', ')}`);
    };


    subscribeUrgent() {
        const unsubscribe = eventBus.subscribe('news:urgent', (article) => {
            this.sendEmail(article, true);
        });
        this.subscriptions.push(unsubscribe);
        console.log('[Email] Подписан на срочные новости');
    };


    sendEmail(article, isUrgent = false) {
        this.sentCount++;
        this.receivedarticles.push(article);

        const prefix = isUrgent ? 'СРОЧНО' : '@';
        console.log(`${prefix} [${this.email}]`);
        console.log(`Тема: ${article.headline}`);
        console.log(`Категория: ${article.category} | Источник: ${article.source}`);
        console.log(`Содержание: ${article.content.substring(0, 50)}...`);
    };


    unsubscribe() {
        this.subscriptions.forEach(unsub => unsub());
        this.subscriptions = [];
        console.log(`[Email] ${this.email} отписался от всех рассылок`);
    };


    getStats() {
        return {
            type: 'Email',
            email: this.email,
            sentCount: this.sentCount,
            activateSubscriptions: this.subscriptions.length,
            lastarticles: this.receivedarticles.slice(-3),
        };
    };
};