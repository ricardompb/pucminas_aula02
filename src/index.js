import express from 'express'
import clienteController from './cliente/clienteController.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/cliente', clienteController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})