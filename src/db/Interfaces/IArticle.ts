import { IRawArticle } from "../../api/interfaces/IRawArticle";

export interface IArticle extends IRawArticle {
  notes: string;
  tags: string[];
}
