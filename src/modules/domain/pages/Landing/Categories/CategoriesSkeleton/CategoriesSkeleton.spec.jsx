import { render } from '@testing-library/react';
import CategoriesSkeleton from './index';

describe('CategoriesSkeleton', () => {
    it('should render', () => {
        const { baseElement } = render(<CategoriesSkeleton/>);
        expect(baseElement).toBeInTheDocument();
    });
});