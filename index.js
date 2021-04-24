const http = require('http')
const fs = require('fs')
const formidable = require('formidable')

const server = http.createServer((req, res) => {
    if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
        const form = formidable({multiples: true})

        form.parse(req, (err, fields, files) => {
            const filesToRename = files.image_uploads

            if (!fs.existsSync(`${__dirname}/uploads`)) {
                fs.mkdirSync(`${__dirname}/uploads`)
            }

            for (const file of filesToRename) {
                fs.rename(file.path, `${__dirname}/uploads/${file.name}`, () => {
                })
            }

            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify({fields, files}, null, 2))
        })
    } else {
        res.writeHead(200, {'content-type': 'text/html'})
        fs.createReadStream('index.html').pipe(res)
    }
})

server.listen(3000)