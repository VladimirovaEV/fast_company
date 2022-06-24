import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        license: false
    });
    const { signUp } = useAuth();
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const [errors, setErrors] = useState({});
    const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
    const professionsList = professions.map(p => ({ label: p.name, value: p._id }));
    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label };
    //         }
    //     }
    // };
    // const getQualities = (elements) => {
    //     const qualitiesArray = [];
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 });
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
        // const { profession, qualities } = data;
        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // });
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={ data.email }
                onChange={ handleChange }
                error = {errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={ data.name }
                onChange={ handleChange }
                error = {errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={ data.password }
                onChange={ handleChange }
                error = {errors.password}
            />
            <SelectField
                label="Выберите вашу профессию"
                defaultOption = "Choose..."
                name="profession"
                options={professionsList}
                onChange={ handleChange }
                error = {errors.profession}
                value={data.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name= "sex"
                onChange={ handleChange }
                label="Выберите ваш пол"
            />
            <MultySelectField
                options={ qualitiesList }
                onChange={ handleChange }
                defaultValue={ data.qualities }
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField
                value={ data.license }
                onChange={ handleChange }
                name="license"
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
            >
                        Submit
            </button>
        </form>
    );
};

export default RegisterForm;
