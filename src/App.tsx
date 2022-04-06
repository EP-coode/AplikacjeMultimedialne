import React, { useMemo, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HomeView from "./views/HomeView";
import FavouritesView from "./views/FavouritesView";
import BottomNav from "./components/BottomNav";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import PlanetsView from "./views/PlanetsView";

export default function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/fav" element={<FavouritesView />} />
          <Route path="/planets" element={<PlanetsView />} />
        </Routes>
        <BottomNav />
      </ThemeProvider>
    </BrowserRouter>
  );
}
