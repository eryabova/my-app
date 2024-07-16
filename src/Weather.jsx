import React from "react";
import { convertTemperature, makeIconPath } from "./helpers";

export const Weather = ({ currentWeather }) => {
    const {
        name = "",
        main = {},
        weather = {},
    } = currentWeather;

    return (
        <>
            {Object.values(main).length ?
            (
                <section className="weather">
                    <div className="weather_icon">
                        <img src={makeIconPath(weather?.[0]?.icon)} alt={weather?.[0]?.description || "weather vidget"} />
                    </div>
                    <p className="weather_city">{name}</p>
                    <span className="weather_temperature">{convertTemperature(main.temp)}</span>
                </section>
            ) : null
            }
        </>
    )
};