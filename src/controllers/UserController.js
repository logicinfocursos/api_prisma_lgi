import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {

            const { name, email, password, password_hash, type, status, created_by, updated_by } = req.body

            const _user = await prisma.user.findUnique({ where: { email } })

            if (_user) return res.json({ error: 'já existe um usuário com esse email!' })

            const user = await prisma.user.create(
                {
                    data: {
                        name,
                        email,
                        password,
                        password_hash,
                        type,
                        status,
                        created_by,
                        updated_by
                    }
                })

            return res.json(user)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async findAll(req, res) {

        try {
            const users = await prisma.user.findMany()

            const status = !users ? 500 : users.length > 0 ? 200 : 200

            const _return = {
                length: users.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: users,
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async find(req, res) {

        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({ where: { id: Number(id) } })
            const status = !user ? 400 : user && user.id ? 200 : 500

            const _return = {
                length: user ? 1 : 0,
                status: status,
                success: status === 200,
                data: user ? user : [],
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async update(req, res) {

        try {
            const { id } = req.params
            const { name, email, password, password_hash, type, status, created_by, updated_by } = req.body

            let user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: 'registro não encontrado!' })

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email, password, password_hash, type, status, created_by, updated_by },
            })

            return res.json(user)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async delete(req, res) {

        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: 'registro não encontrado!' })

            await prisma.user.delete({ where: { id: Number(id) } })

            return res.json({ message: 'registro deletado com sucesso!' })

        } catch (error) {

            return res.status(500).json({ error })
        }
    },
}