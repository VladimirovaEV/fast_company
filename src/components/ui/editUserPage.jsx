import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multiSelectField";

const EditUserPage = ({ edit }) => {
    const history = useHistory();
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    useEffect(() => {
        api.users.getById(edit).then((user) => setData({
            ...user,
            qualities: transformQual(user.qualities),
            profession: user.profession._id
        }));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const transformQual = (items) => {
        const newItems = Object.keys(items).map((item) => ({
            label: items[item].name,
            value: items[item]._id,
            color: items[item].color
        }));
        return newItems;
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        const tranformedData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        api.users.update(edit, tranformedData);
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
                    {/* {!isLoading && ( */}
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
                            options={professions}
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
                                options={qualities}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                                onChange={handleChange}
                            />
                        }
                        <button type="submit"
                            className="btn btn-primary w-100 mx-auto"
                        >
                                    Обновить
                        </button>
                    </form>
                    {/* )} */}
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    edit: PropTypes.string
};
export default EditUserPage;
