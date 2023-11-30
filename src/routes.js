import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';
import { searchCurrentDate } from './utils/search-current-date.js';


const database = new Database()

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (request, response) => {
            const { search } = request.query
            const users = database.select("tasks", search)
            console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${200}`)
            return response
                .end(JSON.stringify(users))
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: (request, response) => {
            const { description, title } = request.body
            if (!description) {
                console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${400}`)

                return response.writeHead(400).end(JSON.stringify({ message: "description is required!" }))
            }
            if (!title) {
                console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${400}`)
                return response.writeHead(400).end(JSON.stringify({ message: "title is required!" }))
            }

            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                created_at: searchCurrentDate(),
                updated_at: searchCurrentDate(),
                completed_at: null,
            }
            database.insert("tasks", task)
            console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${201}`)
            return response.writeHead(201).end(JSON.stringify(task))
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: (request, response) => {
            const { id } = request.params
            const deleted = database.delete("tasks", id)
            if (!deleted) {
                console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${404}`)
                message = { "message": "Task não encontrada na base de dados." }
                return response.writeHead(404).end(JSON.stringify(message))
            }
            console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${204}`)
            return response.writeHead(204).end()
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: (request, response) => {
            const { id } = request.params
            const { title, description } = request.body
            if (!title || !description) {
                console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${400}`)
                return response.writeHead(400).end(
                    JSON.stringify({ message: 'title or description are required' })
                )
            }

            const updateData = { title, description, updated_at: searchCurrentDate() }
            const updatedTask = database.update("tasks", id, updateData)
            if (!updatedTask) {
                console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${404}`)
                message = { "message": "Task não encontrada na base de dados." }
                return response.writeHead(404).end(JSON.stringify(message))
            }
            console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${202}`)

            return response.writeHead(202).end(JSON.stringify(updatedTask))
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (request, response) => {
            const { id } = request.params

            const task = database.retrieave("tasks", id)
            if (!task) {
                console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${404}`)
                message = { "message": "Task não encontrada na base de dados." }
                return response.writeHead(404).end(JSON.stringify(message))
            }

            const isCompleted = !!task["completed_at"]
            const completed_at = isCompleted ? null : searchCurrentDate()

            const updated_task = database.update("tasks", id, { completed_at })
            console.log(`[${searchCurrentDate()}] "${request.method} ${request.url}" ${202}`)
            return response.writeHead(202).end(JSON.stringify(updated_task))
        }
    },
]