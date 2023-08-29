import React, { useState } from 'react';
import s from './ContactsMap.module.scss';
import { GeolocationControl, Map, Placemark, TypeSelector, YMaps } from '@pbe/react-yandex-maps';
import { CONTACTS_DICTIONARY } from '../../Contacts.dictionary';
import ImageSkeleton from '../../../../../../common/ui/components/Image/ImageSkeleton';
import classNames from 'classnames';

const map = {
    defaultState : {
        center: [55.191600, 30.252134],
        zoom: 15,
        controls: ['zoomControl', 'fullscreenControl'],
    },
    modules: ['control.ZoomControl', 'control.FullscreenControl']
};

const placemark = {
    geometry: map.defaultState.center,
    properties: {
        iconCaption: 'HAPPYDRESS',
        balloonContent: `<b>${CONTACTS_DICTIONARY.WORK_HOURS.join('<br>')}</b>`,
    },
    options : {
        preset: 'islands#icon',
        iconColor: 'rgba(167, 82, 20, 0.8)',
    },
    modules: ['geoObject.addon.balloon', 'geoObject.addon.hint'],
};


const ContactsMap = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    const handleLoad = () => {
        setIsLoading(false);  
    };
    
    return (
        <div className={s.ContactsMap}>
            {isLoading && <ImageSkeleton/>}
            <div className={classNames(s.ContactsMap_map, isLoading && s.ContactsMap_map_hidden)}>
                <YMaps>
                    <Map {...map} 
                        width={'100%'}
                        height={'100%'}
                        onLoad={handleLoad}
                    >
                        <TypeSelector options={{ float: 'right' }} />
                        <GeolocationControl options={{ float: 'left' }} />
                        <Placemark{...placemark}/>
                    </Map>
                </YMaps>
            </div>
        </div>
    );
};

export default ContactsMap;