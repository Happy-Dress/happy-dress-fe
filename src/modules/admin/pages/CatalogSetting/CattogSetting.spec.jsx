/* eslint-disable indent */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CatalogSetting from './index';

jest.mock('./CatalogSetting', ()=>({
__esModule: true,
default: ()=>{
return <div data-testid="catalog-page"></div>;
}
}));
describe('CatalogSetting', () => {
it('should render correctly', async () => {
render(<CatalogSetting />);
const page = screen.getByTestId('catalog-page');
expect(page).toBeInTheDocument();
});
});
