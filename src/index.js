import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import App from './common/components/App/App';
import { BrowserRouter } from 'react-router-dom';
import AxiosConfigProvider from './axiosConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AxiosConfigProvider>
                <App/>
            </AxiosConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);