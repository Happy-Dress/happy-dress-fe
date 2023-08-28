import { render } from '@testing-library/react';
import CategoriesSkeletonDesktop from './index';

describe('CategoriesSkeletonDesktop', () => {
    it('should render', () => {
        const { baseElement } = render(<CategoriesSkeletonDesktop/>);
        expect(baseElement).toBeInTheDocument();
    });
});