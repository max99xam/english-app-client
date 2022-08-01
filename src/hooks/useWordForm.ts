import React from 'react';
import {
    DropdownProps,
} from 'semantic-ui-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { IUserWordPayload, WordStudyStatus } from 'types/types';
import { postUserWord } from 'libs/user-words.api';
import { useUserWords } from 'hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { wordValidationSchema } from 'utils/form.schema';
import { IWordFormValues } from 'types/forms';
import { formDataToWordData } from 'utils/form-data.util';

const studyStatusOptions = [
    { key: WordStudyStatus.KNOW, value: WordStudyStatus.KNOW, text: WordStudyStatus.KNOW, label: { color: 'green', empty: true, circular: true } },
    { key: WordStudyStatus.LEARN, value: WordStudyStatus.LEARN, text: WordStudyStatus.LEARN, label: { color: 'yellow', empty: true, circular: true } },
    { key: WordStudyStatus.UNKNOWN, value: WordStudyStatus.UNKNOWN, text: WordStudyStatus.UNKNOWN, label: { color: 'red', empty: true, circular: true } },
];

const defaultFormValues: IWordFormValues = {
    word: '',
    transcription: '',
    translations: [{ translation: '' }],
    definitions: [{ definition: '' }],
    studyStatus: WordStudyStatus.UNKNOWN,
    usageExamples: [
        {
            sentence: '',
            translation: ''
        }
    ]
};

export const useWordForm = (formValues?: IWordFormValues) => {
    const { mutate: mutateUserWords } = useUserWords();


    // Form initialization with react-hook-form.
    const {
        handleSubmit,
        reset,
        register,
        control,
        trigger,
        formState: { errors },
    } = useForm<IWordFormValues>({
        defaultValues: formValues ? formValues : defaultFormValues,
        resolver: yupResolver(wordValidationSchema),
    });

    // react-hook-form arrays.
    const { fields: usageExamplesFields, append: appendUsageExample, remove: removeUsageExample } = useFieldArray({
        name: "usageExamples",
        control,
    });

    const { fields: translationsFields, append: appendTranslation, remove: removeTranslation } = useFieldArray({
        name: "translations",
        control
    });

    const { fields: definitionsFields, append: appendDefinition, remove: removeDefinition } = useFieldArray({
        name: "definitions",
        control
    });

    // Handlers.
    const [loadingPostWord, setLoadingPostWord] = React.useState(false);
    const onSubmit = async (data: IWordFormValues) => {
        try {
            setLoadingPostWord(true);

            const payload = formDataToWordData(data, studyStatus);

            await postUserWord(payload);

            mutateUserWords();

            reset();
        } catch (e) {

        }
        setLoadingPostWord(false);
    };

    // Study status dropdown.
    const [studyStatus, setStudyStatus] = React.useState<WordStudyStatus>(
        WordStudyStatus.UNKNOWN
    );
    const handleSelectStatusChange = (
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setStudyStatus(data.value as WordStudyStatus);
        trigger('studyStatus');
    };

    const handleReset = () => {
        reset();
    }

    return {
        Controller,
        handleSubmit,
        handleReset,
        onSubmit,
        control,
        errors,
        handleSelectStatusChange,
        studyStatus,
        definitionsFields,
        removeDefinition,
        translationsFields,
        removeTranslation,
        usageExamplesFields,
        removeUsageExample,
        register,
        loadingPostWord,
        appendUsageExample,
        appendTranslation,
        appendDefinition,
        studyStatusOptions,
    }
}