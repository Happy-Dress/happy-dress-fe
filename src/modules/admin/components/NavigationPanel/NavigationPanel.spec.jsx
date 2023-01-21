
import { screen, render, waitFor } from '@testing-library/react';
import NavigationPanel from './NavigationPanel';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';


jest.mock('../../../../common/ui/hocs/adaptive', () => ({
    __esModule: true,
    default: () => () => <div>Navigation Panel</div>
}));


describe('NavigationPanel', () => {
    it('should render panel', async () => {
        render(<NavigationPanel/>);
        const panel = screen.getByText('Navigation Panel');
        await waitFor(() =>{
            expect(panel).toBeInTheDocument();
        });
    });

});
