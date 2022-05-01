import { IRawArticle } from "./interfaces/IRawArticle";

export class AritclesService {
  static baseUrl = "https://api.spaceflightnewsapi.net/v3";

  static async getArticles(
    count = 3,
    skip = 0,
    title_filter = ""
  ): Promise<IRawArticle[]> {
    const result = await fetch(
      `${AritclesService.baseUrl}/articles?_limit=${count}&_start=${skip}&title_contains=${title_filter}`
    );
    const data = await result.json();
    return data;
  }

  static async getArticleById(id: string): Promise<IRawArticle> {
    const result = await fetch(`${AritclesService.baseUrl}/articles/${id}`);
    const data = await result.json();
    return data;
  }
}
