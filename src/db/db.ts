import Dexie, { Table } from "dexie";
import { IArticle } from "../api/interfaces/IArticle";

export class ArticlesDatabase extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  articles!: Table<IArticle>;
  constructor() {
    super("myDatabase");
    this.version(1).stores({
      articles: "++id, title", // Primary key and indexed props
    });
  }
}

export const db = new ArticlesDatabase();
