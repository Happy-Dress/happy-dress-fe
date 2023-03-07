import s from './SkeletonSearchLayout.module.scss';


const SkeletonSearchLayout = () =>{
    return (
        <div className={s.SkeletonSearchLayout}>
            <span className={s.skeletonCategory}/>
            <span className={s.skeletonCategory}/>
            <span className={s.skeletonCategory}/>
            <span className={s.skeletonCategory}/>
            <span className={s.skeletonCategory}/>
        </div>
    );
};

export default SkeletonSearchLayout;
