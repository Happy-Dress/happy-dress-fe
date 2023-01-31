const getCatalogueItems = async (queryString) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            console.log(queryString);
            // переведёт промис в состояние fulfilled с результатом "result"
            resolve([
                {
                    id: 1,
                    name: 'S000012345',
                    colors: [
                        '#fff',
                        '#000',
                        '#a65f30'
                    ],
                    sizes: [1, 2, 3, 4],
                    category: 'Свадебные'
                },
                {
                    id: 2,
                    name: 'S000012346',
                    colors: [
                        '#fff',
                        '#000',
                        '#a65f30'
                    ],
                    sizes: [1, 2, 3, 4],
                    category: 'Деловой стиль'
                },
            ]);
        }, 1000);
    });
};

export default getCatalogueItems;