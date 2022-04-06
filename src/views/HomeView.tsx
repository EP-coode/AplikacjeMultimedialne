import React, { useEffect, useState } from "react";

import { Grid, Box, CircularProgress } from "@mui/material";

import { IArticle } from "../api/interfaces/IArticle";
import ArticleCard from "../components/ArticleCard";
import { AritclesService } from "../api/ArticlesService";

export default function HomeView() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadArticles() {
    setIsLoading(true);
    setArticles(await AritclesService.getArticles(10, 0));
    setIsLoading(false);
  }

  useEffect(() => {
    loadArticles();
  }, [setArticles, setIsLoading]);

  const articlesView = articles.map((article) => (
    <Grid item md={6} lg={4} key={article.id} sx={{ width: "100%" }}>
      <ArticleCard article={article} />
    </Grid>
  ));

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        minHeight: "100vh",
        padding: "8px",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {articlesView}
        </Grid>
      )}
    </Box>
  );
}
