import React from 'react';
import s from './Main.module.scss';

export const Main = () => {
    return (
        <div className={s.mainPageWrapper}>
            <header>Header Component</header>
            <main>
                <h1>Main Page</h1>
                MainPageComponent
            </main>
            <footer>Footer Component</footer>
        </div>
    );
};
