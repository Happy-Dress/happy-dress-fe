import { createContext } from 'react';

const initialTosterContext = {
    // eslint-disable-next-line no-unused-vars
    showTosterError: (message) => {},
    // eslint-disable-next-line no-unused-vars
    showTosterNotification: (message) => {},
    // eslint-disable-next-line no-unused-vars
    showTosterSuccess: (message) => {},
};

export const TosterContext = createContext(initialTosterContext);