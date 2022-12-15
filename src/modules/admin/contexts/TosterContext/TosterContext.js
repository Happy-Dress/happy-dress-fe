import { createContext } from 'react';

const initialTosterContext = {
    // eslint-disable-next-line no-unused-vars
    showToster: (type, message) => {},
};

export const TosterContext = createContext(initialTosterContext);