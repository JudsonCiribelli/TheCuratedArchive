export interface AuthorBooksType {
  id: string;
  title: string;
  description: string;
  pages: number;
  year: number;
  bookImage: string;
  status: string;
  authorId: string;
  categoryId: string;
  category: {
    name: string;
    id: string;
  };
}
