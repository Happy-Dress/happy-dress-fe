import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import Modal from '../../Modal';
import ModalHeader from '../../Modal/components/ModalHeader/ModalHeader';
import PropTypes from 'prop-types';
import ModalContent from '../../Modal/components/ModalContent/ModalContent';
import ModalFooter from '../../Modal/components/ModalFooter/ModalFooter';
import { ButtonAccent, ButtonDefault } from '../../Buttons';
import { SUBMIT_ORDER_DIALOG_DICTIONARY } from './SubmitOrderDialogDictionary';
import s from './SubmitOrderDialog.module.scss';
import validator from 'validator';


const {
    CANCEL_BUTTON,
    CHECKOUT_ORDER,
    SUBMIT_BUTTON,
    NAME_IS_REQUIRED,
    COMMENT_IS_REQUIRED,
    PHONE_IS_REQUIRED,
    INVAlID_PHONE
} = SUBMIT_ORDER_DIALOG_DICTIONARY;

const orderSchema = z.object({
    name: z.string({ required_error: NAME_IS_REQUIRED }).min(1, { message: NAME_IS_REQUIRED }),
    phone: z.string({ required_error: PHONE_IS_REQUIRED }).refine(validator.isMobilePhone, { message: INVAlID_PHONE }),
    comment: z.string({ required_error: COMMENT_IS_REQUIRED }).min(1, { message: COMMENT_IS_REQUIRED }),
});



const SubmitOrderDialog = ({
    onClose, onSubmit
}) => {



    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(orderSchema),
    });

    return (
        <Modal size={'sm'}>
            <ModalHeader onClose={onClose} title={CHECKOUT_ORDER}/>
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)} className={s.SubmitOrderDialog}>
                    <div className={s.SubmitOrderDialog_field}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <input
                                placeholder="Введите имя"
                                {...field}
                            />}
                        />
                        {errors.name && <p className={s.SubmitOrderDialog_field_error}>{errors.name.message}</p>}
                    </div>
                    <div className={s.SubmitOrderDialog_field}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <input
                                placeholder="Введите телефон"
                                type={'tel'}
                                pattern="^\+375\d{9}$"
                                {...field}
                            />}
                        />
                        {errors.phone && <p className={s.SubmitOrderDialog_field_error}>{errors.phone.message}</p>}
                    </div>
                    <div className={s.SubmitOrderDialog_field}>
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => <input
                                placeholder="Комментарий"
                                {...field}
                            />}
                        />
                        {errors.comment && <p className={s.SubmitOrderDialog_field_error}>{errors.comment.message}</p>}
                    </div>
                </form>
            </ModalContent>
            <ModalFooter actionButtons={[
                <ButtonDefault onClick={onClose} key={1} text={CANCEL_BUTTON} />,
                <ButtonAccent onClick={handleSubmit(onSubmit)} key={0} type={'submit'} text={SUBMIT_BUTTON}/>,
            ]}/>
        </Modal>
    );
};

SubmitOrderDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SubmitOrderDialog;