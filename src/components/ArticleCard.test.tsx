import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ArticleCard from "./ArticleCard";
import { IRawArticle } from "../api/interfaces/IRawArticle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const article: IRawArticle = {
  id: new Date().getTime(),
  events: [],
  featured: true,
  imageUrl: "https://via.placeholder.com/300.png/09f/fff",
  newsSite: "NASA",
  launches: [],
  title: "Article title",
  publishedAt: new Date().toISOString(),
  summary:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  url: "localhost",
  updatedAt: new Date().toISOString(),
};

test("article card renders", () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ArticleCard article={article} />} />
      </Routes>
    </BrowserRouter>
  );
  const articleTitle = screen.getByText(article.title);
  const newsSite = screen.getByText(article.newsSite);
  expect(articleTitle).toBeInTheDocument();
  expect(newsSite).toBeInTheDocument();
});

jest.setTimeout(30000);

test("like article card btn works", async () => {
  const { getByTestId, getByLabelText, findByTestId } = render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ArticleCard article={article} />} />
      </Routes>
    </BrowserRouter>
  );
  expect(getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
  await findByTestId("loadingFromLocalDb");
  userEvent.click(getByLabelText("add to favorites"));
  expect(getByTestId("FavoriteIcon")).toBeInTheDocument();
});