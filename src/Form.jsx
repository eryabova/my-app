import React, { useEffect, useRef, useState } from "react";
import { PhotoList } from "./PhotoList";
import { Weather } from "./Weather";
import { Togglers } from "./Togglers";
import { Filters } from "./Filters";
import { filterArray, changeTheme } from "./helpers";
import { credentials } from "./credentials";

export const Form = () => {
    const [photos, setPhotos] = useState({results: []});
    const [photosFiltered, setPhotosFiltered] = useState({results: []});
    const [currentWeather, setWeather] = useState({});
    const [error, setError] = useState("");
    const [viewType, setViewType] = useState("list");
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const inputRef = useRef(null);

    const searchPhoto = (queryString) => {
        fetch(`${credentials.SEARCH_PHOTO}?client_id=${credentials.ACCESS_KEY_UNSPLASH}&page=${page}&query=${queryString}`)
        .then((res) => res.json())
        .then((res) => {
            const newState = [
                ...photos?.results,
                ...res.results,
            ];
            setPhotos({results: newState})
        });
    }

    const getWeather = (geo) => {
        fetch(`${credentials.WEATHER}?lat=${geo.lat}&lon=${geo.lon}&appid=${credentials.ACCESS_KEY_WEATHER}`)
        .then((res) => res.json())
        .then((res) => setWeather(res));
    }

    const handleClick = () => {
        if (inputRef.current.value) {
            if (error) setError("");
            setPhotos({results: []});
            fetch(`${credentials.GEO}?q=${inputRef.current.value}&limit=5&appid=${credentials.ACCESS_KEY_WEATHER}`)
            .then((res) => res.json())
            .then((res) => {
                if (res[0]) {
                    const cityCoords = {lat: res[0]["lat"], lon: res[0]["lon"]};
                    getWeather(cityCoords)
                } else {
                    setError(`Ошибка поиска города "${inputRef.current.value}"`)
                }
            });
        } else {
            setError("Заполните поле");
        }
    };

    const loadMore = () => {
        setPage(page + 1);
        searchPhoto(inputRef.current.value);
    }

    useEffect(() => {
        if (currentWeather?.weather?.[0]) {
            searchPhoto(currentWeather?.weather?.[0].description);
            changeTheme(currentWeather);
        }
    }, [currentWeather]);

    useEffect(() => {
        if (photos?.results) {
            const newPhotos = filterArray(photos.results, filter);
            setPhotosFiltered({ results: newPhotos });
        }
    }, [filter, photos]);

    return (
        <>
            <Weather currentWeather={currentWeather} />
            <form className="form" action="/">
                <label className="label" htmlFor="query_value">Введите название города</label>
                <input
                    type="text"
                    className="input"
                    ref={inputRef}
                    placeholder="Например, Кострома"
                    id="query_value"
                />
                {error ? <em className="error">{error}</em> : null}
                <button type="button" className="button" onClick={handleClick}>Кнопка</button>
                <Togglers view={viewType} toggleView={(type) => setViewType(type || "list")} />
                <Filters filter={filter} changeFilters={(newFilter) => setFilter(newFilter)} />
            </form>
            <PhotoList data={photosFiltered?.results} listType={viewType} />
            {photosFiltered && Object.values(photosFiltered.results).length ?
                <button className="button" onClick={loadMore}>Загрузить ещё</button>
            : null}
        </>
    )
};