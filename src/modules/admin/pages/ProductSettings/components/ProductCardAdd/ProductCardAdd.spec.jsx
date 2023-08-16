import { render, screen } from '@testing-library/react';
import ProductCardAdd from './index';
import userEvent from '@testing-library/user-event';

let baseElem;

describe('ProductCardAdd', () => {
    beforeEach(() => {
        baseElem = render(<ProductCardAdd/>).baseElement;
    });
    
    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });
    
    it('should have id on hover', () => {
        userEvent.hover(baseElem.firstElementChild.firstElementChild);
        expect(screen.getByTestId('hover')).toBeInTheDocument();
    });
});