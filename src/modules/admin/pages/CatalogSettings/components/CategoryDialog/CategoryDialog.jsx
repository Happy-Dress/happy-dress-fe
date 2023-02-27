import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../../common/ui/components/Modal';
import ModalHeader
    from '../../../../../../common/ui/components/Modal/components/ModalHeader/ModalHeader';
import ModalFooter
    from '../../../../../../common/ui/components/Modal/components/ModalFooter/ModalFooter';
import { ButtonAccent, ButtonDefault } from '../../../../../../common/ui/components';
import { CATEGORY_DICTIONARY } from './CategoryDialog.dictionary';
import s from './CategoryDialog.module.scss';
import ModalContent
    from '../../../../../../common/ui/components/Modal/components/ModalContent/ModalContent';
import { useForm } from 'react-hook-form';

const {
    SUBMIT_BUTTON,
    CANCEL_BUTTON,
    TITLE,
    MESSAGE_HEADER,
    MESSAGE_BODY
} = CATEGORY_DICTIONARY;

const emptyData = {
    name: '',
    description: '',
    img: '',
};

export const CategoryDialog = ({ onClose, onSubmit, title, categoryData }) => {
    const [data, setData] = useState(categoryData
        ? categoryData
        : emptyData
    );

    console.log('title CategoryDialog:', title);

    const { register, handleSubmit, watch, formState: { errors } }
        = useForm({
            defaultValues: {
                name: data?.name ? data?.name : 'n',
                description: data?.description ? data.description : 'd',
            }
        });

    const onSubmit1 = data => console.log(data);
    console.log(categoryData);

    const handleNameChange = () => {

    };

    const handleDescriptionChange = () => {

    };

    return (
        <Modal size="md">
            <form onSubmit={handleSubmit(onSubmit1)}>
                <div className={s.dialogWrapper}>
                    {/*<ModalHeader onClose={onClose} title={title} />*/}
                    <ModalHeader onClose={onClose} title={title} />
                    <ModalContent>
                        <input
                            className={s.dialogInput}
                            placeholder={'Название'}
                            {...register('name')}
                        />
                        <textarea
                            className={s.dialogDescription}
                            placeholder={'Описание'}
                            {...register('description')}
                        />
                        <div className={s.dialogImgLoader}>
                            <label
                                htmlFor="image"
                                className={s.buttonLink}
                            >
                                Загрузить фото
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                {...register('image')}
                            />
                        </div>
                        <div>img</div>
                    </ModalContent>
                    <div className={s.dialogFooter}>
                        <ModalFooter actionButtons={[
                            <ButtonDefault type="button" onClick={onClose} key={1} text={CANCEL_BUTTON} />,
                            <ButtonAccent type="submit" onClick={onSubmit} key={0} text={SUBMIT_BUTTON} />,
                        ]} />
                    </div>
                </div>
            </form>
        </Modal>
    );
};

const { string, func } = PropTypes;

CategoryDialog.propTypes = {
    onClose: func.isRequired,
    onSubmit: func.isRequired,
    title: string.isRequired,
    categoryData: {
        name: string,
        description: string,
        img: string,
    },
};

export default CategoryDialog;
