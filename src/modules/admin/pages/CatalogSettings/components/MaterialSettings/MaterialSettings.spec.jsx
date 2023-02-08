import { render, screen, waitFor } from '@testing-library/react';
import MaterialSettings from './index';
import userEvent from '@testing-library/user-event';

const mockUpdateMaterials = jest.fn();

const mockMaterial = {
    id: 1,
    name: 'Атлас',
    orderNumber: 0
};

jest.mock('../SettingsList', () => ({
    __esModule: true,
    default: ({ onEdit, onSelect, onUnSelect, handleReorder, onRemove }) => {
        return (
            <>
                <button onClick={() => onEdit(mockMaterial)}>Edit</button>
                <button onClick={() => onSelect(mockMaterial)}>Select</button>
                <button onClick={() => onUnSelect(mockMaterial)}>Unselect</button>
                <button onClick={handleReorder}>Reorder</button>
                <button onClick={() => onRemove(mockMaterial)}>Remove</button>
            </>
        );
    }
}));

jest.mock(
    '../../contexts/CatalogSettingsContext/hook/useCatalogSettings',
    () => ({
        useCatalogSettings: () => ({
            settings: {
                materials: [],
            },
            updateMaterials: mockUpdateMaterials,
        }),
    })
);


describe('MaterialSettings', () =>{
    it('should render correctly', () =>{
        const { baseElement } = render(<MaterialSettings/>);
        expect(baseElement).toBeInTheDocument();
    });

    it('should handle reorder', async () =>{
        render(<MaterialSettings/>);
        const button = screen.getByRole('button', {
            name: /Reorder/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(mockUpdateMaterials).toHaveBeenCalled();
    });

    it('should start edit and cancel', async () =>{
        render(<MaterialSettings />);
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



    it('should start edit and save', async () =>{
        render(<MaterialSettings />);
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
        expect(mockUpdateMaterials).toHaveBeenCalled();
    });

    it('should handle add', async () =>{
        render(<MaterialSettings />);
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

    it('should handle select materials and delete them', async () =>{
        render(<MaterialSettings />);
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
        render(<MaterialSettings />);
        const button = screen.getByRole('button', {
            name: 'Remove'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        expect(mockUpdateMaterials).toHaveBeenCalled();
    });

    it('should handle unselect', async () =>{
        render(<MaterialSettings />);
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
        render(<MaterialSettings />);
        const button = screen.getByRole('button', {
            name: /Edit/i
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const input = screen.getByDisplayValue('Атлас');
        await waitFor((() =>{
            userEvent.paste(input, 'Фатин');
        }));
        const cancelButton = screen.getByRole('button', {
            name: /Отмена/i
        });
        expect(cancelButton).toBeInTheDocument();
    });

    it('should prevent remove', async () =>{
        render(<MaterialSettings />);
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
        expect(mockUpdateMaterials).not.toHaveBeenCalled();
    });

    it('should add material and save', async () =>{
        render(<MaterialSettings />);
        const button = screen.getByRole('button', {
            name: '+Добавить'
        });
        await waitFor(() =>{
            userEvent.click(button);
        });
        const input = screen.getByRole('textbox');
        await waitFor(() =>{
            userEvent.paste(input, 'Кружево');
        });
        const saveButton = screen.getByRole('button', {
            name: /Сохранить/i
        });
        await waitFor(() =>{
            userEvent.click(saveButton);
        });
        expect(mockUpdateMaterials).toHaveBeenCalled();

    });

});
