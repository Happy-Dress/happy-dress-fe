import { setupStore } from '../../ui/store/setupStore';
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

const renderWithStore = (component, preloadedStore) => {
    return render(<Provider store={setupStore(preloadedStore)}>
        <TestComponent>
            {component}
        </TestComponent>
    </Provider>);

};

export default renderWithStore;
