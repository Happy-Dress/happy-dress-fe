import { render, screen } from '@testing-library/react';
import FilterBadge from './FilterBadge';
import { mockGoodsSettingContext } from '../../../../../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('FilterBadge', () => {
    it('should render correct', () => {
        render(<FilterBadge name={'Свадебные'} currentCategory={'cateogires'} id={84}/>);

        expect(screen.getByText('Свадебные')).toBeInTheDocument();
    });
    it('should render correct', () => {
        const { container } = render(<FilterBadge name={''} currentCategory={'cateogires'} id={84}/>);

        expect(container.getElementsByClassName('FilterBadge')[0]).toBe(undefined);
    });
});
