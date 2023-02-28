import { act, render } from '@testing-library/react';
import { ColorAddProvider } from '../../contexts/ColorAddContext';
import ColorContent from './ColorContent';
import userEvent from '@testing-library/user-event';

const dispatch = jest.fn();
const state = {
    name: '',
    firstColor: '#fff',
    secondColor: null
};
const handleSave = jest.fn();

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

        expect(container.getElementsByClassName('ColorContent')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('fewColors')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ColorPicker')[0]).toBeInTheDocument();
    });

    it('should change name', async () => {
        const { container } = renderWithProvider();
        const TYPE_CHECK = 'Название';
        expect(container.getElementsByClassName('colorName')[0].value).toBe('');

        await act(() => {
            userEvent.type(container.getElementsByClassName('colorName')[0], TYPE_CHECK);
        });

        expect(container.getElementsByClassName('colorName')[0].value).toBe(TYPE_CHECK);

    });
});
