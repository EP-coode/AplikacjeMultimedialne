import { Grid } from "@mui/material";

import React from "react";

import { IArticle } from "../api/interfaces/IArticle";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid(props: { articles: IArticle[] }) {
  const { articles } = props;

  const articlesView = articles.map((article) => (
    <Grid item md={6} lg={4} key={article.id} sx={{ width: "100%" }}>
      <ArticleCard article={article} />
    </Grid>
  ));
  
  return (
    <Grid container spacing={2}>
      {articlesView}
    </Grid>
  );
}
