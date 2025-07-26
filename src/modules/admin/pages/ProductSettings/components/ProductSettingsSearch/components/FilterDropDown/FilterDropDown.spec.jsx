import { vi } from 'vitest';
import FilterDropDown from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let baseElem;

const mockProps = {
    onUnSelect: vi.fn(),
    onSelect: vi.fn(),
    renderOption: vi.fn(),
    name: 'test',
    options: [{
        id: 1,
        name :'mockOption',
    }],
    selectedOptionIds: [1],
};

describe('ProductCard', () => {
    beforeEach(() => {
        baseElem = render(<FilterDropDown 
            onUnSelect={mockProps.onUnSelect} 
            renderOption={mockProps.renderOption} 
            name={mockProps.name} 
            options={mockProps.options} 
            selectedOptionIds={mockProps.selectedOptionIds} 
            onSelect={mockProps.onSelect}
        />).baseElement; 
    });
    
    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });

    it('should open filter', () => {
        const currFilter = screen.getByTestId('current-filter');
        userEvent.click(currFilter);
        const options = screen.getByTestId('options');
        expect(options).toHaveStyle(`height: calc(60px * ${mockProps.options.length})`);
    });
});
