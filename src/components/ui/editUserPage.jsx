import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multiSelectField";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { getCurrentUserData } from "../../store/users";

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    const currentUser = useSelector(getCurrentUserData());
    // const { currentUser, updateUserData } = useAuth();
    const { updateUserData } = useAuth();
    const qualities = useSelector(getQualities());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
    const professionsList = professions.map(p => ({ label: p.name, value: p._id }));
    useEffect(() => {
        setIsLoading(true);
        if (!professionsLoading && !qualitiesLoading && currentUser) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
        if (currentUser._id) setIsLoading(false);
    }, [currentUser, qualitiesLoading, professionsLoading]);
    const transformData = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem === qualities[quality]._id) {
                    qualitiesArray.push({
                        value: qualities[quality]._id,
                        label: qualities[quality].name,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserData({
            ...data,
            qualities: data.qualities.map(qual => qual.value)
        });
    };
    const handleClick = () => {
        history.goBack();
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-primary" onClick={handleClick}>
                        <i className="bi bi-caret-left"></i> Назад
                    </button>
                </div>
                <div className="col-8">
                    {!isLoading && (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                value={ data.name }
                                name="name"
                                onChange={ handleChange }
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={ data.email }
                                onChange={ handleChange }
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption = "Choose..."
                                value={ data.profession}
                                options={professionsList}
                                name="profession"
                                onChange={ handleChange }
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name= "sex"
                                label="Выберите ваш пол"
                                onChange={ handleChange }
                            />
                            {
                                data.qualities.length > 0 && <MultySelectField
                                    defaultValue={data.qualities}
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                            }
                            <button type="submit"
                                className="btn btn-primary w-100 mx-auto"
                            >
                                        Обновить
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    edit: PropTypes.string
};
export default EditUserPage;
