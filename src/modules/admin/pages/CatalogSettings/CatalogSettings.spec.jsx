import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import CatalogSetting from './index';
import { ModalProvider } from 'react-modal-hook';
import userEvent from '@testing-library/user-event';

jest.mock('./components/SettingDropDown', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="setting-drop-down"/>;
    }
}));

jest.mock('../../../../common/api/catalogSettings/retrieveCatalogSettings',()=>({
    __esModule: true,
    default: () => Promise.resolve({ models: [] })
}));


describe('CatalogSettings', () => {
    it('should render correctly', async () => {
        await waitFor(() =>{
            render(
                <ModalProvider>
                    <CatalogSetting />
                </ModalProvider>
            );
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

    it('should render modal', async () => {
        await waitFor(() =>{
            render(
                <ModalProvider>
                    <CatalogSetting />
                </ModalProvider>
            );
        });

        expect(screen.getByText('Отмена').classList.length).toBe(1);

        await act(() => {
            userEvent.click(screen.getByText('Отмена'));
        });

        expect(screen.getByText('Отмена').classList.length).toBe(2);
    });
});
