import { Box, Fab, Tooltip, Typography, CircularProgress } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import { AritclesService } from "../api/ArticlesService";
import FavouriteArticlesService from "../db/FavouriteArticlesService";
import ArticleNotes from "../components/ArticleNotes";
import { IRawArticle } from "../api/interfaces/IRawArticle";
import { IArticle } from "../db/Interfaces/IArticle";

export default function ArticleDetailsView() {
  const { id } = useParams();
  const [article, setArticle] = useState<IRawArticle>();
  const [isLoading, setIsLoading] = useState(false);
  const [isArticleNotesEditorOpened, setArticleNotesEditorOpened] =
    useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingFromIndexedDBDone, setIsLoadingDone] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  async function loadArticle() {
    setIsLoading(true);
    if (id !== undefined) {
      if (id == undefined) return;

      let article: IRawArticle | undefined =
        await FavouriteArticlesService.getArticle(parseInt(id));
      if (article == undefined) {
        article = await AritclesService.getArticleById(id);
      }

      setArticle(article);
    }
    setIsLoading(false);
  }
  async function checkIfItIsLiked() {
    if (id == undefined) return;

    const isLiked = await FavouriteArticlesService.containsArticle(
      parseInt(id)
    );
    setIsLiked(isLiked);
    setIsLoadingDone(true);
  }

  async function saveUpdatedArticle(article: IArticle) {
    await FavouriteArticlesService.updateArticle(article);
  }

  useEffect(() => {
    loadArticle();
  }, [id, setArticle, setIsLoading]);

  useEffect(() => {
    checkIfItIsLiked();
  }, [checkIfItIsLiked]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        minHeight: "100vh",
        pb: "50px",
      }}
    >
      {article && (
        <ArticleNotes
          article={article as IArticle}
          isOpen={isArticleNotesEditorOpened}
          onCloseCLick={() => setArticleNotesEditorOpened(false)}
          onSaveArticle={saveUpdatedArticle}
        />
      )}
      {isLoading ? (
        <Box position={"relative"} margin={"50vh auto"} width={"fit-content"}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              position: "relative",
              height: "35vh",
              width: "100%",
              backgroundImage: `url(${article?.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Tooltip title="News Site" placement="right" arrow>
              <Box
                sx={{
                  color: "text.primary",
                  position: "absolute",
                  bottom: "0px",
                  left: "2rem",
                  backgroundColor: grey[800],
                  p: "0.5rem",
                  pl: "1rem",
                  pr: "1rem",
                  borderRadius: "1rem",
                  transform: "translateY(50%)",
                  userSelect: "none",
                }}
              >
                {article?.newsSite}
              </Box>
            </Tooltip>
          </Box>
          <Box sx={{ p: "16px" }}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              sx={{ color: "text.primary", mt: "1rem" }}
            >
              {article?.title}
            </Typography>
            <Typography sx={{ color: "text.primary" }} paragraph>
              {article?.summary}
            </Typography>
            <Fab
              onClick={() => setArticleNotesEditorOpened(true)}
              color="primary"
              aria-label="edit"
              sx={{
                position: "fixed",
                bottom: "80px",
                right: "16px",
                display: isLiked ? "inline-flex" : "none",
              }}
            >
              <EditIcon />
            </Fab>
          </Box>
        </>
      )}
    </Box>
  );
}
