export interface AuthorTypes {
  id: string;
  name: string;
  bio: string;
  birthDate: string | null;
  authorImage: string;
  books: [
    {
      id: string;
      title: string;
      descriptio: string;
      pages: number;
      year: number;
      status: string;
      bookImage: string;
      category: {
        name: string;
      };
    },
  ];
}
