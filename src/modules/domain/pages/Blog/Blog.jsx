import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './Blog.module.scss';
import ImageSkeleton from '../../../../common/ui/components/Image/ImageSkeleton';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';

const Blog = () => {

    const [iframeSrcDoc, setIframeSrcDoc] = useState(null);
    const [showSkeleton, setShowSkeleton] = useState(true);

    const { isDesktop } = useDeviceTypeContext();


    useEffect(() => {
        axios.get('https://drive.google.com/drive/folders/1qTwDt_4CYForDYa8NRj3ghVQtrr--WAV?usp=sharing')
            .then((response) => {
                setIframeSrcDoc(response.data);
            });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const iFrameID = document.getElementById('idIframe');
            if (iFrameID && showSkeleton) {
                const iFrameHeight = iFrameID.contentWindow.document.body?.scrollHeight;
                if (iFrameHeight > 1800) {
                    iFrameID.height = iFrameHeight + 'px';
                    setShowSkeleton(false);
                } else {
                    setShowSkeleton(true);  
                }
            }
        }, 50);
    }, [iframeSrcDoc, showSkeleton]);
    

    return (
        <div className={s.Blog}>
            { showSkeleton && <ImageSkeleton
                height={'calc(100vh - 100px'}
                position={'absolute'}
                top={isDesktop ? '100px' : '70px'}
                left={'0'}
            /> }
            <iframe
                id={'idIframe'}
                title="Blog"
                width={'100%'}
                srcDoc={iframeSrcDoc}
            />
        </div>
    );
};

export default Blog;