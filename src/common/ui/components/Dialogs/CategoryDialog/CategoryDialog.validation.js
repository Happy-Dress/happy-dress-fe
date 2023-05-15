import { z } from 'zod';
import { VALIDATION_MESSAGES } from './CategoryDialog.dictionary';

const {
    MIN_3,
    CATEGORY_EXIST,
    LOAD_PHOTO_ERROR,
} = VALIDATION_MESSAGES;

export const isItemExist = (val, editingModel, settingsList) => {
    const existingItem = editingModel
        ? settingsList
            .filter((item) => item.name !== editingModel.name)
            .find((item2) => item2.name === val)
        : settingsList
            .find((item) => item.name === val);

    return (val === existingItem?.name);
};

export const validationSchema = (editingModel, settingsList) => {
    return z
        .object({
            name: z
                .string()
                .min(3, { message: MIN_3 })
                .refine((val) => {
                    return !isItemExist(val, editingModel, settingsList);
                }, { message: CATEGORY_EXIST }),
            description: z.string().min(3, { message: MIN_3 }),
            image: z
                .any()
                .refine((files) => editingModel ? true : files?.length > 0, LOAD_PHOTO_ERROR),
        });
};
