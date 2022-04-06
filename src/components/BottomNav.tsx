import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  Favorite as FavouriteIcon,
  Search as SearchIcon,
  Public as PlanetIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BottomNav() {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Favourites"
          icon={<FavouriteIcon />}
          component={Link}
          value="/fav"
          to="/fav"
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          component={Link}
          value="/"
          to="/"
        />
        <BottomNavigationAction
          label="Planets"
          icon={<PlanetIcon />}
          component={Link}
          value="/planets"
          to="/planets"
        />
      </BottomNavigation>
    </Paper>
  );
}
