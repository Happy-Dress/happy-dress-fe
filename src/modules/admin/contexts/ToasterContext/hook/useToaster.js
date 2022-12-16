import { useContext } from 'react';
import { ToasterContext } from '../ToasterContext';

export const useToaster = () => useContext(ToasterContext);