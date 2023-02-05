import { render, screen, waitFor } from '@testing-library/react';
import ModelSettings from './index';
import userEvent from '@testing-library/user-event';

const mockUpdateModels = jest.fn();

const mockModel = {
    id: 1,
    name: 'Прямое',
    orderNumber: 0
};

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

jest.mock('../../contexts/CatalogSettingsContext/hook/useCatalogSettings', () => ({
    useCatalogSettings: () =>({
        settings: {
            models: []
        },
        updateModels: mockUpdateModels
    })
}));


describe('ModelSettings', () =>{
    it('should render correctly', () =>{
        const { baseElement } = render(<ModelSettings/>);
        expect(baseElement).toBeInTheDocument();
    });

    it('should handle reorder', async () =>{
        render(<ModelSettings/>);
        const button = screen.getByRole('button', {
            name: /Reorder/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(mockUpdateModels).toHaveBeenCalled();
    });

    it('should start edit and cancel', async () =>{
        render(<ModelSettings/>);
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

    it('should handle add', async () =>{
        render(<ModelSettings/>);
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

    it('should handle select models and delete them', async () =>{
        render(<ModelSettings/>);
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
        render(<ModelSettings/>);
        const button = screen.getByRole('button', {
            name: 'Remove'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(mockUpdateModels).toHaveBeenCalled();
    });

    it('should handle unselect', async () =>{
        render(<ModelSettings/>);
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
        render(<ModelSettings/>);
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
        render(<ModelSettings/>);
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
        expect(mockUpdateModels).not.toHaveBeenCalled();
    });

});
