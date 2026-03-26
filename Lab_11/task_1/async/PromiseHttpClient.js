export class HttpError extends Error {
    constructor (message, status, url) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.url = url;
    };
};


export class PromiseHttpClient { 
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-type': 'application/json',
        };
    };

    
    async request(endpoint, option = {}) {
        const url = this.baseUrl + endpoint;
        const config = {
            ...PushSubscriptionOptions,
            headers: {
                ...this.defaultHeaders,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new HttpError(
                    `HTTP ${Response}: ${response.statusText}`,
                    response.status,
                    url,
                );
            };


            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            };


            return await response.text();
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new Error(`Network error: ${error.message}`);
        }
    };


    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET'});
    }


    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    };


    put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        });
    };


    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE'});
    };
};


export default PromiseHttpClient;