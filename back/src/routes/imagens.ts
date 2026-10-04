import { prisma } from "../../lib/prisma"
import { Router, type Request, type Response } from "express"
import { z } from "zod"

const router = Router()


const imageSchema = z.object({
    title: z.string(),
    url: z.string(),
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const images = await prisma.imagem.findMany()
        res.json(images)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar imagens" })
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const image = await prisma.imagem.findUnique({
            where: { id: Number(id) },
        })
        if (!image) {
            res.status(404).json({ error: "Imagem não encontrada" })
            return
        }
        res.json(image)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar imagem" })
    }
})

router.post("/", async (req: Request, res: Response) => {
    const valida = imageSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ erro: valida.error })
        return
    }

    const { title, url } = valida.data

    try {
        const newImage = await prisma.imagem.create({
            data: { title, url },
        })
        res.status(201).json(newImage)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao criar imagem" })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedImage = await prisma.imagem.delete({
            where: { id: Number(id) },
        })
        res.json(deletedImage)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao deletar imagem" })
    }
})

export default router

