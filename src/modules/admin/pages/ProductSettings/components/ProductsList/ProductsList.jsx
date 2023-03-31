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
import { fetchCatalogueItems } from '../../../../../../common/ui/store/slices/productsSearchSlice';
import classNames from 'classnames';

const ProductsList = () =>{

    const products = useSelector(state => state.productsSearch.products);
    const filters = useSelector(state => state.productsSearch.filters);
    const currentPage = useSelector(state => state.productsSearch.currentPage);
    const totalPages = useSelector(state => state.productsSearch.totalPages);
    const isLoading = useSelector(state => state.productsSearch.loading);
    const selectedProducts = useSelector(state => state.productsSearch.selectedProducts);
    const { ref, inView } = useInView({
        threshold: 0,
    });
    const dispatch = useDispatch();

    const renderSkeletons = (amount) =>{
        return Array.from(Array(amount).keys()).map((item) => <ProductCardSkeleton key={item + products.length}/>);
    };

    const shouldActivate = usePageScroll(300);

    const clickHandler = () => {
        scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if(inView && currentPage < totalPages) {
            dispatch(fetchCatalogueItems({ filters, page: currentPage }));
        }
    }, [inView]);

    return (
        <div className={s.ProductsList}>
            <ProductCardAdd/>
            {products.map((product, index) => {
                return <ProductCard key={index} product={product} isAdmin={true}/>;
            })}
            {isLoading && renderSkeletons(15)}
            <div ref={ref} className={classNames(s.observingBlock, { [s.active]: !isLoading })}/>
            { shouldActivate && <Slider id={s.slider} onClick={clickHandler}/> }
            {
                !!selectedProducts.length &&
                <div id={s.trash}>
                    <Trash/>
                    <p>{selectedProducts.length}</p>
                </div>
            }
        </div>
    );
};

export default ProductsList;
