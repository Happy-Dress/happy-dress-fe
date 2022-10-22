import React from 'react';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.module.scss';
import { Main } from '../../features/Main';
import { Auth } from '../../features/Auth';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Main />} />
                    <Route path={'/manager'} element={<Auth />} />{/*todo* private routing*/}
                    <Route path={'/manager/auth'} element={<Auth />} />
                    <Route path={'*'} element={<Main />} />{/*todo 404page*/}
                </Routes>
                {/*todo del it, just for test*/}
                <div>
                    <br/>
                    Just for test next links
                </div>
                <div>
                    <Link to={'/'}>Link to Home</Link>
                </div>
                <div>
                    <Link to={'/manager/auth'}>Link to Auth</Link>
                </div>
                {/*todo del it, just for test*/}
            </BrowserRouter>
        </div>
    );
};

export default App;
