import { prisma } from "../../lib/prisma"
import { Router, type Request, type Response } from "express"
import { z } from "zod"

const router = Router()

const videoSchema = z.object({
    title: z.string(),
    url: z.string(),
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const videos = await prisma.video.findMany()
        res.json(videos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar vídeos" })
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const video = await prisma.video.findUnique({
            where: { id: Number(id) },
        })
        if (!video) {
            res.status(404).json({ error: "Vídeo não encontrado" })
            return
        }
        res.json(video)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao buscar vídeo" })
    }
})

router.post("/", async (req: Request, res: Response) => {
    const valida = videoSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ erro: valida.error })
        return
    }

    const { title, url } = valida.data

    try {
        const newVideo = await prisma.video.create({
            data: { title, url },
        })
        res.status(201).json(newVideo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao criar vídeo" })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedVideo = await prisma.video.delete({
            where: { id: Number(id) },
        })
        res.json(deletedVideo)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Erro ao deletar vídeo" })
    }
})

export default router