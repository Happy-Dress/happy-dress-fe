import testBgImage from '../../assets/images/ZeroBlock/ZeroBlockSM.png';

const item = {
    id: 1,
    name: 'S000012345',
    colors: [
        '#fff',
        '#000',
        '#a65f30'
    ],
    sizes: [1, 2, 3, 4],
    category: 'Свадебные',
    imageUrl: testBgImage
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getCatalogueItems = async (filters) => {
    await sleep(1000);
    return await new Promise((resolve) => {
        console.log(filters);
        const arr = [];
        for(let i = 0; i< 15; i++){
            const newItem = { ...item, id: i };
            arr.push(newItem);
        }
        resolve(arr);
    });
};

export default getCatalogueItems;
