import { render, screen } from '@testing-library/react';
import SearchContainer from './SearchContainer';
import { BrowserRouter } from 'react-router-dom';

describe('SearchContainer', () => {
    it('should render correct', () => {
        render(<SearchContainer />, { wrapper: BrowserRouter });

        expect(screen.getByPlaceholderText('Поиск..')).toBeInTheDocument();
    });
});
