import { useContext } from 'react';
import { ColorAddContext } from '../ColorAddContext';

export const useColorAddContext = () => {
    const data = useContext(ColorAddContext);

    if(!data) {
        throw new Error('Can not use useColorAddContext outside ColorAddProvider');
    }

    return data;
};
