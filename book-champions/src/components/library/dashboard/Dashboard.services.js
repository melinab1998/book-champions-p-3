const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

export const getBooks = (onSuccess, onError) => {
    fetch("http://localhost:3000/books", {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        }
    })
    .then(async res => {
        if(!res.ok){
            const errData = await res.json();
            throw new Error (errData.message || "Algo ha salido mal");
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const addBook = (newBook, onSuccess, onError) => {
    fetch("http://localhost:3000/books", {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        },
        method: "POST",
        body: JSON.stringify(newBook)
    })
    .then(async res => {
        if(!res.ok){
            const errData = await res.json();
            throw new Error(errData.message || "Algo ha salido mal");
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError)
};


export const updateBook = (bookId, updatedBook, onSuccess, onError) => {
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
        },
        body: JSON.stringify(updatedBook)
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Algo ha salido mal");
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const loginUser = (email, password, onSuccess, onError) => {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Algo ha salido mal");
        }
        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const registerUser = (name, email, password, onSuccess, onError) => {
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Algo ha salido mal");
        }

        return res.json();
    })
    .then(onSuccess)
    .catch(onError);
};