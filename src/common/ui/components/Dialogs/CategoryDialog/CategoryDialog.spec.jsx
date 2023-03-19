import { act, render, screen } from '@testing-library/react';
import CategoryDialog from './CategoryDialog';
import { ModalProvider } from 'react-modal-hook';
import { DeviceTypeProvider } from '../../../contexts/DeviceType';
import userEvent from '@testing-library/user-event';

const mockEditModel = {
    id: 54,
    name: 'Свадебные',
    orderNumber: 1,
    description: 'Свадебные платья',
    imageUrl: 'http://drive.google.com/uc?export=view&id=1BXGRhww3jGylXm9x2_Jf9r9jlszRxwMw'
};


const addModelProps = {
    onClose: jest.fn(),
    updateSettings: jest.fn(),
    settingsList: [],
    editModel: jest.fn(),
    setEditModel: jest.fn(),
};

const editModelProps = {
    onClose: jest.fn(),
    updateSettings: jest.fn(),
    settingsList: [],
    editModel: jest.fn(),
    setEditModel: jest.fn(),
    editingModel: mockEditModel,
};

const renderWithProvider = async (props) => {
    return render(
        <DeviceTypeProvider>
            <ModalProvider>
                <CategoryDialog {...props} />
            </ModalProvider>
        </DeviceTypeProvider>
    );
};

describe('CategoryDialog', () => {
    it('should render with add header', () => {
        renderWithProvider(addModelProps);

        expect(screen.getAllByText('Добавление категории')).toHaveLength(1);
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should render with edit header', () => {
        renderWithProvider(editModelProps);

        expect(screen.getAllByText('Редактирование категории')).toHaveLength(1);
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should render load photo input', () => {
        renderWithProvider(addModelProps);

        expect(screen.getByText('Загрузить фото')).toBeInTheDocument();
    });

    it('should render edit photo input', () => {
        renderWithProvider(editModelProps);

        expect(screen.getByText('Загрузить другое фото')).toBeInTheDocument();
    });

    it('should show error border', async () => {
        renderWithProvider(addModelProps);

        const okButton = screen.getByText('Сохранить');
        const nameInput = screen.getByPlaceholderText('Название');
        const description = screen.getByPlaceholderText('Описание');

        expect(nameInput).not.toHaveClass('dialogError');
        await userEvent.click(okButton);
        await act(() => {
            screen.debug();
        });

        expect(nameInput).toHaveClass('dialogInput');
        expect(nameInput).toHaveClass('dialogError');
        expect(description).toHaveClass('dialogError');
    });
});
