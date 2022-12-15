import { createContext } from 'react';

const initialPopUpContext = {
    // eslint-disable-next-line no-unused-vars
    showPopUp: (type, message) => {},
};

export const PopUpContext = createContext(initialPopUpContext);