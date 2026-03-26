const DEFAULT_OPTIONS = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
    retryableStatuses: [408, 429, 500, 502, 503, 504],
    retryableErrors: ['NetworkError', 'TimeoutError'],
    onRetry: null,
};


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function isRetryable(error, options) {
    if (error.status && options.retryableStatuses.includes(error.status)) {
        return true;
    }

    if (options.retryableErrors.includes(error.name)) {
        return true;
    }
    return false;
}


export async function withRetry(fn, options = {}) {
    const config = { ...DEFAULT_OPTIONS, ...options };
    let lastError;
    let delay = config.baseDelay;
    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === config.maxAttempts) {
                console.log(`[Retry] All ${config.maxAttempts} attemptsfailed`);
                throw error;
            }
        }
            if (!isRetryable(error, config)) {
                console.log(`[Retry] Non-retryable error, stopping: ${error.message}`);
            }
        