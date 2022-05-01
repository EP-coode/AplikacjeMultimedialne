import {
  Box,
  Fab,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import { AritclesService } from "../api/ArticlesService";
import { IRawArticle } from "../api/interfaces/IRawArticle";

export default function ArticleDetailsView() {
  const { id } = useParams();
  const [article, setArticle] = useState<IRawArticle>();
  const [isLoading, setIsLoading] = useState(false);

  async function loadArticle() {
    setIsLoading(true);
    if (id !== undefined) setArticle(await AritclesService.getArticleById(id));
    setIsLoading(false);
  }
  useEffect(() => {
    loadArticle();
  }, [id, setArticle, setIsLoading]);

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
              color="primary"
              aria-label="edit"
              sx={{ position: "fixed", bottom: "80px", right: "16px" }}
            >
              <EditIcon />
            </Fab>
          </Box>
        </>
      )}
    </Box>
  );
}
