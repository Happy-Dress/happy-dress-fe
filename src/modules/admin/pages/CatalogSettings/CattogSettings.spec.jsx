import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CatalogSetting from './index';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';

jest.mock('./components/SettingDropDown', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="setting-drop-down"/>;
    }
}));

jest.mock('../../../../common/api/catalogueSettings/retrieveCatalogueSettings',()=>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueSettingsResponse)
}));


describe('CatalogSettings', () => {
    it('should render correctly', async () => {
        await waitFor(() =>{
            render(<CatalogSetting />);
        });
        const title = screen.getByText('Управление каталогом');
        const dropDown = screen.getAllByTestId('setting-drop-down');
        const btnSave = screen.getByText('Сохранить');
        const btnCancel = screen.getByText('Отмена');
        expect(title).toBeInTheDocument();
        expect(dropDown.length).toBe(4);
        expect(btnSave).toBeInTheDocument();
        expect(btnCancel).toBeInTheDocument();
    });
});
