/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ProductCard from './ProductCard';

const mockStore = configureMockStore();

const mockProduct = {
    id: 1,
    name: 'Test Product',
    productColorSizes: [
        {
            size: { sizeValue: 'S' },
            color: { id: 1, firstColor: '#ffffff' },
        },
        {
            size: { sizeValue: 'M' },
            color: { id: 2, firstColor: '#000000' },
        },
    ],
};

jest.mock('react-router-dom', () => ({
    Link: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../../../../../../../common/ui/contexts/DeviceType', () => ({
    useDeviceTypeContext: () => ({ isMobile: true }),
}));

describe('ProductCard', () => {
    let store;
    let dispatch;

    beforeEach(() => {
        store = mockStore({
            productsSearch: {
                selectedProducts: [],
            },
        });
        dispatch = jest.fn();
        store.dispatch = dispatch;
    });

    it('renders product card with title and options', () => {
        render(
            <Provider store={store}>
                <ProductCard product={mockProduct} />
            </Provider>
        );

        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText('S')).toBeInTheDocument();
        expect(screen.getByText('M')).toBeInTheDocument();

        const colorOptions = screen.getAllByTestId('color-option');
        expect(colorOptions[0]).toHaveStyle('background-color: rgb(255, 255, 255)');
        expect(colorOptions[1]).toHaveStyle('background-color: rgb(0, 0, 0)');
    });
});
