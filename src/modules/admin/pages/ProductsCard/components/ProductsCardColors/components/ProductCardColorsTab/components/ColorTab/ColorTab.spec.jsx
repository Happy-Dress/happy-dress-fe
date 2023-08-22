import { render } from '@testing-library/react';
import ColorTab from './index';

const mockColor = {
    id: 1,
    firstColor: '#FF0000',
    name: 'красно-белый',
    secondColor: '#FFFFFF',
    orderNumber: 1,
};

const mockProps = {
    currentColor: mockColor,
    optionsColors: [mockColor],
    handleChangeColor: jest.fn(),
    idx: '1',
};

let baseElem;

describe('ColorTab', () => {
    beforeEach(() => {
        baseElem = render(<ColorTab
            handleChangeColor={mockProps.handleChangeColor}
            optionsColors={mockProps.optionsColors}
            currentColor={mockProps.currentColor}
            idx={mockProps.idx}
        />).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });
});