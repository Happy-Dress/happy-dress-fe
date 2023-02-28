import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import  CatalogSetting  from '../../../pages/CatalogSettings/CatalogSettings';
import  BlogSettings  from '../../../pages/BlogSettings/BlogSettings';
import  RegistrationSetting  from '../../../pages/RegistrationSetting/RegistrationSetting';
import  ProductSettings from '../../../pages/ProductSettings';
import  NavigationPanelDesktop  from './NavigationPanelDesktop';
import SignIn from '../../../pages/SignIn/';

export const renderWithRouter = (component) => {
    render(
        <MemoryRouter>
            {component}
            <Routes>
                <Route
                    path="/admin/panel/catalog-settings"
                    element={<CatalogSetting />}
                />
                <Route
                    path="/admin/panel/blog-settings"
                    element={<BlogSettings />}
                />
                <Route
                    path="/admin/panel/products-settings"
                    element={<ProductSettings />}
                />
                <Route
                    path="/admin/panel/registration-settings"
                    element={<RegistrationSetting />}
                />
                <Route path="/admin" element={<SignIn />}/>
            </Routes>
        </MemoryRouter>
    );
};


jest.mock('../../../pages/BlogSettings/BlogSettings', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="blog-page"/>;
    },
}));

jest.mock('../../../pages/CatalogSettings/CatalogSettings', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="catalog-page"/>;
    },
}));

jest.mock('../../../pages/ProductSettings', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="goods-page"/>;
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
        return <div data-testid="registration-page"/>;
    },
}));


describe('NavigationPanelDesktop', () => {

    const mockExit = jest.fn();

    beforeEach( () => {
        renderWithRouter(<NavigationPanelDesktop ordersAmount={1} handleExit={mockExit}/>);
    });


    it('should render NavigatingPanelDesktop', async () => {
        const panelDesktop = screen.getByText('HAPPYDRESS');
        await waitFor(() => {
            expect(panelDesktop).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Каталог" link, the Catalog page opens.', async () => {
        const btn = screen.getByText('Каталог');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Товар" link, the Goods page opens.', async () => {
        const btn = screen.getByText('Товар');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('goods-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Записи" link, the Registration page opens.', async () => {
        const btn = screen.getByText('Записи');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('registration-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Блог" link, the Blog page opens.', async () => {
        const btn = screen.getByText('Блог');
        userEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('blog-page')).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Exit" link, the Sign-in page opens.', async () => {
        const btn = screen.getByText('Выход');
        userEvent.click(btn);
        await waitFor(() => {
            expect(mockExit).toHaveBeenCalled();
        });
    });
});
