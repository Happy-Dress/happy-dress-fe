/* eslint-disable react/prop-types */
import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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

vi.mock('react-router-dom', () => ({
    Link: ({ children }) => <div>{children}</div>,
}));

vi.mock('../../../../../../../../common/ui/contexts/DeviceType', () => ({
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
        dispatch = vi.fn();
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

    });
});
