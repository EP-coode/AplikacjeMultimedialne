import { IArticle } from "./Interfaces/IArticle";
import { db } from "./db";
import { IndexableType } from "dexie";

class FavouriteArticlesService {
  static async getArticles(skip: number, ammount: number): Promise<IArticle[]> {
    return await db.articles.offset(skip).limit(ammount).toArray();
  }
  static async getArticle(id: number): Promise<IArticle | undefined> {
    const result = await db.articles.get(id);
    return result;
  }

  static async getArticleCount(): Promise<number> {
    return db.articles.count();
  }

  static async containsArticle(id: number): Promise<boolean> {
    const result = await db.articles.get(id);
    return !!result;
  }
  static async addArticle(article: IArticle): Promise<IndexableType> {
    return db.articles.add(article);
  }
  static async deleteArticle(id: number): Promise<void> {
    return db.articles.delete(id);
  }
}

export default FavouriteArticlesService;
