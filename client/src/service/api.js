import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

const API = {
    async createTodoList(body) {
        const { data } = await instance.post("/todo-list", body);

        return data;
    },
    async getAllTodoLists() {
        const { data } = await instance.get("/todo-list");

        return data;
    },
    async deleteTodoList(id) {
        const { data } = await instance.delete(`/todo-list/${id}`);

        return data;
    },

    async createTask(body, todoListId) {
        const { data } = await instance.post(`/task/${todoListId}`, body);

        return data;
    },
    async getAllTasks(todoListId) {
        const { data } = await instance.get(`/tasks/${todoListId}`);

        return data;
    },
    async updateTask(body, id) {
        const { data } = await instance.put(`/task/${id}`, body);

        return data;
    },
    async deleteTask(id) {
        const { data } = await instance.delete(`/task/${id}`);

        return data;
    },
    async deleteTasks(todoListId) {
        const { data } = await instance.delete(`/tasks/${todoListId}`);

        return data;
    },
};

export default API;