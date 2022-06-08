import { IndexableType } from "dexie";
import { IRawArticle } from "../api/interfaces/IRawArticle";
import { db } from "./db";
import FavouriteArticlesService from "./FavouriteArticlesService";
import { IArticle } from "./Interfaces/IArticle";

const generateArticle: () => IRawArticle = () => ({
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
});

beforeEach(async () => {
  await db.delete();
  await db.open();
});

test("saving and listing favourite article works", async () => {
  const article = generateArticle();
  await FavouriteArticlesService.addArticle(article);
  const articles = await FavouriteArticlesService.getArticles(1, 0);
  expect(articles.findIndex((a) => (a.id = article.id)) != -1).toBeTruthy();
});

test("article counting", async () => {
  const ARTICLES_COUNT = 12;
  for (let i = 0; i < ARTICLES_COUNT; i++) {
    await FavouriteArticlesService.addArticle(generateArticle());
  }
  const articlesCountResult = await FavouriteArticlesService.getArticleCount();

  expect(articlesCountResult == ARTICLES_COUNT).toBeTruthy();
});

test("updating article", async () => {
  const article = generateArticle();
  await FavouriteArticlesService.addArticle(article);

  const updatedArticle: IArticle = {
    ...article,
    notes: "",
    tags: [],
    likeTimestamp: 0,
  };
  updatedArticle.newsSite = "X news";
  await FavouriteArticlesService.updateArticle(updatedArticle);
  const returnedArticle = await FavouriteArticlesService.getArticle(article.id);
  expect(returnedArticle?.newsSite == updatedArticle.newsSite).toBeTruthy();
});

test("getting article sources count", async () => {
  const newsSiteCount = new Map<string, number>();
  newsSiteCount.set("NASA", 4);
  newsSiteCount.set("X news", 3);
  newsSiteCount.set("Musk", 1);

  newsSiteCount.forEach(async (articlesCount, newsSiteName) => {
    for (let i = 1; i < articlesCount; i++) {
      const article = generateArticle();
      article.newsSite = newsSiteName;
      await FavouriteArticlesService.addArticle(article);
    }
  });

  const result = await FavouriteArticlesService.getArticleSources();
  const cheks: boolean[] = [];
  for (const { name, articlesAmmout } of result) {
    cheks.push(newsSiteCount.get(name) == articlesAmmout);
  }

  expect.arrayContaining(cheks);
});

test("test article pagination", async () => {
  const ARTICLES_COUNT = 10;
  const ARTICLES_PER_PAGE = 7;
  for (let i = 0; i < ARTICLES_COUNT; i++) {
    await FavouriteArticlesService.addArticle(generateArticle());
  }
  const page1 = await FavouriteArticlesService.getArticles(
    ARTICLES_PER_PAGE,
    0
  );
  const page2 = await FavouriteArticlesService.getArticles(
    ARTICLES_PER_PAGE,
    ARTICLES_PER_PAGE * 1
  );
  const page3 = await FavouriteArticlesService.getArticles(
    ARTICLES_PER_PAGE,
    ARTICLES_PER_PAGE * 3
  );

  expect(page1.length == ARTICLES_PER_PAGE).toBeTruthy();
});
