import { useMediaQuery } from 'react-responsive';
import useGoodsMediaQuery from './useGoodsMediaQuery';

jest.mock('react-responsive', ()  => ({
    useMediaQuery: jest.fn(),
}));

describe('useSignInMediaQuery', () => {
    it('should return desktop',  () => {
        useMediaQuery.mockImplementation(() => true);
        const isDesktopWidth = true;
        const isMobileWidth = true;
        const isMobileHeight = true;
        const actualResult = useGoodsMediaQuery();
        expect({ isDesktopWidth, isMobileWidth, isMobileHeight }).toEqual(actualResult);
    });
});