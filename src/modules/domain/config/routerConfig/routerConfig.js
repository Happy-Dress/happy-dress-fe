
import { Catalog } from '../../pages/Catalog';
import { Landing } from '../../pages/Landing';
import { Contacts } from '../../pages/Contacts';
import { Blog } from '../../pages/Blog';


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
        element: <Landing />,
    },
    catalog: {
        name: 'Каталог',
        path: ROUTER_PATHS.catalog,
        element: <Catalog />,
    },
    blog: {
        name: 'Блог',
        path: ROUTER_PATHS.blog,
        element: <Blog/>,
    },
    contacts: {
        name: 'Контакты',
        path: ROUTER_PATHS.contacts,
        element: <Contacts/>,
    },
};

export const disabledRouterConfig = {
    changing: {
        name: 'Примерка',
        path: ROUTER_PATHS.changing,
        element: <div>changing</div>,
        status: 'Скоро',
    }
};
