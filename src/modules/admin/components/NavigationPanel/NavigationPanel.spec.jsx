
import { screen, render, waitFor } from '@testing-library/react';
import NavigationPanel from './NavigationPanel';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';


jest.mock('./NavigationPanelDesktop/NavigationPanelDesktop', () => ({
    __esModule: true,
    default: () => <div>Navigation Panel Desktop</div>
}));

jest.mock('./NavigationPanelMobile/NavigationPanelMobile', () => ({
    __esModule: true,
    default: () => <div>Navigation Panel Mobile</div>
}));

jest.mock('../../../../common/contexts/DeviceType', () =>({
    useDeviceTypeContext: jest.fn()
}));



describe('NavigationPanel', () => {
    it('should render desktop panel', async () => {
        useDeviceTypeContext.mockImplementation(() => ({ isDesktop: true }));
        render(<NavigationPanel/>);
        const desktopPanel = screen.getByText('Navigation Panel Desktop');
        await waitFor(() =>{
            expect(desktopPanel).toBeInTheDocument();
        });
    });

    it('should render mobile panel', async () => {
        useDeviceTypeContext.mockImplementation(() => ({ isMobile: true }));
        render(<NavigationPanel/>);
        const mobilePanel = screen.getByText('Navigation Panel Mobile');
        await waitFor(() =>{
            expect(mobilePanel).toBeInTheDocument();
        });
    });
});
