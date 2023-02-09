import Landing from '../pages/Landing';
import { Catalog } from '../pages/Catalog';

const routesPaths = {
    HOME: 'home',
    CATALOG: 'catalog',
    BLOG: 'blog',
    CONTACTS: 'contacts',
    CHANGING: 'changing'
};

const routesNames = {
    HOME: 'Главная',
    CATALOG: 'Каталог',
    BLOG: 'Блог',
    CONTACTS: 'Контакты',
    CHANGING: 'Примерка'
};

export const routerConfig = {
    home: {
        path: routesPaths.HOME,
        element: <Landing />,
        pageName: routesNames.HOME
    },
    catalog: {
        path: routesPaths.CATALOG,
        element: <Catalog />,
        pageName: routesNames.CATALOG
    },
    blog: {
        path: routesPaths.BLOG,
        element: <div>БЛОГ</div>,
        pageName: routesNames.BLOG
    },
    contacts: {
        path: routesPaths.CONTACTS,
        element: <div>КОНТАКТЫ</div>,
        pageName: routesNames.CONTACTS
    },
    changing: {
        path: routesPaths.CHANGING,
        element: <div>ПРИМЕРКА</div>,
        pageName: routesNames.CHANGING
    }
};