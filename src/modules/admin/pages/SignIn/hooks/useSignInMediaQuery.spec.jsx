import useSignInMediaQuery from './useSignInMediaQuery';
import { useMediaQuery } from 'react-responsive';

jest.mock('react-responsive', () => ({
    useMediaQuery: jest.fn(),
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