import { render } from '@testing-library/react';
import Loader from './index';

describe('Loader', () => {
    it('should render', () => {
        const baseElem = render(<Loader/>).baseElement;
        expect(baseElem).toBeInTheDocument();
    });
});