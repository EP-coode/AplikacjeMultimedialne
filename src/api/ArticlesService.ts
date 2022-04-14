import { IArticle } from "./interfaces/IArticle";

export class AritclesService {
  static baseUrl = "https://api.spaceflightnewsapi.net/v3";

  static async getArticles(count = 3, skip = 0): Promise<IArticle[]> {
    const result = await fetch(
      `${AritclesService.baseUrl}/articles?_limit=${count}&_start=${skip}`
    );
    const data = await result.json();
    return data;
  }

  static async getArticleById(id: string): Promise<IArticle> {
    const result = await fetch(`${AritclesService.baseUrl}/articles/${id}`);
    const data = await result.json();
    return data;
  }
}
