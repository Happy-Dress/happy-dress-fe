import { useMediaQuery } from 'react-responsive';
import { renderHook } from '@testing-library/react-hooks';




describe('useSignInMediaQuery', () => {
    it('should return desktop', async () => {
        let mockReturnValue = renderHook(() => useMediaQuery());
        let isMobileWidth = useMediaQuery();
        mockReturnValue = false;
        let isMobileHeight = useMediaQuery();
    });
});