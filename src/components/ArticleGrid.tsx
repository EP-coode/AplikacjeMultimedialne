import { Grid } from "@mui/material";

import React from "react";

import { IRawArticle } from "../api/interfaces/IRawArticle";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid(props: { articles: IRawArticle[] }) {
  const { articles } = props;

  const articlesView = articles.map((article) => {
    return (
      <Grid item md={6} lg={4} key={article.id} sx={{ width: "100%" }}>
        <ArticleCard article={article} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {articlesView}
    </Grid>
  );
}
