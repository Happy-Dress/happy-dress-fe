import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import GoodsSetting from './pages/GoodsSetting/GoodsSetting';
import CatalogSetting from './pages/CatalogSettings/CatalogSettings';
import RegistrationSetting from './pages/RegistrationSetting/RegistrationSetting';
import BlogSetting from './pages/BlogSetting/BlogSetting';
import NotFound from './pages/NotFound';
import s from './Admin.module.scss';
import PrivateRoutes from '../../common/util/routers/ProtectedRoutes';

const RETRY_SIGN_IN = 'Выполните вход';

export const AdminPanelRoutes = () => {
    return (
        <div className={s.adminRoutes}>
            <NavigationPanel/>
            <div className={s.adminPage}>
                <Routes>
                    <Route path="/" element={<Navigate to={'catalog-setting'}/>}/>
                    <Route path="catalog-setting" element={<CatalogSetting/>}/>
                    <Route path="blog-setting" element={<BlogSetting/>}/>
                    <Route path="goods-setting" element={<GoodsSetting/>}/>
                    <Route
                        path="registration-setting"
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
