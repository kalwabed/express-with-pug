import express, { Application, Request, Response, NextFunction } from 'express'
import person from './public/person.json'
import _ from 'underscore'
import path from 'path'

const app: Application = express()

app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: 'default', person })
})

app.get('/profile/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    const people = _.find(person, obj => obj.id === id)
    res.render('detail', {
        title: 'Person detail',
        people,
        hobi: people?.about.hobi,
    })
})

app.get('/docs', (req: Request, res: Response, next: NextFunction) => {
    res.render('documentation', { title: 'Documentation' })
})

app.listen(5000, () => console.log('Server running'))
