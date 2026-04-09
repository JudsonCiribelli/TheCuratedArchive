export interface BookTypes {
  id: string;
  title: string;
  description: string;
  pages: number;
  year: number;
  bookImage: string;
  status: string;
  authorId: string;
  author: {
    name: string;
    id: string;
  };
  categoryId: string;
}
