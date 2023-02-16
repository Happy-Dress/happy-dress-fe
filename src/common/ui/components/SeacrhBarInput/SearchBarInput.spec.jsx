import { act, render, screen } from '@testing-library/react';
import SearchBarInput from './SearchBarInput';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('SearchBarInput', () => {
    it('should render correctly', function () {
        const { container } = render(<SearchBarInput />, { wrapper: BrowserRouter });

        expect(container.getElementsByClassName('SearchBarInput').length).toBe(1);
    });

    it('should change text', async function () {
        const { container } = render(<SearchBarInput />, { wrapper: BrowserRouter });

        expect(screen.getByDisplayValue('')).toBeInTheDocument();

        await act(() => {
            userEvent.type(container.getElementsByTagName('input')[0], 'abcdg');
        });

        expect(screen.getByDisplayValue('abcdg')).toBeInTheDocument();
    });
});
