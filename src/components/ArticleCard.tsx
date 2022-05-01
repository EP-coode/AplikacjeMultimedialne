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
  Skeleton,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  Star as StarIcon,
} from "@mui/icons-material";
import { red, amber } from "@mui/material/colors";

import React, { useEffect, useState } from "react";

import { IRawArticle } from "../api/interfaces/IRawArticle";
import {IArticle} from "../db/Interfaces/IArticle";
import { useNavigate } from "react-router";
import FavouriteArticlesService from "../db/FavouriteArticlesService";

export default function ArticleCard(props: { article: IRawArticle }) {
  const { title, imageUrl, url, featured, id } = props.article;
  const [isImageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const [loadingFromIndexedDBDone, setIsLoadingDone] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    if (!loadingFromIndexedDBDone) {
      return;
    }
    if (!isLiked) {
      const article: IArticle = {...props.article, tags: [], notes: ""}
      FavouriteArticlesService.addArticle(article);
      setIsLiked(true);
    } else {
      FavouriteArticlesService.deleteArticle(props.article.id);
      setIsLiked(false);
    }
  }

  async function checkIfItIsLiked() {
    console.log("YEE");

    const isLiked = await FavouriteArticlesService.containsArticle(id);
    setIsLiked(isLiked);
    setIsLoadingDone(true);
  }

  useEffect(() => {
    checkIfItIsLiked();
  }, []);

  // temporary - this logic shloud be handled elswere

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <CardActionArea onClick={() => navigate(`/article/${id}`)}>
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

          {isImageLoading && (
            <Skeleton
              variant="rectangular"
              width={"auto"}
              height={200}
              animation="wave"
            />
          )}

          <CardMedia
            onLoad={() => setImageLoading(false)}
            component="img"
            height="200"
            image={imageUrl}
            sx={{ display: isImageLoading ? "none" : "bolck" }}
          />
        </Box>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ color: "text.primary" }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", marginTop: "auto" }}>
        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
          {isLiked ? (
            <Favorite sx={{ color: red[500] }} />
          ) : (
            <FavoriteBorder sx={{ color: red[500] }} />
          )}
        </IconButton>
        <Button href={url} target={"_blank"}>
          Orginal Article
        </Button>
      </CardActions>
    </Card>
  );
}
