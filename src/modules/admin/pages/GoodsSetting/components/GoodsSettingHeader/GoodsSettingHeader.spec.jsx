import { render, screen } from '@testing-library/react';
import GoodsSettingHeader from './GoodsSettingHeader';
import { mockGoodsSettingContext } from '../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('GoodsSettingHeader', () => {
    it('should render correct', async() => {
        const { container } = render(<GoodsSettingHeader />);

        expect(container.getElementsByTagName('div').length).toBe(0);
    });
    it('should render loader', async() => {
        mockGoodsSettingContext.state.loading.header = true;
        render(<GoodsSettingHeader />);

        expect(screen.getByText('Loading')).toBeInTheDocument();
    });
});
