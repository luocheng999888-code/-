export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  lastModified: string;
}

export type ViewState = 'list' | 'editor';