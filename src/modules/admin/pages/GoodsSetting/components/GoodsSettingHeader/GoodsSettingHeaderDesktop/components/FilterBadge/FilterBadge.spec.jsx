import { render, screen } from '@testing-library/react';
import FilterBadge from './FilterBadge';
import { mockCatalogueSettingsResponse } from '../../../../../../../../../__mocks__/mockCatalogueSettingsResponse';

describe('Filter Badge', () => {
    it('should render correctly', () => {
        render(<FilterBadge filters={mockCatalogueSettingsResponse} setCurrentFilters={() => {}} itemId={'14'} itemCategory={'colors'}/>);

        expect(screen.getByText('красный')).toBeInTheDocument();
    });

    it('should not render', () => {
        const { container } = render(<FilterBadge filters={mockCatalogueSettingsResponse} setCurrentFilters={() => {}} itemId={'0'} itemCategory={'colors'}/>);

        expect(container.getElementsByTagName('p').length).toBe(0);
    });
});
