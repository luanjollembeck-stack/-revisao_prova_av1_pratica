import { pool } from "../database/connnection.js"
import { Colchao } from "../types/colchao.js"

class ColchaoService {
    async getAll(): Promise<Colchao[]> {
        const res = await pool.query<Colchao>("SELECT * FROM colchao")
        return res.rows
    }
}

export const colchaoService = new ColchaoService()