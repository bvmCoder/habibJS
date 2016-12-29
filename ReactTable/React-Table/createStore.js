export default function createStore(initialState) {
    let state = initialState;
    const listeners = [];

    const setState = (partial) => {
        state = Object.assign({}, state, partial);
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    };

    const getState = () => {
        return state;
    };

    const subscribe = (listener) => {
        listeners.push(listener);

        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    };

    return {
        setState,
        getState,
        subscribe
    };
}
