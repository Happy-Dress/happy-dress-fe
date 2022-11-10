/* eslint-disable indent */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import NavigationPanel from './components/NavigationPanel';
import NavigationPanelMobile from './components/NavigationPanelMobile';
import GoodsSetting from './pages/goodssetting/GoodsSetting';
import CatalogSetting from './pages/catalogsetting/CatalogSetting';
import RegistrationSetting from './pages/registrationsetting/RegistrationSetting';
import BlogSetting from './pages/blogsetting/BlogSetting';
import NotFound from './pages/NotFound';
import { useDeviceTypeContext } from '../../common/contexts/DeviceType';

const AdminPanelRouts = () => {
  const { isDesktop, isMobile } = useDeviceTypeContext();
  return (
    <>
      {isMobile && <NavigationPanelMobile />}
      {isDesktop && <NavigationPanel />}
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
    </>
  );
};

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="sign-in" />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/panel/*" element={<AdminPanelRouts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Admin;
