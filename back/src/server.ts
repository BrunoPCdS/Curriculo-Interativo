import express from 'express'
import cors from 'cors'
import videosRouter from './routes/videos'
import imagensRouter from './routes/imagens'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/videos', videosRouter)
app.use('/imagens', imagensRouter)




app.get('/', (req, res) => {
    res.send('API: Currículo -Bruno Corrêa')
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})
