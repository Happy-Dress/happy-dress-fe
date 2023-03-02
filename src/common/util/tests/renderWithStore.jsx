import { store } from '../../ui/store/store';
import { render } from '@testing-library/react';

import { Provider, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';


const TestComponent = ({ children, storeActions }) =>{
    const dispatch = useDispatch();

    useEffect(() =>{
        (storeActions || []).forEach(action => dispatch(action()));
    }, []);
    
    return children;
};

const renderWithStore = (component, storeActions) => {
    return render(<Provider store={store}>
        <TestComponent storeActions={storeActions}>
            {component}
        </TestComponent>
    </Provider>);

};

export default renderWithStore;
