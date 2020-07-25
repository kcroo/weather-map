export interface ForecastFiveDay {
    cod?: string;
    message?: number;
    cnt?: number;
    list?: ForecastDay[];
    city?: ForecastCity;
}

interface ForecastDay {
    dt?: number;
    main?: ForecastMain;
}

interface ForecastMain {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    grnd_level?: number;
    humidity: number;
    temp_kf: number;
}

interface ForecastCity {
    id?: number;
    name?: string;
    coord?: Coordinate;
    country?: string;
    timezone?: number;
    sunrise?: number;
    sunset?: number;
}

interface Coordinate {
    lat: number;
    long: number;
}
