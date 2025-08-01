import React from 'react';
import { Link } from 'react-router-dom';
import s from './ProductsList.module.scss';
import ProductCardAdd from '../ProductCardAdd';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardSkeleton from '../../../../../../common/ui/components/ProductCard/ProductCardSkeleton';
import ProductCard from './components/ProductCard/ProductCard';
import Slider from '../../../../../../common/assets/images/slider-arrow.svg';
import Trash from '../../../../../../common/assets/images/Trash.svg';
import { usePageScroll } from '../../../../../../common/ui/hooks/usePageScroll';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import {
    fetchCatalogueItems,
    resetSelectedProducts,
    deleteProducts, resetProducts,
} from '../../../../../../common/ui/store/slices/productsSearchSlice';
import DeleteProductConfirmationDialog from './components/DeleteProductConfirmationDialog/DeleteProductConfirmationDialog';
import { useModal } from 'react-modal-hook';
import { useToasters } from '../../../../../../common/ui/contexts/ToastersContext';
import classNames from 'classnames';

const ProductsList = () => {
    const products = useSelector((state) => state.productsSearch.products);
    const filters = useSelector((state) => state.productsSearch.filters);
    const currentPage = useSelector((state) => state.productsSearch.currentPage);
    const totalPages = useSelector((state) => state.productsSearch.totalPages);
    const isLoading = useSelector((state) => state.productsSearch.loading);
    const { showToasterNotification, showToasterSuccess } = useToasters();
    const selectedProducts = useSelector(
        (state) => state.productsSearch.selectedProducts
    );

    const [showModal, hideModal] = useModal(() => {
        return (
            <DeleteProductConfirmationDialog
                onClose={hideModal}
                onSubmit={handleDeleteProducts}
            />
        );
    }, [selectedProducts]);

    const { ref, inView } = useInView({
        threshold: 0,
    });
    const dispatch = useDispatch();

    const renderSkeletons = (amount) => {
        return Array.from(Array(amount).keys()).map((item) => (
            <ProductCardSkeleton key={item + products.length} />
        ));
    };

    const shouldDisplayGoToTop = usePageScroll(300);

    const handleGoToTopClick = () => {
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
            dispatch(
                fetchCatalogueItems({ filters, page: currentPage + 1, isSecure: true })
            );
        }
    }, [inView]);

    const handleDeleteProducts = async () => {
        await dispatch(deleteProducts({ selectedProducts: selectedProducts }))
            .unwrap()
            .then(() => {
                showToasterSuccess('Товары успешно удалены!');
                dispatch(resetSelectedProducts());
                dispatch(resetProducts());
                dispatch(fetchCatalogueItems({ filters, page: 1, isSecure: true }));
            })
            .catch(() => {
                showToasterNotification('Ошибка при удалении товаров');
            });
        hideModal();
    };

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
                        <Trash onClick={showModal} />
                        <p>{selectedProducts.length}</p>
                    </div>
                </div>
            )}
            <div ref={ref} className={classNames(s.observingBlock, { [s.active]: !isLoading })}/>
            {shouldDisplayGoToTop && (
                <Slider id={s.slider} onClick={handleGoToTopClick} />
            )}
        </div>
    );
};

export default ProductsList;
