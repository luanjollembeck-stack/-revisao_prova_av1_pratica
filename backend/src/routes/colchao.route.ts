import { Router, type Request, type Response } from "express"
import { colchaoService } from "../services/colchao.service"
import { criarColchao } from "../types/colchao"

export const colchaoRouter = Router()

colchaoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        const res = await colchaoService.getAll()
        return response.json(res)
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            error: "Erro Interno"
        })
    }
})

colchaoRouter.get("/:id", async (_request: Request<{ id: string }>, response: Response) => {
    const { id } = _request.params
    try {
        const res = await colchaoService.getById(id)
        return response.json(res)
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            error: "Erro Interno"
        })
    }
})

colchaoRouter.post("/", async (request: Request<{}, {}, criarColchao>, response: Response) => {
    try {
        const dados = request.body;
        const colchao = await colchaoService.create(dados);
        return response.status(201).json(colchao);
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            error: "Erro interno",
        });
    }
})

colchaoRouter.patch('/inativar/:id', async (request: Request<{id: string }>, response: Response) => {
    const { id } = request.params
    try {
        const res = await colchaoService.inativarColchao(id)
        return response.json(res)
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            error: "Erro Interno"
        })
    }
})