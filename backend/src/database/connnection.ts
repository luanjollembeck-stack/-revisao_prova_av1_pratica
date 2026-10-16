import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

export const pool = new Pool()

pool.on("error", (error, _client) => {
    console.error(
        "Conexão iddle encontrada", error
    );

    process.exit(1)
})