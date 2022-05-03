import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField,
  FormControlLabel,
  Checkbox,
  FormLabel,
  CircularProgress,
  Box,
} from "@mui/material";

import React, { FC, useEffect, useState } from "react";
import FavouriteArticlesService from "../db/FavouriteArticlesService";
import { IDataSource } from "../db/Interfaces/IDataSource";

export interface IArticleFilters {
  title: string;
  newsSite: string[];
}
interface ArticleFiltersProps {
  filters?: IArticleFilters;
  onFiltersChange: (filters: IArticleFilters) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleFiltersPopup: FC<ArticleFiltersProps> = ({
  onFiltersChange,
  isOpen,
  onClose,
  filters,
}) => {
  const [newsSites, setNewsSites] = useState<IDataSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSites, setSelectedSites] = useState<string[]>(
    filters ? filters.newsSite : []
  );
  const [titleSearch, setTitleSearch] = useState<string>(
    filters ? filters.title : ""
  );

  async function getDataSources() {
    setIsLoading(true);
    const dataSources = await FavouriteArticlesService.getArticleSources();
    console.log("ARTICLE SRC: ", dataSources);

    setNewsSites(dataSources);
    setIsLoading(false);
  }

  const articlesNewsSitesOptions = newsSites?.map((newsSite) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedSites.includes(newsSite.name)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedSites([...selectedSites, newsSite.name]);
              } else {
                setSelectedSites(
                  selectedSites.filter((site) => newsSite.name != site)
                );
              }
            }}
          />
        }
        label={`${newsSite.name} - ${newsSite.articlesAmmout} articles`}
        key={newsSite.name}
      />
    );
  });

  useEffect(() => {
    getDataSources();
  }, []);

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <DialogTitle id="responsive-dialog-title">
        {"Articles filtering"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Article title..."
          onChange={(e) => setTitleSearch(e.target.value)}
          value={titleSearch}
        />
        {isLoading ? (
          <Box
            sx={{
              width: "fit-content",
              m: "auto",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <FormLabel component="legend" sx={{ mt: 3 }}>
              Select news sites:{" "}
            </FormLabel>
            <FormGroup>{articlesNewsSitesOptions}</FormGroup>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={() => {
            onFiltersChange({
              title: titleSearch ?? "",
              newsSite: selectedSites,
            });
            onClose();
          }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleFiltersPopup;
