import { Router, type Request, type Response } from "express"
import { colchaoService } from "../services/colchao.service"

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