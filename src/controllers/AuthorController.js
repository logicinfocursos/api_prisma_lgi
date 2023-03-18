import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {
            const { name, code, slug, status, created_by, updated_by } = req.body

            const author = await prisma.author.create(
                {
                    data: {
                        name, code, slug, status, created_by, updated_by
                    }
                })

            return res.json(author)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async findAll(req, res) {

        try {
            const authors = await prisma.author.findMany()

            const status = !authors ? 500 : authors.length > 0 ? 200 : 200

            const _return = {
                length: authors.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: authors,
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async find(req, res) {

        try {
            const { id } = req.params

            const author = await prisma.author.findUnique({ where: { id: Number(id) } })
            const status = !author ? 400 : author && author.id ? 200 : 500

            const _return = {
                length: author ? 1 : 0,
                status: status,
                success: status === 200,
                data: author ? author : [],
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },


    async update(req, res) {

        try {
            const { id } = req.params
            const { name, code, slug, status, created_by, updated_by } = req.body

            let author = await prisma.author.findUnique({ where: { id: Number(id) } })

            if (!author) return res.json({ error: 'registro não encontrado!' })

            author = await prisma.author.update({
                where: { id: Number(id) },
                data: { name, code, slug, status, created_by, updated_by },
            })

            return res.json(author)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },


    async delete(req, res) {

        try {
            const { id } = req.params
            const author = await prisma.author.findUnique({ where: { id: Number(id) } })

            if (!author) return res.json({ error: 'registro não encontrado!' })

            await prisma.author.delete({ where: { id: Number(id) } })

            return res.json({ message: 'registro deletado com sucesso!' })

        } catch (error) {

            return res.status(500).json({ error })
        }
    },
}