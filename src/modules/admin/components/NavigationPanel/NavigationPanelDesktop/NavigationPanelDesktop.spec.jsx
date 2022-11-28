
import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import  CatalogSetting  from '../../../pages/CatalogSetting/CatalogSetting';
import  BlogSetting  from '../../../pages/BlogSetting/BlogSetting';
import  RegistrationSetting  from '../../../pages/RegistrationSetting/RegistrationSetting';
import  GoodsSetting  from '../../../pages/GoodsSetting/GoodsSetting';
import  NavigationPanelDesktop  from './NavigationPanelDesktop';
import SignIn from '../../../pages/SignIn/';

export const renderWithRouter = (component) => {
    render(
        <MemoryRouter>
            {component}
            <Routes>
                <Route
                    path="/admin/panel/catalog-setting"
                    element={<CatalogSetting />}
                ></Route>
                <Route
                    path="/admin/panel/blog-setting"
                    element={<BlogSetting />}
                ></Route>
                <Route
                    path="/admin/panel/goods-setting"
                    element={<GoodsSetting />}
                ></Route>
                <Route
                    path="/admin/panel/registration-setting"
                    element={<RegistrationSetting />}
                ></Route>
                <Route path="/admin" element={<SignIn />}></Route>
            </Routes>
        </MemoryRouter>
    );
};


jest.mock('../../../pages/BlogSetting/BlogSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="blog-page"></div>;
    },
}));

jest.mock('../../../pages/CatalogSetting/CatalogSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="catalog-page"></div>;
    },
}));

jest.mock('../../../pages/GoodsSetting/GoodsSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="goods-page"></div>;
    },
}));

jest.mock('../../../pages/SignIn/', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="athorization">Athorization form</div>;
    }
}));

jest.mock('../../../pages/RegistrationSetting/RegistrationSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="registration-page"></div>;
    },
}));

 
describe('NavigationPanelDesktop', () => {   
    beforeEach( () => {
        renderWithRouter(<NavigationPanelDesktop/>);
    });

 
    it('should render NavigatingPanelDesktop', async () => {
        const panelDesktop = screen.getByText('HAPPYDRESS');
        await waitFor(() => {
            expect(panelDesktop).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Каталог" link, the Catalog page opens.', async () => {
        const btn = screen.getByText('Каталог');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
        });
    });
      
    it('Should after clicking the "Товар" link, the Goods page opens.', async () => {
        const btn = screen.getByText('Товар');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('goods-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Записи" link, the Registration page opens.', async () => {
        const btn = screen.getByText('Записи');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('registration-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Блог" link, the Blog page opens.', async () => {
        const btn = screen.getByText('Блог');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('blog-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Exit" link, the Sign-in page opens.', async () => {        
        const btn = screen.getByText('Выход');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('athorization')).toBeInTheDocument();
        });
    });
});
