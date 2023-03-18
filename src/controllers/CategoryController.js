import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {
            const { code, coursecode, title, subtitle, authorcode, content, overview, order, status, created_by, updated_by } = req.body

            const category = await prisma.category.create(
                {
                    data: { code, coursecode, title, subtitle, authorcode, content, overview, order, status, created_by, updated_by }
                })

            return res.json(category)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async findAll(req, res) {

        try {
            const categories = await prisma.category.findMany()
            const status = !categories ? 500 : categories.length > 0 ? 200 : 200

            const _return = {
                length: categories.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: categories,
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async find(req, res) {

        try {
            const { id } = req.params

            const category = await prisma.category.findUnique({ where: { id: Number(id) } })

            const status = !category ? 400 : category && category.id ? 200 : 500

            const _return = {
                length: category ? 1 : 0,
                status: status,
                success: status === 200,
                data: category ? category : [],
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async update(req, res) {

        try {
            const { id } = req.params
            const { code, coursecode, title, subtitle, authorcode, content, overview, order, status, created_by, updated_by } = req.body

            let category = await prisma.category.findUnique({ where: { id: Number(id) } })

            if (!category) return res.json({ error: 'registro não encontrado!' })

            category = await prisma.category.update({
                where: { id: Number(id) },
                data: { code, coursecode, title, subtitle, authorcode, content, overview, order, status, created_by, updated_by },
            })

            return res.json(category)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },


    async delete(req, res) {

        try {
            const { id } = req.params
            const category = await prisma.category.findUnique({ where: { id: Number(id) } })

            if (!category) return res.json({ error: 'registro não encontrado!' })

            await prisma.category.delete({ where: { id: Number(id) } })

            return res.json({ message: 'registro deletado com sucesso!' })

        } catch (error) {

            return res.status(500).json({ error })
        }
    },
}