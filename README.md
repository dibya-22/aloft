# Aloft

A full-screen weather app that shows the current weather of any city as a
living scene instead of a card with an icon — sky color, sun/moon position,
clouds, rain/snow, and ambient characters all animate based on the real time
of day and weather at that location.

## What it does

- Search any city
- Fetches real current weather (temperature, condition, day/night) from Open-Meteo
- Renders it as an animated scene:
  - Sky shifts through day, night, sunrise, and sunset tones
  - Sun or moon animates into position based on the actual local time
  - Clouds, rain, snow, fog, or thunderstorms animate depending on conditions
  - A small ground scene (grass, characters) reacts to the weather too
- Switching cities feels like watching time and weather actually change,
  not just swapping an icon

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Motion (Framer Motion) for all animation
- Open-Meteo API 

## Status

Early build — currently working through: search + live data, background
per time-of-day, sun/moon positioning, then layering in clouds, precipitation,
and ground characters.
