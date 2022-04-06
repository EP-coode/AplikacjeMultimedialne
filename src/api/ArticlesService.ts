import { IArticle } from "./interfaces/IArticle";

export class AritclesService {
  static baseUrl: string = "https://api.spaceflightnewsapi.net/v3";

  static async getArticles(
    count: number = 3,
    skip: number = 0
  ): Promise<IArticle[]> {
    const result = await fetch(
      `${AritclesService.baseUrl}/articles?_limit=${count}&_start=${skip}`
    );
    const data = await result.json();
    return data;
  }
}
