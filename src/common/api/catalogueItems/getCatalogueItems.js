import axios from 'axios';

const ITEMS_LIMIT = 15;


const getCatalogueItems = async (filters, page) => {
    const requestFilters = {
        categoryId: filters.category,
        modelIds: filters.models.length ? filters.models : null,
        materialIds: filters.materials.length? filters.materials: null,
        colorIds: filters.colors.length ? filters.colors : null,
        sizeIds: filters.sizes.length ? filters.sizes : null,
        name: filters.name,
    };
    const response = await axios.post('products/search', {
        ...requestFilters,
        limit: ITEMS_LIMIT,
        page
    });
    return response.data;
};

export default getCatalogueItems;
