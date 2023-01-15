import React from 'react';
import { render, screen } from '@testing-library/react';
import CatalogSetting from './index';

jest.mock('./components/SettingDropDown', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="setting-drop-down"/>;
    }
}));
describe('CatalogSetting', () => {
    it('should render correctly', async () => {
        render(<CatalogSetting />);
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
