"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({ children, ...props }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}

// Wrap useTheme to provide a toggleTheme helper for compatibility if needed, 
// though standard usage matches next-themes (theme, setTheme)
export const useTheme = () => {
    const context = useNextTheme();
    // Add toggleTheme for backward compatibility just in case
    const toggleTheme = () => {
        context.setTheme(context.theme === 'dark' ? 'light' : 'dark');
    };
    return { ...context, toggleTheme };
};
