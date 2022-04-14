import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorder,
  Star as StarIcon,
} from "@mui/icons-material";
import { red, amber } from "@mui/material/colors";

import React from "react";

import { IArticle } from "../api/interfaces/IArticle";

export default function ArticleCard(props: { article: IArticle }) {
  const { title, imageUrl, url, featured } = props.article;

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
        <Box sx={{ position: "relative" }}>
          {featured && (
            <StarIcon
              fontSize="large"
              sx={{
                position: "absolute",
                color: amber[600],
                top: "10px",
                right: "10px",
              }}
            />
          )}
          <CardMedia component="img" height="200" image={imageUrl} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", marginTop: "auto" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteBorder sx={{ color: red[500] }} />
        </IconButton>
        <Button href={url} target={"_blank"}>
          Orginal Article
        </Button>
      </CardActions>
    </Card>
  );
}
