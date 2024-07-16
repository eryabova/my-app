export const convertTemperature = (temp) => {
    const k = 273.15;
    return Math.round(temp - k) + "°";
}

export const makeIconPath = (icon) => {
    return `http://openweathermap.org/img/w/${icon}.png`;
}

export const filterArray = (array, filter) => {
    if (!filter || filter === "all") {
        return array;
    }

    if (filter === "vertical") {
        return array.filter((item) => item.width < item.height);
    }

    if (filter === "horizontal") {
        return array.filter((item) => item.width > item.height);
    }
}

const getDate = (dt, timezone) => {
    const utcSeconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utcMilliseconds = utcSeconds * 1000;
    const localDate = new Date(utcMilliseconds).toUTCString();
    return localDate;
  }

export const changeTheme = (weather) => {
    let theme = "dark";
    const dateSunrise = new Date(weather.sys.sunrise * 1000);
    const dateSunset = new Date(weather.sys.sunset * 1000);
    const sunrise = dateSunrise.getHours();
    const sunset = dateSunset.getHours();
    const currentDate = getDate(weather.dt, weather.timezone);
    const currentTime = currentDate.match(/\d\d:\d\d/)[0];
    const currentHours = currentTime.split(":")[0];
    const isDay = Number(currentHours) > Number(sunrise) && Number(currentHours) < Number(sunset);
    const isNight = Number(currentHours) > Number(sunrise) && Number(currentHours) > Number(sunset);
    if (isDay) {
        theme = "light"
    } else if (isNight) {
        theme = "dark"
    } else {
        theme = "twilight"
    }
    

    document.documentElement.setAttribute("theme", theme);
}