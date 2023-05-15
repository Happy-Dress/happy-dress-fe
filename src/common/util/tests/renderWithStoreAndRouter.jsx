import { setupStore } from '../../ui/store/setupStore';
import { render } from '@testing-library/react';

import { Provider, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductSettings from '../../../modules/admin/pages/ProductSettings';


const TestComponent = ({ children, storeActions }) =>{
    const dispatch = useDispatch();

    useEffect(() =>{
        (storeActions || []).forEach(action => dispatch(action()));
    }, []);

    return children;
};

const renderWithStoreAndRoutes = (component, preloadedStore) => {
    mockAllIsIntersecting(false);
    return render(<Provider store={setupStore(preloadedStore)}>
        <MemoryRouter>
            <Routes>
                <Route path="/" element={
                    <TestComponent>
                        {component}
                    </TestComponent>
                } />
            </Routes>
        </MemoryRouter>);
    </Provider>);

};

export default renderWithStoreAndRoutes;
