import eventBus from "../pubsub/EventBus";

export class NewsPublisher {
    constructor(name) {
        this.name = name;
        this.articles = [];
        console.log(`[${this.name}] Издатель создан`)
    };

    publishArticle(category, headline, content, priority = 'normal') {
        const article = {
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            category,
            headline,
            content,
            priority,
            timestamp: new Date(),
            source: this.name
        };

        this.articles.push(article);

        eventBus.publish(`news: ${category}`, article);

        eventBus.publish(`news:all`, article);

        if (priority === 'urgent') {
            eventBus.publish('news:urgent', article);
        };

        console.log(`[${this.name}] Опубликовано: ${headline} [${category}] (${priority})`);

        return article;
    };


    getArticles(category = null) {
        if (category) {
            return this.articles.filter(a => a.category === category);
        };

        return [...this.articles];
    };


    getStats() {
        const byCategory = {};
        this.articles.forEach(article => {
            byCategory[article.catrgory] = (byCategory[article.category] || 0) + 1;
        });

        return {
            total: this.articles.length,
            byCategory,
            lastArticle: this.articles[this.articles.length - 1]
        };
    };
};