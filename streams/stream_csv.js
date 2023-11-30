import { parse } from "csv-parse"
import fs from "node:fs"
import { Transform } from "node:stream"



function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

class CsvToJsonTransform extends Transform {
    constructor() {
        super({ objectMode: true })
    }

    _transform(chunk, encoding, callback) {
        const [title, description] = chunk
        if (title !== undefined && description !== undefined) {
            const jsonString = JSON.stringify({ title, description }) + "\n"
            this.push(jsonString)
        }
        callback()
    }
}

async function create_task(data) {
    const request = await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    })
        .then(response => {
            console.log(response.status)
            return response.json()
        })
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => console.log(error))
}



async function read_csv() {
    const csvPath = new URL("./task.csv", import.meta.url)
    const stream = fs.createReadStream(csvPath)
    const csvParse = parse({ delimiter: ",", skipEmptyLines: true, fromLine: 2 })
    const csvToJsonTransform = new CsvToJsonTransform()
    const rowsParse = stream.pipe(csvParse).pipe(csvToJsonTransform)
    for await (const data of rowsParse) {
        await create_task(data)
        await wait(1500)
    }
}



read_csv()