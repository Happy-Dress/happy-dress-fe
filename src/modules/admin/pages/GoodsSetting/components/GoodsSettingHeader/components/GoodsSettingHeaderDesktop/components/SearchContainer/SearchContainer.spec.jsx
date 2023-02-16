import { render, screen } from '@testing-library/react';
import SearchContainer from './SearchContainer';
import { BrowserRouter } from 'react-router-dom';

describe('SearchContainer', () => {
    it('should render correct', () => {
        render(<SearchContainer setIsOpen={jest.fn()} isOpen={true}/>, { wrapper: BrowserRouter });

        expect(screen.getByText('x.svg')).toBeInTheDocument();
    });
    it('should render correct closed', () => {
        render(<SearchContainer setIsOpen={jest.fn()} isOpen={false}/>, { wrapper: BrowserRouter });

        expect(screen.getByText('filter.svg')).toBeInTheDocument();
    });
});
