import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {
            const { code, postId, postcode, type, image, author, authorcode, comment, reply, replyowner, replyownercode, status, created_by, updated_at } = req.body

            const _comment = await prisma.comment.create(
                {
                    data: {
                        code, postId, postcode, type, image, author, authorcode, comment, reply, replyowner, replyownercode, status, created_by, updated_at
                    }
                })

            return res.json(_comment)

        } catch (error) {

            return res.status(500).json({error})  
        }
    },



    async findAll(req, res){

        try {
            const comments = await prisma.comment.findMany()
          
            const status = !comments ? 500 : comments.length > 0 ? 200 : 200

            const _return = {
                length: comments.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: comments,                      
            }

            return res.status(status).json(_return)


        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },



    async find(req, res){

        try {
            const { id } = req.params

            const comment = await prisma.comment.findUnique({where : {id: Number(id)}})

            const status = !comment ? 400 : comment && comment.id ? 200 : 500
            
            const _return = {
                length: comment ? 1 : 0,
                status: status,
                success: status === 200,  
                data: comment ? comment : [],                     
            } 

            return res.status(status).json(_return)


        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },


    async update(req, res){

        try {
            const { id } = req.params
            const { code, postId, postcode, type, image, author, authorcode, comment, reply, replyowner, replyownercode, status, created_by, updated_at} = req.body

            let _comment = await prisma.comment.findUnique({where : {id: Number(id)}})

            if(!_comment) return res.json({ error: 'registro não encontrado!'})

            _comment = await prisma.comment.update({
                where: { id: Number(id)},
                data: { code, postId, postcode, type, image, author, authorcode, comment, reply, replyowner, replyownercode, status, created_by, updated_at },
            })
            
            return res.json(_comment)

        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },


    async delete(req, res){

        try {
            const { id } = req.params
            const comment = await prisma.comment.findUnique({where : {id: Number(id)}})

            if(!comment) return res.json({ error: 'registro não encontrado!'})

            await prisma.comment.delete({ where: { id:  Number(id)}})

            return res.json({ message: 'registro deletado com sucesso!'})

        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },
}