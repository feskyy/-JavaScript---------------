export class EventBus {
    constructor() {
        this.events = new Map();
        this.onceEvents = new Map();
    };


    subscribe(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        };

        const subscribers = this.events.get(event);
        subscribers.push(callback);

        return () => {
            const index = subscribers.indexOf(callback);
            if (index > -1) {
                subscribers.splice(index, 1);
            };
        };
    };


    once(event, callback) {
        if (!this.onceEvents.has(event)) {
            this.onceEvents.set(event, []);
        };

        const onceSubscribers = this.onceEvents.get(event);
        onceSubscribers.push(callback);

        return () => {
            const index = onceSubscribers.indexOf(callback);
            if (index > -1) {
                onceSubscribers.splite(index, 1);
            };
        };
    };


    publish(event, data) {
        if (this.events.has(event)) {
            const subscribers = this.events.get(event);
            subscribers.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Ошибка при обработке события ${event}:`, error);
                };
            });
        };

        if (this.onceEvents.has(event)) {
            const onceSubscribers = this.onceEvents.get(event);
            onceSubscribers.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Ошибка при обработке однократного события ${event}:`, error);
                };
            });

            this.onceEvents.delete(event);
        };
    };


    clear() {
        this.events.clear();
        this.onceEvents.clear();
    };


    subscriberCount(event) {
        let count = 0;
        if (this.events.has(event)) {
            count += this.events.get(event).length;
        };

        if (this.onceEvents.has(event)) {
            count += this.onceEvents.get(event).length;
        };

        return count;
    };
};


const eventBus = new EventBus();
export default eventBus;