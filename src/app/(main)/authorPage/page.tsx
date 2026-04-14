import { getAllAuthors } from "@/app/actions/get-authors";

import AuthorCard from "./_components/Author-Card-Component/Author-Card";
import AuthorData from "./_components/Author-Data-Component/Author-Data";

const AuthorPage = async () => {
  const authors = await getAllAuthors();

  return (
    <div className="flex flex-col">
      <AuthorCard authorCount={authors.length} />

      <div className="flex flex-col gap-4 xl:flex-row">
        {authors.map((author) => (
          <AuthorData
            id={author.id}
            key={author.id}
            name={author.name}
            bio={author.bio}
            authorImage={author.authorImage}
            quantityBook={author.books.length}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthorPage;
