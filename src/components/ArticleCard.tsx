import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Button,
} from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import React, { FC } from "react";
import { IArticle } from "../api/interfaces/IArticle";

export default function ArticleCard(props: { article: IArticle }) {
  const { id, title, imageUrl, url } = props.article;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", marginTop: "auto" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button href={url}>Orginal Article</Button>
      </CardActions>
    </Card>
  );
}
