import React, { useEffect, useState } from 'react';
import s from './CategoryDialog.module.scss';
import Modal from '../../Modal';
import ModalHeader from '../../Modal/components/ModalHeader/ModalHeader';
import ModalFooter from '../../Modal/components/ModalFooter/ModalFooter';
import { ButtonAccent, ButtonDefault } from '../../Buttons';
import PropTypes from 'prop-types';
import { CATEGORY_DICTIONARY, VALIDATION_MESSAGES } from './CategoryDialog.dictionary';
import ModalContent from '../../Modal/components/ModalContent/ModalContent';
import { useForm } from 'react-hook-form';
import ProgressBar from '../../ProgressBar';
import cls from 'classnames';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import addImage from '../../../../api/addImage/addImage';
import { useToasters } from '../../../contexts/ToastersContext';

const {
    MIN_3,
    CATEGORY_EXIST,
    LOAD_PHOTO_ERROR,
} = VALIDATION_MESSAGES;

const validationSchema = (editingModel, settingsList) => {
    return z
        .object({
            name: z
                .string()
                .min(3, { message: MIN_3 })
                .refine((val) => {
                    const ExistingItem = editingModel
                        ? settingsList
                            .filter((item) => item.name !== editingModel.name)
                            .find((item2) => item2.name === val)
                        : settingsList
                            .find((item) => item.name === val);

                    return (val !== ExistingItem?.name);
                }, { message: CATEGORY_EXIST }),
            description: z.string().min(3, { message: MIN_3 }),
            image: z
                .any()
                .refine((files) =>  files?.length > 0, LOAD_PHOTO_ERROR),
        });
};

const {
    SUBMIT_BUTTON,
    CANCEL_BUTTON,
    TITLE_1,
    TITLE_2,
    LOAD_PHOTO,
    LOAD_ANOTHER_PHOTO,
    NAME_PLACEHOLDER,
    DESCRIPTION_PLACEHOLDER,
    ALT,
    SUCCESS_MESSAGE,
} = CATEGORY_DICTIONARY;

const emptyCategoryData = {
    id: null,
    name: '',
    description: '',
    imageUrl: '',
    orderNumber: null,
};

export const CategoryDialog = ({ onClose, updateSettings, settingsList, editingModel, setEditingModel,
}) => {
    const { showToasterSuccess, showToasterError } = useToasters();
    const [state, setState] = useState(editingModel ||  emptyCategoryData);

    const [completed, setCompleted] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        setCompleted(0);

        return () => {
            setState(emptyCategoryData);
        };
    }, [editingModel]);

    const { register, handleSubmit, formState: { errors } }
        = useForm({
            defaultValues: {
                name: state?.name || '',
                description: state?.description || '',
            },
            resolver: zodResolver(validationSchema(editingModel, settingsList)),
        });

    const onFormSubmit = (formData) => {
        editingModel
            ? updateSettings([
                ...settingsList.map((item) => {
                    return item.name === editingModel.name
                        ? {
                            ...item,
                            name: formData.name,
                            description:formData.description,
                            imageUrl: state.imageUrl,
                        }
                        : item;
                })
            ])
            : updateSettings([
                ...settingsList,
                {
                    name: formData.name,
                    description:formData.description,
                    imageUrl: state.imageUrl,
                    orderNumber: settingsList.length + 1,
                }
            ]);

        setState(emptyCategoryData);
        setEditingModel(null);
        onClose();
    };

    const handleSelectImg = async (e) => {
        setIsLoading(true);
        setCompleted(100);
        const res = await addImage(e.target.files[0])
            .then((r) => {
                if (r.uploadedImages.length) {
                    showToasterSuccess(SUCCESS_MESSAGE);
                }

                if (r.failedImages.length) {
                    showToasterError(r.failedImages[0].imageName + ' ' +
                    r.failedImages[0].reason.toString());
                }

                return r;
            })
            .catch((e) => {
                showToasterError(e.toString());
            });

        setTimeout(() => {
            if (res.uploadedImages.length) {
                setState((prev) => ({
                    ...prev,
                    imageUrl: res.uploadedImages[0].imageUrl,
                }));
            }

            setIsLoading(false);
            setCompleted(0);
        }, 1000);
    };

    const handleClose = () => {
        if(editingModel) {
            setEditingModel(null);
        }

        onClose();
    };

    return (
        <Modal size="md">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className={s.dialogWrapper}>
                    <ModalHeader
                        onClose={handleClose}
                        title={editingModel ? TITLE_2 : TITLE_1} />
                    <ModalContent>
                        <>
                            <input
                                className={cls(s.dialogInput, errors.name && s.dialogError)}
                                placeholder={NAME_PLACEHOLDER}
                                {...register('name', { required: true })}
                            />
                            {errors.name &&
                            <span className={s.dialogErrorMessage}>
                                {errors.name?.message}
                            </span>}
                            <textarea
                                className={cls(s.dialogDescription, errors.description && s.dialogError)}
                                placeholder={DESCRIPTION_PLACEHOLDER}
                                {...register('description', { required: true })}
                            />
                            {errors.description &&
                            <span className={s.dialogErrorMessage}>
                                {errors.description?.message}
                            </span>}
                            {state.imageUrl && (
                                <div className={s.dialogImg}>
                                    <img
                                        src={state.imageUrl}
                                        alt={ALT}
                                    />
                                </div>
                            )}
                            <div className={s.dialogImgLoader}>
                                {!isLoading && <label
                                    htmlFor="image"
                                    className={s.buttonLink}
                                >
                                    {state.imageUrl ? LOAD_ANOTHER_PHOTO : LOAD_PHOTO}
                                </label>}
                                {!isLoading && <input
                                    type="file"
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    {...register('image', { onChange: (e) => handleSelectImg(e) })}
                                />}
                                {(errors.image || state.imageUrl) &&
                                <span className={s.dialogErrorMessage}>
                                    {errors.image?.message}
                                </span>}
                                <div className={!isLoading ? s.visible : undefined}>
                                    <ProgressBar completed={completed} />
                                </div>
                            </div>
                        </>
                    </ModalContent>
                    <ModalFooter actionButtons={[
                        <ButtonDefault type="button" onClick={handleClose} key={1} text={CANCEL_BUTTON} />,
                        <ButtonAccent type="submit" key={0} text={SUBMIT_BUTTON} />,
                    ]} />
                </div>
            </form>
        </Modal>
    );
};

CategoryDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    settingsList: PropTypes.array.isRequired,
    editingModel: PropTypes.object,
    setEditingModel: PropTypes.func,
};

export default CategoryDialog;
