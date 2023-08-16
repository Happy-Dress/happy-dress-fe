import { render } from '@testing-library/react';
import AvailabilitySizeTab from './index';

const mockProps = {
    handleChangeSize: jest.fn(),
    isAvailable: true,
    idx: '1',
};

let baseElem;

describe('AvailabilitySizeTab', () => {
    beforeEach(() => {
        baseElem = render(<AvailabilitySizeTab 
            handleChangeSize={mockProps.handleChangeSize}
            isAvailable={mockProps.isAvailable}
            idx={mockProps.idx}
        />).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });
});