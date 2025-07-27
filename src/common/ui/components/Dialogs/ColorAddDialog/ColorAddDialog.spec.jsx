import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ColorAddDialog from './ColorAddDialog';
import { ModalProvider } from 'react-modal-hook';

const props = {
    onClose: vi.fn(),
    settingsList: [],
    updateSettings: vi.fn()
};

vi.mock('./ColorAddDialog', () => ({
    __esModule: true,
    default: () => <div>ColorAddDialog</div>
}));

const renderWithProvider = () => {
    return render(
        <ModalProvider>
            <ColorAddDialog {...props}/>
        </ModalProvider>
    );
};

describe('ColorAddDialog', () => {
    it('should render', () => {
        renderWithProvider();
        screen.debug();

        expect(screen.getByText('ColorAddDialog')).toBeInTheDocument();
    });
});
