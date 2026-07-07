"use client";

import { useState, useCallback } from "react";
import { geocodeCity, getCurrentWeather, LocationResult, CurrentWeather } from "@/lib/open-meteo";
import { getLocalHour, getPeriod, Period } from "@/lib/period";

interface UseWeatherResult {
    location: LocationResult | null;
    weather: CurrentWeather | null;
    period: Period | null;
    loading: boolean;
    error: string | null;
    search: (city: string) => Promise<void>;
}

export function useWeather(): UseWeatherResult {
    const [location, setLocation] = useState<LocationResult | null>(null);
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [period, setPeriod] = useState<Period | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(async (city: string) => {
        setLoading(true);
        setError(null);

        try {
            const results = await geocodeCity(city);

            if (results.length === 0) {
                setError("City not found");
                setLocation(null);
                setWeather(null);
                setPeriod(null);
                return;
            }

            const match = results[0];
            const current = await getCurrentWeather(match.latitude, match.longitude);

            const localHour = getLocalHour(current.utcOffsetSeconds);
            const resolvedPeriod = getPeriod(current.isDay, localHour);

            setLocation(match);
            setWeather(current);
            setPeriod(resolvedPeriod);
        } catch {
            setError("Something went wrong fetching weather");
            setLocation(null);
            setWeather(null);
            setPeriod(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { location, weather, period, loading, error, search };
}