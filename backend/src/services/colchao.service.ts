import { pool } from "../database/connnection.js"
import { Colchao, criarColchao } from "../types/colchao.js"

class ColchaoService {
    async getAll(): Promise<Colchao[]> {
        const res = await pool.query<Colchao>("SELECT * FROM colchao")
        return res.rows
    }

    async getById(id: string): Promise<Colchao[]> {
        const res = await pool.query<Colchao>("SELECT * FROM colchao WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: criarColchao): Promise<Colchao> {
        const res = await pool.query<Colchao>(
            `INSERT INTO ortobom (tamanho, estrutura, densidade, maciez, certificacao,) VALUES ($1, $2, $3, $4) RETURNING *`,
            [dados.tamanho, dados.estrutura, dados.densidade, dados.maciez, dados.certificacao]
        );

        const colchao = res.rows[0];

        if (!colchao) {
            throw new Error("O banco não retornou o cliente cadastrado");
        }

        return colchao;
    }

    async inativarColchao(id: string): Promise<boolean> {
        const res = await pool.query(
            "UPDATE colchao SET status='inativo' WHERE id = $1",
            [id],
        );
        
        return (res.rowCount ?? 0) > 0;
    }
}
    export const colchaoService = new ColchaoService() 