import fs from "node:fs/promises"


const databasePath = new URL("db.json", import.meta.url)
export class Database {
    #database = {}
    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? []

        search = { title: search, description: search }
        for (const key in search) {
            if (!search[key]) {
                delete search[key]
            }

        }
        if (Object.keys(search).length >= 1) {
            data = data.filter(row =>
                Object.entries(search).some(([key, value]) =>
                    row[key].toLowerCase().includes(value.toLowerCase())
                )
            )
        }
        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
        this.#persist()
        return data
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
            return true
        }
        return false
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex > -1) {
            const row = this.#database[table][rowIndex]
            const updatedTask = { id, ...row, ...data }
            this.#database[table][rowIndex] = updatedTask
            this.#persist()
            return updatedTask
        }
        return false
    }
    retrieave(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex > -1) {
            return this.#database[table][rowIndex]
        }
        return false
    }
}