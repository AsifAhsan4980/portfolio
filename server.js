import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt('3000', 10)
const dev = true
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port)

    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? 'production' : 'production'
        }`
    )
})