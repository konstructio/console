import { BaseHit } from 'instantsearch.js';

export interface Content extends BaseHit {
  categories: Array<string>;
  duration: number;
  id: string;
  imageUrl: string;
  likeCount: number;
  objectID: string;
  publishedAt: number;
  title: string;
  viewCount: number;
}
