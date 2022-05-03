import { IRawArticle } from "../../api/interfaces/IRawArticle";

export interface IArticle extends IRawArticle {
  likeTimestamp: number;
  notes: string;
  tags: string[];
}
