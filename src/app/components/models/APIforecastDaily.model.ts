export interface ForecastDaily {
    lat?: number;
    lon?: number;
    timezone?: string;
    timezone_offset?: number;
    daily: DetailsDaily[];
}

interface DetailsDaily {
    dt?: number;
    sunrise?: number;
    sunset?: number;
    temp?: Temperature;
    feels_like?: FeelsLike;
    pressures?: number;
    humidity?: number;
    dew_point?: number;
    wind_speed?: number;
    wind_deg?: number;
    weather?: DetailsWeather;
    clouds?: string;
    pop?: number;
    rain?: number;
    uvi?: number;
}

interface Temperature {
    day?: number;
    min?: number;
    max?: number;
    night?: number;
    eve?: number;
    morn?: number;
}

interface FeelsLike {
    day?: number;
    night?: number;
    eve?: number;
    morn?: number;
}

interface DetailsWeather {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
}
