"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="paper"
            themes={["paper", "blueprint"]}
            enableSystem={false}
            disableTransitionOnChange={false}
        >
            {children}
        </NextThemesProvider>
    );
}
