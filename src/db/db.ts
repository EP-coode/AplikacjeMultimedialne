import Dexie, { Table } from "dexie";
import { IArticle } from "./Interfaces/IArticle";

export class ArticlesDatabase extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  articles!: Table<IArticle>;
  constructor() {
    super("myDatabase");
    this.version(2).stores({
      articles: "++id, title, newsSite", // Primary key and indexed props
    });
  }
}

export const db = new ArticlesDatabase();
