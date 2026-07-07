"use client";
import { useState } from "react";

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [location, setLocation] = useState<string>("")
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }
    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (location.trim()) {
            onSearch(location);
        }
        setLocation("");
    };
    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 w-[min(90vw,380px)]">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={location}
                    onChange={onChange}
                    placeholder="Search a city..."
                    className="
                    w-full px-5 py-3
                    rounded-full
                    bg-black/10 backdrop-blur-xl backdrop-saturate-150
                    border border-white/30
                    text-white placeholder-white/70
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]
                    font-body text-sm
                    outline-none
                    focus:bg-black/15 focus:border-white/50
                    transition-colors
                    "
                />
            </form>
        </div>
    );
}