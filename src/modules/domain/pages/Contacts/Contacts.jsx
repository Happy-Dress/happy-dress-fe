import React from 'react';
import s from './Contacts.module.scss';
import mainImage from '../../../../common/assets/images/contacts1.png';
import secondary2Image from '../../../../common/assets/images/contacts2.png';
import secondary3Image from '../../../../common/assets/images/contacts3.png';
import secondary4Image from '../../../../common/assets/images/contacts4.png';
import GalleryContacts from './components/GalleryContacts';
import { CONTACTS_DICTIONARY } from './Contacts.dictionary';
import Instagram from '../../../../common/assets/images/inst.svg';
import Vk from '../../../../common/assets/images/vk.svg';
import Telegram from '../../../../common/assets/images/tg.svg';
import ContactsMap from './components/ContactsMap';

const {
    CONTACTS_SHOWROOM_LABEL,
    ADDRESS_SHOWROOM,
    WORK_HOURS_LABEL,
    WORK_HOURS,
    PHONE_NUMBER,
    EMAIL,
    INSTAGRAM_LINK,
    TELEGRAM_LINK,
    VK_LINK,
    DRIVING_DIRECTIONS,
} = CONTACTS_DICTIONARY;

const secondaryImages = [secondary2Image, secondary3Image, secondary4Image];

const Contacts = () => {
    return (
        <div className={s.Contacts}>
            <div className={s.Contacts_mainItems}>
                <GalleryContacts secondaryImages={secondaryImages} mainImage={mainImage}/>
                <div className={s.Contacts_right_side}>
                    <div className={s.Contacts_right_side_item}>
                        <h3>{CONTACTS_SHOWROOM_LABEL}</h3>
                        <p>{ADDRESS_SHOWROOM}</p>
                    </div>
                    <div className={s.Contacts_right_side_item}>
                        <h4>{WORK_HOURS_LABEL}</h4>
                        <div className={s.Contacts_right_side_item_workhours}>
                            {WORK_HOURS.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <div className={s.Contacts_right_side_item}>
                        <div className={s.Contacts_right_side_item_contacts}>
                            <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        </div>
                        <div className={s.Contacts_right_side_item_contacts_icons}>
                            <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                                <Instagram className={s.Contacts_right_side_item_contacts_icon} alt="instagram"/>
                            </a>
                            <a href={VK_LINK} target="_blank" rel="noreferrer">
                                <Vk className={s.Contacts_right_side_item_contacts_icon} alt="vk"/>
                            </a>
                            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
                                <Telegram className={s.Contacts_right_side_item_contacts_icon} alt="telegram"/>
                            </a>
                        </div>
                        <div className={s.Contacts_right_side_item}>
                            <h4>{DRIVING_DIRECTIONS}</h4>
                            <ContactsMap/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.Contacts_feedback}/>
        </div>
    );
};

export default Contacts;