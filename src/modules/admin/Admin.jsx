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

const AdminPanelRouts = () => {
    return (
        <div className={s.adminRoutes}>
            <NavigationPanel/>
            <Routes>
                <Route path="/" element={<Navigate to={'catalog-setting'} />} />
                <Route path="catalog-setting" element={<CatalogSetting />}></Route>
                <Route path="blog-setting" element={<BlogSetting />}></Route>
                <Route path="goods-setting" element={<GoodsSetting />}></Route>
                <Route
                    path="registration-setting"
                    element={<RegistrationSetting />}
                ></Route>
            </Routes>
        </div>
    );
};

const Admin = () => {
    return (
        <Routes className={s.adminRoutes}>
            <Route path="/" element={<Navigate to="sign-in" />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/panel/*" element={<AdminPanelRouts />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Admin;
