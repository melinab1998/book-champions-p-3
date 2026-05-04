import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/bookSearch";
import { useState } from "react";

const Books = ({ books, onDeleteBook }) => {

    const [search, setSearch] = useState("");

    const handleSearch = (value) => {
        setSearch(value);
    }

    return (
        <>
            <BookSearch onSearch={handleSearch} />
            <div className="d-flex justify-content-center flex-wrap">

                {
                    books
                        .filter(book =>
                            book.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(book => (
                            <BookItem
                                key={book.id}
                                id={book.id}  
                                title={book.title}
                                author={book.author}
                                rating={book.rating}
                                pageCount={book.pageCount}
                                imageUrl={book.imageUrl}
                                available={book.available}
                                summary={book.summary}
                                onDelete={() => onDeleteBook(book.id)}   
                            />
                        ))
                }

            </div>
        </>

    );
};

export default Books;