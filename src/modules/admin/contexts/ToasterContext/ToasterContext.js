import { createContext } from 'react';

const initialToasterContext = {
    // eslint-disable-next-line no-unused-vars
    showToasterError: (message) => {},
    // eslint-disable-next-line no-unused-vars
    showToasterNotification: (message) => {},
    // eslint-disable-next-line no-unused-vars
    showToasterSuccess: (message) => {},
};

export const ToasterContext = createContext(initialToasterContext);