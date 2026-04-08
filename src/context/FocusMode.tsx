"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface FocusModeContextType {
    isFocused: boolean;
    enterFocus: () => void;
    exitFocus: () => void;
    toggleFocus: () => void;
}

const FocusModeContext = createContext<FocusModeContextType>({
    isFocused: false,
    enterFocus: () => {},
    exitFocus: () => {},
    toggleFocus: () => {},
});

export function FocusModeProvider({ children }: { children: React.ReactNode }) {
    const [isFocused, setIsFocused] = useState(false);

    const enterFocus = useCallback(() => setIsFocused(true), []);
    const exitFocus = useCallback(() => setIsFocused(false), []);
    const toggleFocus = useCallback(() => setIsFocused((f) => !f), []);

    return (
        <FocusModeContext.Provider value={{ isFocused, enterFocus, exitFocus, toggleFocus }}>
            {children}
        </FocusModeContext.Provider>
    );
}

export function useFocusMode() {
    return useContext(FocusModeContext);
}
