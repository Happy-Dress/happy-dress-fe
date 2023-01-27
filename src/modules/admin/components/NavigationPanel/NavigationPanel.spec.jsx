import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import NavigationPanel from './NavigationPanel';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CatalogSetting from '../../pages/CatalogSettings/CatalogSettings';
import BlogSetting from '../../pages/BlogSetting';
import GoodsSetting from '../../pages/GoodsSetting';
import RegistrationSetting from '../../pages/RegistrationSetting';
import SignIn from '../../pages/SignIn';


jest.mock('../../../../common/ui/hocs/adaptive', () => ({
    __esModule: true,
    default: () => () => <div>Navigation Panel</div>
}));

export const renderWithRouter = (component) => {
    render(
        <MemoryRouter>
            {component}
            <Routes>
                <Route
                    path="/admin/panel/catalog-setting"
                    element={<CatalogSetting />}
                />
                <Route
                    path="/admin/panel/blog-setting"
                    element={<BlogSetting />}
                />
                <Route
                    path="/admin/panel/goods-setting"
                    element={<GoodsSetting />}
                />
                <Route
                    path="/admin/panel/registration-setting"
                    element={<RegistrationSetting />}
                />
                <Route path="/admin" element={<SignIn />}/>
            </Routes>
        </MemoryRouter>
    );
};


describe('NavigationPanel', () => {
    it('should render panel', async () => {
        renderWithRouter(<NavigationPanel/>);
        const panel = screen.getByText('Navigation Panel');
        await waitFor(() =>{
            expect(panel).toBeInTheDocument();
        });
    });

});
