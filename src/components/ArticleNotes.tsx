import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { FC } from "react";
import { IArticle } from "../db/Interfaces/IArticle";

import React from "react";

interface ArticleNotesProps {
  article: IArticle;
  isOpen: boolean;
  onCloseCLick: () => void;
  onSaveArticle: (updatedArticle: IArticle) => void;
}

const ArticleNotes: FC<ArticleNotesProps> = ({
  article,
  isOpen,
  onCloseCLick,
  onSaveArticle,
}) => {
  const handleArticleSave = () => {
    console.log("SAVING");
  };

  return (
    <Dialog open={isOpen} onClose={onCloseCLick} fullScreen>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCloseCLick}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Your notes
          </Typography>
          <Button autoFocus color="inherit" onClick={onCloseCLick}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          multiline
          fullWidth
          sx={{ maxWidth: "600px", m: 3 }}
          minRows={5}
        >
          {article.notes}
        </TextField>
      </Box>
    </Dialog>
  );
};

export default ArticleNotes;
