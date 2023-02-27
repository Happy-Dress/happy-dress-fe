import { store } from '../ui/store/store';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react';

const renderWithStore = (component) => {
    return render(<Provider store={store}>
        {component}
    </Provider>);

};

export default renderWithStore;
