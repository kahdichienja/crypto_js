import { Router } from 'express'


export default ({ config, db }) => {
    let api = Router()
    api.get('/', async (req, res) =>
        res.json({
            success: true,
            count: 0,
            data: {
                "msg": "Add Document"
            }
        })
    )
    return api
}