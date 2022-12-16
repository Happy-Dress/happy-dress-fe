import { createContext } from 'react';

const initialToasterContext = {
    showToasterError: () => {},
    showToasterNotification: () => {},
    showToasterSuccess: () => {},
};

export const ToasterContext = createContext(initialToasterContext);