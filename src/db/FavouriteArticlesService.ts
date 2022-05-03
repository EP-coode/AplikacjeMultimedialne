import { IArticle } from "./Interfaces/IArticle";
import { db } from "./db";
import { IndexableType } from "dexie";
import { IRawArticle } from "../api/interfaces/IRawArticle";
import { IDataSource } from "./Interfaces/IDataSource";

class FavouriteArticlesService {
  static async getArticles(
    skip: number,
    ammount: number,
    titleSearch = "",
    newsSite: string[] = []
  ): Promise<IArticle[]> {
    let resultCollection = await db.articles.toCollection();

    newsSite = newsSite.map((site) => site.toLowerCase());

    if (titleSearch.length > 0)
      resultCollection = resultCollection.and((item) =>
        item.title.toLowerCase().includes(titleSearch.toLowerCase())
      );

    if (newsSite.length > 0)
      resultCollection = resultCollection.and((item) =>
        newsSite.includes(item.newsSite.toLowerCase())
      );

    return resultCollection
      .offset(skip)
      .limit(ammount)
      .reverse()
      .sortBy("likeTimestamp");
  }

  static async getArticle(id: number): Promise<IArticle | undefined> {
    const result = await db.articles.get(id);
    return result;
  }

  static async getArticleSources(): Promise<IDataSource[]> {
    const uniqueDataSourceNames = await db.articles
      .orderBy("newsSite")
      .uniqueKeys();

    const dataSources: IDataSource[] = await Promise.all(
      uniqueDataSourceNames.map(async (dataSrcName) => {
        return {
          name: dataSrcName.toLocaleString(),
          articlesAmmout:
            await FavouriteArticlesService.getArticlesCountFromSource(
              dataSrcName.toLocaleString()
            ),
        };
      })
    );

    return dataSources;
  }

  private static async getArticlesCountFromSource(
    sourceName: string
  ): Promise<number> {
    return await db.articles.where("newsSite").equals(sourceName).count();
  }

  static async getArticleCount(): Promise<number> {
    return db.articles.count();
  }

  static async updateArticle(article: IArticle): Promise<number> {
    return db.articles.update(article.id, article);
  }

  static async containsArticle(id: number): Promise<boolean> {
    const result = await db.articles.get(id);
    return !!result;
  }
  static async addArticle(article: IRawArticle): Promise<IndexableType> {
    const newArticle: IArticle = {
      ...article,
      notes: "",
      tags: [],
      likeTimestamp: new Date().getTime(),
    };
    return db.articles.add(newArticle);
  }
  static async deleteArticle(id: number): Promise<void> {
    return db.articles.delete(id);
  }
}

export default FavouriteArticlesService;
