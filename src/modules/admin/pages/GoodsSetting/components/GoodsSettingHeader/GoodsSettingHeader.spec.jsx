import React from 'react';
import { screen, render } from '@testing-library/react';
import GoodsSettingHeader from './GoodsSettingHeader';
import { mockCatalogueSettingsResponse } from '../../../../../../__mocks__/mockCatalogueSettingsResponse';

jest.mock('../../../../../../common/ui/hocs/adaptive', () => ({
    __esModule: true,
    default: () => () => <div>Goods Setting Header</div>
}));

describe('GoodsSettingHeader', () => {
    it('should render goods setting header component', async () => {

        render(<GoodsSettingHeader filters={mockCatalogueSettingsResponse} isLoading={false}/>);

        const desktopPanel = await screen.getByText('Goods Setting Header');
        expect(desktopPanel).toBeInTheDocument();
    });
    it('should render loader', async () => {

        render(<GoodsSettingHeader filters={mockCatalogueSettingsResponse} isLoading={true}/>);
        expect(screen.getByText('Loader')).toBeInTheDocument();
    });
});
