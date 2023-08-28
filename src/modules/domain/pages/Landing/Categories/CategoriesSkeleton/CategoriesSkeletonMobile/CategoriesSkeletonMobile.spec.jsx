import { render } from '@testing-library/react';
import CategoriesSkeletonMobile from './index';

describe('CategoriesSkeletonMobile', () => {
    it('should render', () => {
        const { baseElement } = render(<CategoriesSkeletonMobile/>);
        expect(baseElement).toBeInTheDocument();
    });
});