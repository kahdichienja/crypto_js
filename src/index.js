import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import axios from 'axios'
import config from './config'
import routes from './routes'
import path from 'path'

let app = express()

app.server = http.createServer(app)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, '/views/static')))

// middleware
app.use(morgan("dev"))
// parse application/json
app.use(bodyParser.json({
    limit: config.bodyLimit
}))
// passport config
// api routes v1
app.use('/v1', routes)

app.get('/', async (req, res) => res.render('../views/index'));

app.get('/add_block_doc', async (req, res) => {
    let data1 = []

    let data = await axios('http://127.0.0.1:8080/v1/test/')
    .then((res)=> data1 = res.data)
    .catch((err)=> err.data)

    res.render('../views/pages/addBlock', {
        data: data1
    });
})


app.get('/dashboard', async (req, res) => {
    res.render('../views/pages/dashboard');
})

app.server.listen(config.port)

console.log(`Server Started On Port ${app.server.address().port}`)

export default app