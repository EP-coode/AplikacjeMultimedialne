import { IconButton, InputBase, Paper } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import React, { FC, useState } from "react";

interface SearchInputProps {
  onSearchClick: (searchText: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  onSearchClick,
}: SearchInputProps) => {
  const [searchText, setSearchText] = useState("");

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        position: "sticky",
        top: "8px",
        transition: "200ms",
        display: "flex",
        alignItems: "center",
        m: "0.7rem",
        zIndex: "2",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder="search for articles"
        inputProps={{ "aria-label": "search for articles" }}
        value={searchText}
        onChange={handleTextInput}
      />
      <IconButton
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => onSearchClick(searchText)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
