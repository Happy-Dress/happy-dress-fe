import { render, screen } from '@testing-library/react';
import CatalogHeader from './CatalogHeader';
import { mockGoodsSettingContext } from '../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('GoodsSettingHeader', () => {
    it('should render correct', async() => {
        const { container } = render(<CatalogHeader />);

        expect(container.getElementsByTagName('div').length).toBe(0);
    });
    it('should render loader', async() => {
        mockGoodsSettingContext.state.loading.header = true;
        render(<CatalogHeader />);

        expect(screen.getByText('Loading')).toBeInTheDocument();
    });
});
