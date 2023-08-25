import React from 'react';
import s from './ContactsMap.module.scss';
import { GeolocationControl, Map, Placemark, TypeSelector, YMaps } from '@pbe/react-yandex-maps';
import { CONTACTS_DICTIONARY } from '../../Contacts.dictionary';

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
    return (
        <div className={s.ContactsMap}>
            <YMaps>
                <Map {...map} width={'100%'} height={'100%'}>
                    <TypeSelector options={{ float: 'right' }} />
                    <GeolocationControl options={{ float: 'left' }} />
                    <Placemark{...placemark}/>
                </Map>
            </YMaps>
        </div>
    );
};

export default ContactsMap;