import { render } from '@testing-library/react';
import ProductCardSkeleton from './index';

describe('ProductCardSkeleton', () => {
    it('should render', () => {
        const baseElem = render(<ProductCardSkeleton/>).baseElement;
        expect(baseElem).toBeInTheDocument();
    });
});