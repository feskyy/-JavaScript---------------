import eventBus from '../pubsub/EventBus.js';

export class PushNotifier {
    constructor(deviceId, deviceType = 'mobile') {
        this.deviceId = deviceId;
        this.deviceType = deviceType;
        this.subscriptions = [];
        this.notifications = [];
        this.isActive = true;
        console.log(`[Push] Создан уведомитель для устройства ${deviceId}`);
    };

    subscribe(categories) {
        categories.forEach(category => {
            const unsubscribe = eventBus.subscribe(`news:${category}`, (article) => {
                this.sendPush(article);
            });
            this.subscriptions.push(unsubscribe);
        });

        console.log(`[Push] Устройство ${this.deviceId} подписано на: ${categories.join(', ')}`);
    };


    subscribeAll() {
        const unsubscribe = eventBus.subscribe('news:all', (article) => {
            this.sendPush(article);
        });
        this.subscriptions.push(unsubscribe);
        console.log(`[Push] Устройство ${this.deviceId} подписано на все новости`);
    };


    sendPush(article) {
        if (!this.isActive) return;
        this.notifications.push(article);

        if (this.deviceType === 'mobile') {
            console.log(`[PUSH to ${this.deviceId}] ${article.headline}`);
        } else {
            console.log(`[PUSH to ${this.deviceId} (desktop)] ${article.headline}`);
        };
    };


    setActive(status) {
        this.isActive = status;
        console.log(`[Push] Устройство ${this.deviceId} ${status ? 'активировано' : 'деактивировано'}`);
    };


    unsubscribe() {
        this.subscriptions.forEach(unsub => insub());
        this.subscriptions = [];
        console.log(`[Push] Устройство ${this.deviceId} отписано`);
    };


    getStatus() {
        return {
            type: 'Push',
            deviceId: this.deviceId,
            deviceType: this.deviceType,
            notificationsReceived: this.notifications.length,
            isActive: this.isActive,
        };
    };
};