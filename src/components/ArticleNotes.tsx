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

import { FC, useState } from "react";
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
  const [notes, setNotes] = useState(article.notes);
  const handleArticleSave = () => {
    console.log(notes);
    onSaveArticle({ ...article, notes });
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
          <Button autoFocus color="inherit" onClick={handleArticleSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          height: "100%",
          alignItems: "center",
          p: 3,
        }}
      >
        <TextField
          multiline
          fullWidth
          sx={{ maxWidth: "800px" }}
          minRows={5}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter your note..."
          value={notes}
        />
      </Box>
    </Dialog>
  );
};

export default ArticleNotes;
