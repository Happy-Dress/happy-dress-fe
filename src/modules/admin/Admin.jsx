import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import GoodsSetting from './pages/GoodsSetting/GoodsSetting';
import CatalogSetting from './pages/CatalogSetting/CatalogSetting';
import RegistrationSetting from './pages/RegistrationSetting/RegistrationSetting';
import BlogSetting from './pages/BlogSetting/BlogSetting';
import NotFound from './pages/NotFound';
import s from './Admin.module.scss';
import TosterProvider from './contexts/TosterContext/provider/TosterProvider';

export const AdminPanelRouts = () => {
    return (
        <div className={s.adminRoutes}>
            <NavigationPanel/>
            <Routes>
                <Route path="/" element={<Navigate to={'catalog-setting'} />} />
                <Route path="catalog-setting" element={<CatalogSetting />}/>
                <Route path="blog-setting" element={<BlogSetting />}/>
                <Route path="goods-setting" element={<GoodsSetting />}/>
                <Route
                    path="registration-setting"
                    element={<RegistrationSetting />}
                />
            </Routes>
        </div>
    );
};

const Admin = () => {
    return (
        <TosterProvider>
            <Routes className={s.adminRoutes}>
                <Route path="/" element={<Navigate to="sign-in" />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/panel/*" element={<AdminPanelRouts />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </TosterProvider>
    );
};

export default Admin;
