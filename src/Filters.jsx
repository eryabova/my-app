import React from "react";

export const Filters = ({ filter, changeFilters }) => {

    return (
        <fieldset className="filters">
            <legend className="fieldset_text">Фильтры: </legend>
            <label className="label" htmlFor="all">
                <input 
                    type="radio" 
                    id="all" 
                    checked={filter === "all"}
                    onChange={() => changeFilters("all")}
                />
               Все
            </label>
            <label className="label" htmlFor="vertical">
                <input 
                    type="radio"
                    id="vertical"
                    checked={filter === "vertical"}
                    onChange={() => changeFilters("vertical")}
                />
                Вертикальные
            </label>
            <label className="label" htmlFor="horizontal">
                <input 
                    type="radio"
                    id="horizontal"
                    checked={filter === "horizontal"}
                    onChange={() => changeFilters("horizontal")}
                />
                Горизонтальные
            </label>
        </fieldset>
    )
};