import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SimpleSettingsControl from './index';
import userEvent from '@testing-library/user-event';
import { ModalProvider } from 'react-modal-hook';
import { ColorAddDialog } from '../../../../../../common/ui/components/Dialogs';

const mockUpdateSettings = jest.fn();

const mockModel = {
    id: 1,
    name: 'Прямое',
    orderNumber: 0
};

jest.mock('../../../../../../common/ui/components/Dialogs/ColorAddDialog/ColorAddDialog', () => ({
    __esModule: true,
    default: () => <div>Модалка</div>
}));

jest.mock('../SettingsList', () => ({
    __esModule: true,
    default: ({ onEdit, onSelect, onUnSelect, handleReorder, onRemove }) => {
        return (
            <>
                <button onClick={() => onEdit(mockModel)}>Edit</button>
                <button onClick={() => onSelect(mockModel)}>Select</button>
                <button onClick={() => onUnSelect(mockModel)}>Unselect</button>
                <button onClick={handleReorder}>Reorder</button>
                <button onClick={() => onRemove(mockModel)}>Remove</button>
            </>
        );
    }
}));

describe('SimpleSettingsControl', () =>{
    it('should render correctly', () =>{
        const { baseElement } = render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        expect(baseElement).toBeInTheDocument();
    });

    it('should handle reorder', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: /Reorder/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(mockUpdateSettings).toHaveBeenCalled();
    });

    it('should start edit and cancel', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: /Edit/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const cancelButton = screen.getByRole('button', {
            name: /Отмена/i
        });
        await waitFor(() =>{
            userEvent.click(cancelButton);
        });
        expect(cancelButton).not.toBeInTheDocument();
    });

    it('should start edit with modal', async () =>{
        render(<SimpleSettingsControl
            updateSettings={mockUpdateSettings}
            settingsList={[mockModel]}
            ModalComponent={ColorAddDialog}/>, { wrapper: ModalProvider }
        );
        expect(screen.queryByText('Модалка')).not.toBeInTheDocument();
        const button = screen.getByRole('button', {
            name: /Edit/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(screen.getByText('Модалка')).toBeInTheDocument();
    });



    it('should start edit and save', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: /Edit/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const saveButton = screen.getByRole('button', {
            name: /Сохранить/i
        });
        await waitFor(() =>{
            userEvent.click(saveButton);
        });
        expect(mockUpdateSettings).toHaveBeenCalled();
    });

    it('should handle add', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: '+Добавить'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const cancelButton = screen.getByRole('button', {
            name: /Отмена/i
        });
        expect(cancelButton).toBeInTheDocument();
    });

    it('should handle add with modal', async () =>{
        render(<SimpleSettingsControl
            updateSettings={mockUpdateSettings}
            settingsList={[mockModel]}
            ModalComponent={ColorAddDialog}/>, { wrapper: ModalProvider }
        );
        expect(screen.queryByText('Модалка')).not.toBeInTheDocument();
        const button = screen.getByRole('button', {
            name: '+Добавить'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(screen.getByText('Модалка')).toBeInTheDocument();
    });

    it('should handle select setting and delete them', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: 'Select'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const deleteButton = screen.getByRole('button', {
            name: /Удалить/i
        });
        await waitFor(() =>{
            userEvent.click(deleteButton);
        });
        expect(deleteButton).not.toBeInTheDocument();
    });
    it('should handle remove', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: 'Remove'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(mockUpdateSettings).toHaveBeenCalled();
    });

    it('should handle unselect', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: 'Select'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const unselectButton = screen.getByRole('button', {
            name: 'Unselect'
        });
        const deleteButton = screen.getByRole('button', {
            name: /Удалить/i
        });
        await waitFor(() =>{
            userEvent.click(unselectButton);
        });

        expect(deleteButton).not.toBeInTheDocument();
    });

    it('should handle input change', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: /Edit/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const input = screen.getByDisplayValue('Прямое');
        await waitFor((() =>{
            userEvent.paste(input, 'Пышное');
        }));
        const cancelButton = screen.getByRole('button', {
            name: /Отмена/i
        });
        expect(cancelButton).toBeInTheDocument();
    });

    it('should prevent remove', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: /Edit/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const removeButton = screen.getByRole('button', {
            name: 'Remove'
        });
        await waitFor(() =>{
            userEvent.click(removeButton);
        });
        expect(mockUpdateSettings).not.toHaveBeenCalled();
    });

    it('should add setting and save', async () =>{
        render(<SimpleSettingsControl updateSettings={mockUpdateSettings} settingsList={[mockModel]}/>, { wrapper: ModalProvider });
        const button = screen.getByRole('button', {
            name: '+Добавить'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const input = screen.getByRole('textbox');
        await waitFor(() =>{
            userEvent.paste(input, 'Пышное');
        });
        const saveButton = screen.getByRole('button', {
            name: /Сохранить/i
        });
        await waitFor(() =>{
            userEvent.click(saveButton);
        });
        expect(mockUpdateSettings).toHaveBeenCalled();

    });

});
