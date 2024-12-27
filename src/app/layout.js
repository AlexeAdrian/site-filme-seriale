"use client";
import React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import CssBaseline from "@mui/material/CssBaseline";

const clientSideEmotionCache = createEmotionCache() || {};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <CacheProvider value={clientSideEmotionCache}>
            <CssBaseline />
            {children}
          </CacheProvider>
        </body>
      </html>
    </>
  );
}
