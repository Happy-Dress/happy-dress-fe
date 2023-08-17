import { render } from '@testing-library/react';
import LoadingSkeleton from './index';

describe('LoadingSkeleton', () => {
    it('should render', () => {
        const imageUrl = 'testUrl';
        const isLoading = true;
        const elem = render(
            <LoadingSkeleton
                imageUrl={imageUrl}
                isLoading={isLoading}
            />
        ).baseElement;
        expect(elem).toBeInTheDocument();
    });

    it('shouldn\'t render', () => {
        const imageUrl = 'testUrl';
        const isLoading = false;
        const { container } = render(
            <LoadingSkeleton
                imageUrl={imageUrl}
                isLoading={isLoading}
            />
        );
        expect(container.firstChild).toBeFalsy();
    });
});