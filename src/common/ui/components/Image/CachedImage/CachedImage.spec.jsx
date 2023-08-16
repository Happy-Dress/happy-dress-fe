import { render } from '@testing-library/react';
import CachedImage from './index';

describe('CachedImage', () => {
    it('should render', () => {
        const testUrl = 'test';
        const elem = render(
            <CachedImage 
                src={testUrl} 
                alt={'test'}
            />
        ).baseElement;
        expect(elem).toBeInTheDocument();
    });
});