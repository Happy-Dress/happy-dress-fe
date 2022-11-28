
import React from 'react';
import { render, screen } from '@testing-library/react';
import GoodsSetting from './index';

jest.mock('./GoodsSetting', ()=>({
    __esModule: true,
    default: ()=>{
        return <div  data-testid="goods-page"></div>;
    }
}));
describe('GoodsSetting', () => {
    it('should render correctly', async () => {
        render(<GoodsSetting />);
        const page = screen.getByTestId('goods-page');
        expect(page).toBeInTheDocument();
    });
});
