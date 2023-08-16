import { render } from '@testing-library/react';
import ImageSkeleton from './index';

describe('ImageSkeleton', () => {
    it('should render', () => {
        const elem = render(<ImageSkeleton />).baseElement;
        expect(elem).toBeInTheDocument();
    });
});