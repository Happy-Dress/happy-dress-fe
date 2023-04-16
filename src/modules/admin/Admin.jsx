import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import RegistrationSetting from './pages/RegistrationSetting/RegistrationSetting';
import BlogSettings from './pages/BlogSettings/BlogSettings';
import NotFound from './pages/NotFound';
import s from './Admin.module.scss';
import PrivateRoutes from '../../common/util/routers/ProtectedRoutes';
import CatalogSettings from './pages/CatalogSettings';
import ProductSettings from './pages/ProductSettings';
import { ProductsCard } from './pages/ProductsCard/ProductsCard';

const RETRY_SIGN_IN = 'Выполните вход';

export const AdminPanelRoutes = () => {
    return (
        <div className={s.adminRoutes}>
            <NavigationPanel/>
            <div className={s.adminPage}>
                <Routes>
                    <Route path="/" element={<Navigate to={'catalog-settings'}/>}/>
                    <Route path="catalog-settings" element={<CatalogSettings/>}/>
                    <Route path="blog-settings" element={<BlogSettings/>}/>
                    <Route path="products-settings" element={<ProductSettings/>}/>
                    <Route path="product-card" element={<ProductsCard/>}/>
                    <Route
                        path="registration-settings"
                        element={<RegistrationSetting/>}
                    />
                </Routes>
            </div>
        </div>
    );
};

const Admin = () => {
    return (
        <Routes className={s.adminRoutes}>
            <Route path="/" element={<Navigate to="sign-in"/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route element={<PrivateRoutes errorMessage={RETRY_SIGN_IN}/>}>
                <Route path="/panel/*" element={<AdminPanelRoutes/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default Admin;
