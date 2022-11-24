import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NavigationPanelDesktop from './NavigationPanelDesktop';
import CatalogSetting from '../../../pages/CatalogSetting/CatalogSetting';
import GoodsSetting from '../../../pages/GoodsSetting/GoodsSetting';
import BlogSetting from '../../../pages/BlogSetting/BlogSetting';
import RegistrationSetting from '../../../pages/RegistrationSetting/RegistrationSetting';
import SignIn from '../../../pages/SignIn/';
import { Route, Routes } from 'react-router-dom';

jest.mock('../../../pages/SignIn/', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="athorization">Athorization form</div>;
    }
}));

export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="admin/panel/catalog-setting"
                element={<CatalogSetting />}
            ></Route>
            <Route
                path="admin/panel/blog-setting"
                element={<BlogSetting />}
            ></Route>
            <Route
                path="admin/panel/goods-setting"
                element={<GoodsSetting />}
            ></Route>
            <Route
                path="admin/panel/registration-setting"
                element={<RegistrationSetting />}
            ></Route>
            <Route
                path="/admin"
                element={<SignIn />}
            ></Route>
        </Routes>
    );
};

describe('NavigationPanelDesktop', () => {
    it('should render NavigatingPanelDesktop', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelDesktop />
            </MemoryRouter>
        );
        const panelDesktop = screen.getByTestId('desktopPanel');
        await waitFor(() => {
            expect(panelDesktop).toBeInTheDocument();
        });
    });

    it('Should after clicking the "Каталог" link, the Catalog page opens.', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelDesktop />
                <AppRouter />
            </MemoryRouter>
        );
        const btn =  screen.getByTestId('Каталог');
        fireEvent.click(btn);         
        await waitFor(()=>{
            expect(screen.getByTestId('catalog-page')).toBeInTheDocument(); 
            screen.debug(); 
        });
            
    });

    it('Should after clicking the "Товар" link, the Goods page opens.', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelDesktop />
                <AppRouter />
            </MemoryRouter>
        );
        const btn = screen.getByTestId('Товар');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('goods-page')).toBeInTheDocument();
            screen.debug();
        });
    });

    it('Should after clicking the "Записи" link, the Registration page opens.', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelDesktop />
                <AppRouter />
            </MemoryRouter>
        );
        const btn = screen.getByTestId('Записи');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('registration-page')).toBeInTheDocument();
            screen.debug();
        });
    });

    it('Should after clicking the "Блог" link, the Blog page opens.', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelDesktop />
                <AppRouter />
            </MemoryRouter>
        );
        const btn = screen.getByTestId('Блог');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('blog-page')).toBeInTheDocument();
            screen.debug();
        });
    });

    it('Should after clicking the "Exit" link, the Sign-in page opens.', async () => {
        render(
            <MemoryRouter>
                <NavigationPanelDesktop />
                <AppRouter />
            </MemoryRouter>
        );
        const btn = screen.getByTestId('exit');
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.getByTestId('athorization')).toBeInTheDocument();
            screen.debug();
        });
    });
});
