export interface LocationResult {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface CurrentWeather {
    temperature: number;
    weathercode: number;
    isDay: boolean;
    timezone: string;
    utcOffsetSeconds: number;
}

export async function geocodeCity(query: string): Promise<LocationResult[]> {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`
    );

    if (!res.ok) throw new Error("Geocoding request failed");

    const data = await res.json();

    if (!data.results) return [];

    return data.results.map((r: Pick<LocationResult, "name" | "country" | "latitude" | "longitude" | "timezone">) => ({
        name: r.name,
        country: r.country,
        latitude: r.latitude,
        longitude: r.longitude,
        timezone: r.timezone,
    }));
}

export async function getCurrentWeather(
    lat: number,
    lon: number
): Promise<CurrentWeather> {
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,is_day&timezone=auto`
    );

    if (!res.ok) throw new Error("Forecast request failed");

    const data = await res.json();

    return {
        temperature: data.current.temperature_2m,
        weathercode: data.current.weathercode,
        isDay: data.current.is_day === 1,
        timezone: data.timezone,
        utcOffsetSeconds: data.utc_offset_seconds,
    };
}