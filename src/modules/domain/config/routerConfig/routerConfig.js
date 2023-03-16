import Landing from '../../pages/Landing';
import { Catalog } from '../../pages/Catalog';


export const ROUTER_PATHS = {
    home: 'home',
    catalog: 'catalog',
    blog: 'blog',
    contacts: 'contacts',
    changing: 'changing'
};

export const routerConfig = {
    home: {
        name: 'Главная',
        path: ROUTER_PATHS.home,
        element: <Landing />
    },
    catalog: {
        name: 'Каталог',
        path: ROUTER_PATHS.catalog,
        element: <Catalog />
    },
    blog: {
        name: 'Блог',
        path: ROUTER_PATHS.blog,
        element: <div>blog</div>
    },
    contacts: {
        name: 'Контакты',
        path: ROUTER_PATHS.contacts,
        element: <div>contacts</div>
    },
    changing: {
        name: 'Примерка',
        path: ROUTER_PATHS.changing,
        element: <div>changing</div>
    }
};