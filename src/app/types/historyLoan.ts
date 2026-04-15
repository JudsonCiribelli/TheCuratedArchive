export interface HistoryLoan {
  id: string;
  loanDate: string;
  returnDate: string | null;
  userId: string;
  bookId: string;
  book: {
    title: string;
    bookImage: string;
    status: string;
    author: {
      name: string;
    };
  };
}
