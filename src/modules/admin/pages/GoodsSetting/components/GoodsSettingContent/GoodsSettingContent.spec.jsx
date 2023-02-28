import GoodsSettingContent from './GoodsSettingContent';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';

const response = [
    {
        id: 1,
        name: 'S000012345',
        colors: [
            '#fff',
            '#000',
            '#a65f30'
        ],
        sizes: [1, 2, 3, 4],
        category: 'Свадебные'
    },
    {
        id: 2,
        name: 'S000012346',
        colors: [
            '#fff',
            '#000',
            '#a65f30'
        ],
        sizes: [1, 2, 3, 4],
        category: 'Деловой стиль'
    },
];

describe('GoodsSettingContent', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(<GoodsSettingContent catalogueItems={response} isLoading={false}/>);

            expect(container.getElementsByClassName('GoodsSettingContent')[0]).toBeInTheDocument();
        });
    });
    it('should render loader', async () => {

        render(<GoodsSettingContent catalogueItems={response} isLoading={true}/>);
        expect(screen.getByText('Loader')).toBeInTheDocument();
    });
});