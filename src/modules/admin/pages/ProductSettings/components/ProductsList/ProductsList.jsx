import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './ProductsList.module.scss';
import ProductCardAdd from '../ProductCardAdd';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardSkeleton from '../../../../../../common/ui/components/ProductCard/ProductCardSkeleton';
import ProductCard from './components/ProductCard/ProductCard';
import { ReactComponent as Slider } from '../../../../../../common/assets/images/slider-arrow.svg';
import { ReactComponent as Trash } from '../../../../../../common/assets/images/Trash.svg';
import { usePageScroll } from '../../../../../../common/ui/hooks/usePageScroll';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import {
    fetchCatalogueItems,
    resetSelectedProducts,
    deleteProducts,
    unSelectProduct,
} from '../../../../../../common/ui/store/slices/productsSearchSlice';
import DeleteProductConfirmationDialog from './components/ProductCard/deleteProductConfirmationDialog/DeleteProductConfirmationDialog';


const ProductsList = () => {
    const [show, setShow] = useState(false);
    const products = useSelector((state) => state.productsSearch.products);
    const filters = useSelector((state) => state.productsSearch.filters);
    const currentPage = useSelector((state) => state.productsSearch.currentPage);
    const totalPages = useSelector((state) => state.productsSearch.totalPages);
    const isLoading = useSelector((state) => state.productsSearch.loading);
    const selectedProducts = useSelector(
        (state) => state.productsSearch.selectedProducts
    );
    const { inView } = useInView({
        threshold: 0,
    });
    const dispatch = useDispatch();

    
    const renderSkeletons = (amount) => {
        return Array.from(Array(amount).keys()).map((item) => (
            <ProductCardSkeleton key={item + products.length} />
        ));
    };

    const shouldActivate = usePageScroll(300);

    const clickHandler = () => {
        scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        dispatch(resetSelectedProducts());
    }, []);

    useEffect(() => {
        if (inView && currentPage < totalPages) {
            dispatch(fetchCatalogueItems({ filters, page: currentPage }));
        }
    }, [inView]);

    const handleDeleteProduct = () => {
        selectedProducts.forEach((productId) => {
            dispatch(deleteProducts({ productId }));
            dispatch(unSelectProduct(productId));
        });
        setShow(false);
    };
    const onClose = () => {setShow(false);};

    return (
        <div className={s.ProductsList}>
            <Link to="../product-card" className={s.ProductsListLink}>
                <ProductCardAdd />
            </Link>
            {products.map((product, index) => {
                return <ProductCard key={index} product={product} isAdmin={true} />;
            })}
            {isLoading && renderSkeletons(15)}
            {!!selectedProducts.length && (
                <div className={s.bottomBar}>
                    <div id={s.trash}>
                        <Trash onClick={()=>{setShow(true);}} />
                        <p>{selectedProducts.length}</p>
                    </div>
                </div>
            )}
            {show && <DeleteProductConfirmationDialog onClose={ onClose } handleDeleteProduct={handleDeleteProduct}/>}
            {shouldActivate && <Slider id={s.slider} onClick={clickHandler} />}
        </div>
    );
};

export default ProductsList;
