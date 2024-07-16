import React, { useCallback } from "react";

export const Togglers = ({ view, toggleView }) => {
    const radioHandler = useCallback((newView) => {
        toggleView(newView)
    }, [toggleView]);

    return (
        <fieldset className="togglers">
            <legend className="fieldset_text">Вид: </legend>
            <label className="label" htmlFor="list">
                <input 
                    type="radio" 
                    id="list" 
                    checked={view === "list"} 
                    onChange={() => radioHandler("list")}
                />
                Список
            </label>
            <label className="label" htmlFor="column">
                <input 
                    type="radio"
                    id="column"
                    checked={view === "column"}
                    onChange={() => radioHandler("column")}
                />
                Колонки
            </label>
        </fieldset>
    )
};