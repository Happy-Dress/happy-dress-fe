import { useContext } from 'react';
import { PopUpContext } from '../PopUpContext';

export const usePopUp = () => useContext(PopUpContext);