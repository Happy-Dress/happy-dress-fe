import axios from 'axios';

const ITEMS_LIMIT = 15;


const getCatalogItems = async (filters, page, isSecure) => {
    const requestFilters = {
        categoryId: filters.category,
        modelIds: filters.models.length ? filters.models : null,
        materialIds: filters.materials.length? filters.materials: null,
        colorIds: filters.colors.length ? filters.colors : null,
        sizeIds: filters.sizes.length ? filters.sizes : null,
        name: filters.name,
    };
    const response = await axios.post(isSecure ? 'secure/products/search' : 'products/search', {
        ...requestFilters,
        limit: ITEMS_LIMIT,
        page
    });
    return response.data;
};

export default getCatalogItems;
