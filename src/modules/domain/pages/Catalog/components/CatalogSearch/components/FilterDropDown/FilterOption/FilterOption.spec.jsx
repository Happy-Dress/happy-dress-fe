import React from 'react';
import FilterOption from './FilterOption';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('FilterOption', () => {
    
    it('should render correctly', () => {
        const mockItem = {
            id: 1
        };
        const { baseElement } = render(<FilterOption
            isChecked={true}
            onUnselect={jest.fn()}
            onSelect={jest.fn()}
            renderOption={() => <span>Option</span>}
            item={mockItem}
        />);
        expect(baseElement).toBeInTheDocument();
    });

    it('should handle unselect', () => {
        const mockItem = {
            id: 1
        };
        const mockOnUnselect = jest.fn();
        render(<FilterOption
            isChecked={true}
            onUnselect={mockOnUnselect}
            onSelect={jest.fn()}
            renderOption={() => <span>Option</span>}
            item={mockItem}
        />);
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);
        expect(mockOnUnselect).toHaveBeenCalled();

    });
});
