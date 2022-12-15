import { useContext } from 'react';
import { TosterContext } from '../TosterContext';

export const useToster = () => useContext(TosterContext);