import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import { App } from './common/ui/components';
import { BrowserRouter } from 'react-router-dom';
import AxiosConfigProvider from './common/config/axiosConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AxiosConfigProvider>
            <App/>
        </AxiosConfigProvider>
    </BrowserRouter>
);
