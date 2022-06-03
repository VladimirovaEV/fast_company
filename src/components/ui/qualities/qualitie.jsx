import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { getQuality } = useQualities();
    const qual = getQuality(id);
    return (
        <span className={"badge m-1 bg-" + qual.color}>
            {qual.name}
        </span>
    );
};

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string
};
export default Qualitie;
