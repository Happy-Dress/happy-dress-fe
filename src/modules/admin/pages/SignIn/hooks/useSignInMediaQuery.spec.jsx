import { vi } from 'vitest';
import useSignInMediaQuery from './useSignInMediaQuery';
import { useMediaQuery } from 'react-responsive';

vi.mock('react-responsive', () => ({
    useMediaQuery: vi.fn(),
}));

describe('useSignInMediaQuery', () => {
    it('should return desktop', () => {
        useMediaQuery.mockImplementation(() => true);
        const isDesktopWidth = true;
        const isMobileWidth = true;
        const isMobileHeight = true;
        const actualResult = useSignInMediaQuery();
        expect({ isDesktopWidth, isMobileWidth, isMobileHeight }).toEqual(actualResult);
    });
});