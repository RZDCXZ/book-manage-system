import axios from 'axios'
import {CreateBook} from "../components/CreateBookModal.tsx";
import {UpdateBook} from "../components/UpdateBookModal.tsx";

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 3000
})

export async function register(username: string, password: string) {
    return await instance.post('/user/register', {
        username,
        password
    })
}

export async function login(username: string, password: string) {
    return await instance.post('/user/login', {
        username, password
    });
}

export async function list(name: string) {
    const params = name ? {name} : {}
    return await instance.get('/book/list', {
        params
    });
}

export async function create(book: CreateBook) {
    return await instance.post('/book/create', {
        name: book.name,
        author: book.author,
        description: book.description,
        cover: book.cover
    });
}

export async function detail(id: number) {
    return await instance.get(`/book/${id}`);
}

export async function update(book: UpdateBook) {
    return await instance.put('/book/update', {
        id: book.id,
        name: book.name,
        author: book.author,
        description: book.description,
        cover: book.cover
    });
}

export async function deleteBook(id: number) {
    return await instance.delete(`/book/delete/${id}`);
}
