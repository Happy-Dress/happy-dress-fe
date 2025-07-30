import { setupStore } from '../../ui/store/setupStore';
import { render, renderHook } from '@testing-library/react';

import { Provider, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';


const TestComponent = ({ children, storeActions }) =>{
    const dispatch = useDispatch();

    useEffect(() =>{
        (storeActions || []).forEach(action => dispatch(action()));
    }, []);

    return children;
};

const renderWithStore = (component, preloadedStore) => {
    mockAllIsIntersecting(false);
    return render(<Provider store={setupStore(preloadedStore)}>
        <TestComponent>
            {component}
        </TestComponent>
    </Provider>);

};

export const renderHookWithStore = (hookCallBack, store) => {
    const wrapper = ({ children }) => <Provider store={setupStore(store)}>{children}</Provider>;
    return renderHook(hookCallBack,{
        wrapper,
    });
};

export default renderWithStore;
