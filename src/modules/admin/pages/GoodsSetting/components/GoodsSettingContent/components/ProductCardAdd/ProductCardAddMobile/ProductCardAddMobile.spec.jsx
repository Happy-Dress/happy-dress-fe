import { waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import ProductCardAddMobile from './ProductCardAddMobile';

describe('ProductCardAddMobile', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(<ProductCardAddMobile onClick={() => {}}/>);

            expect(container.getElementsByClassName('AddProductCardMobile')[0]).toBeInTheDocument();
        });
    });
});