import express from 'express'
const router = express.Router()
import Cliente from '../cliente/model/cliente.js'
import { Op } from 'sequelize'

// import postgres from 'pg'
// const { Pool } = postgres

// const pool = new Pool({
//     connectionString: 'postgres://pucminas:pucminas@localhost:5432/aula02'
// })

// router.get('/', async (req, res) => {
//     const con = await pool.connect();
//     const response = await con.query('select * from cliente')
//     const clientes = response.rows    
//     con.release()
//     return res.json(clientes)    
// })

// router.post('/cadastrar', async (req, res) => {
//     const { nome } = req.body
//     const con = await pool.connect()
//     const commandText = `insert into cliente (nome, "createdAt", "updatedAt") values ('${nome}', now(), now())`
//     await con.query(commandText)
//     const response = await con.query('select * from cliente')
//     const clientes = response.rows    
//     con.release()
//     return res.json(clientes)    
// })


// const sleep = timeout => new Promise(rersolve => {
//     setTimeout(() => {
//        rersolve()
//     }, timeout)
// })

router.get('/', async (req, res) => {
//    await sleep(5000)
    
    const filter = {}
    if (req.query?.nome) {
        const { nome } = req.query
        filter.where = {
            nome: { 
                [Op.iLike]: `%${nome}%` 
            }
        }
    }
    const clientes = await Cliente.findAll(filter)
    return res.json(clientes)
})

router.post('/', async (req, res) => {
    const cliente = await Cliente.create(req.body)
    return res.json(cliente)
})

router.put('/', async (req, res) => {
    const { id, nome } = req.body
    const cliente = await Cliente.findByPk(id)
    cliente.nome = nome
    await cliente.save()
    const clientes = await Cliente.findAll()
    return res.json(clientes)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const cliente = await Cliente.findByPk(id)
    if (cliente) await cliente.destroy()    
    res.end()
})

export default router