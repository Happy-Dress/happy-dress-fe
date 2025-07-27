import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CategoryDialog from './CategoryDialog';
import styles from './CategoryDialog.module.scss';
import { ModalProvider } from 'react-modal-hook';
import { DeviceTypeProvider } from '../../../contexts/DeviceType';
import { isItemExist } from './CategoryDialog.validation';

const mockEditModel = {
    id: 54,
    name: 'Свадебные',
    orderNumber: 1,
    description: 'Свадебные платья',
    imageUrl: 'http://drive.google.com/uc?export=view&id=1BXGRhww3jGylXm9x2_Jf9r9jlszRxwMw',
};

const mockSettingList = [
    {
        description: 'Свадебные платья',
        id: 54,
        imageUrl: 'http://drive.google.com/uc?export=view&id=1BXGRhww3jGylXm9x2_Jf9r9jlszRxwMw',
        name: 'Свадебные',
        orderNumber: 1,
    },
    {
        description: 'Вечерние платья',
        id: 55,
        imageUrl: 'http://drive.google.com/uc?export=view&id=1BXGRhww3jGylXm9x2_Jf9r9jlszRxwMw',
        name: 'Вечерние',
        orderNumber: 2,
    }
];

const addModelProps = {
    onClose: vi.fn(),
    updateSettings: vi.fn(),
    settingsList: [],
    setEditingModel: vi.fn(),
};

const editModelProps = {
    onClose: vi.fn(),
    updateSettings: vi.fn(),
    settingsList: [],
    setEditingModel: vi.fn(),
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

    it('should save button be disabled', async () => {
        renderWithProvider(addModelProps);

        const okButton = screen.getByText('Сохранить');
        expect(okButton).toBeDisabled();

        const nameInput = screen.getByPlaceholderText('Название');
        const descriptionInput = screen.getByPlaceholderText('Описание');

        fireEvent.change(nameInput, { target: { value: 'ex' } });
        fireEvent.change(descriptionInput, { target: { value: 'ex' } });
        expect(okButton).toBeDisabled();
    });

    it('should isItemExist return correct boolean values', async () => {
        expect(isItemExist('aaa', mockEditModel, [])).toBe(false);
        expect(isItemExist('Свадебные', undefined, mockSettingList)).toBe(true);
        expect(isItemExist('Свадебные', mockEditModel, mockSettingList)).toBe(false);
        expect(isItemExist('Вечерние', mockEditModel, mockSettingList)).toBe(true);
    });

    it('should not render ProgressBar', () => {
        renderWithProvider(addModelProps);
        expect(screen.getByTestId('progressBar')).toHaveClass(styles.visible);
        expect(screen.getByTestId('progressBar')).toBeInTheDocument();
    });

    it('should render ProgressBar', () => {
        renderWithProvider(addModelProps);
        const fileContents = 'file contents';
        const file = new Blob([fileContents], { type: 'text/plain' });
        const loadImageButton = screen.getByLabelText('Загрузить фото');

        expect(screen.getByTestId('progressBar')).toHaveClass(styles.visible);
        expect(screen.getByTestId('progressBar')).toBeInTheDocument();
        fireEvent.change(loadImageButton, { target: { files: [file] } });
        expect(screen.getByTestId('progressBar')).not.toHaveClass(styles.visible);
    });

    it('should handle onClose when add category', () => {
        renderWithProvider(addModelProps);
        const { onClose } = addModelProps;
        const cancelButton = screen.getByText('Отмена');

        expect(cancelButton).toBeInTheDocument();
        fireEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalled();
    });

    it('should handle onClose when edit category', () => {
        renderWithProvider(editModelProps);
        const { onClose } = editModelProps;
        const cancelButton = screen.getByText('Отмена');

        expect(cancelButton).toBeInTheDocument();
        fireEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalled();
    });
});
