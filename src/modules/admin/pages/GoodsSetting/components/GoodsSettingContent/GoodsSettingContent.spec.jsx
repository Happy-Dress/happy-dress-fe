import GoodsSettingContent from './GoodsSettingContent';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { mockCatalogueItemsResponse } from '../../../../../../__mocks__/mockCatalogueItemsResponse';

describe('GoodsSettingContent', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(<GoodsSettingContent catalogueItems={mockCatalogueItemsResponse} isLoading={false}/>);

            expect(container.getElementsByClassName('GoodsSettingContent')[0]).toBeInTheDocument();
        });
    });
    it('should render loader', async () => {

        render(<GoodsSettingContent catalogueItems={mockCatalogueItemsResponse} isLoading={true}/>);
        expect(screen.getByText('Loader')).toBeInTheDocument();
    });
});
