import { vi } from 'vitest';
import { act, render } from '@testing-library/react';
import { ColorAddProvider } from '../../contexts/ColorAddContext';
import ColorContent from './ColorContent';
import styles from './ColorContent.module.scss';
import userEvent from '@testing-library/user-event';

const dispatch = vi.fn();
const state = {
    name: '',
    firstColor: '#fff',
    secondColor: null
};
const handleSave = vi.fn();

const renderWithProvider = () => {
    return render(
        <ColorAddProvider value={{ state, dispatch, handleSave }}>
            <ColorContent />
        </ColorAddProvider>
    );
};

describe('ColorContent', () => {
    it('should render', () => {
        const { container } = renderWithProvider();

        expect(container.getElementsByClassName(styles.ColorContent)[0]).toBeInTheDocument();
        expect(container.getElementsByClassName(styles.fewColors)[0]).toBeInTheDocument();
    });

    it('should change name', async () => {
        const { container } = renderWithProvider();
        const TYPE_CHECK = 'Название';
        expect(container.getElementsByClassName(styles.colorName)[0].value).toBe('');

        await act(() => {
            userEvent.type(container.getElementsByClassName(styles.colorName)[0], TYPE_CHECK);
        });

        expect(container.getElementsByClassName(styles.colorName)[0].value).toBe(TYPE_CHECK);

    });
});
