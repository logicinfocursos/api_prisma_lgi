import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {
            const { code, postId, ownercode, ownertype, type, filetype, filename, local, url, status, image, title, subtitle, overview, order, created_by, updated_by } = req.body

            const media = await prisma.media.create(
                {
                    data: {
                        code, postId, ownercode, ownertype, type, filetype, filename, local, url, status, image, title, subtitle, overview, order, created_by, updated_by
                    }
                })

            return res.json(media)

        } catch (error) {

            return res.status(500).json({error})  
        }
    },



    async findAll(req, res){

        try {
            const medias = await prisma.media.findMany()
            
            const status = !medias ? 500 : medias.length > 0 ? 200 : 200

            const _return = {
                length: medias.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: medias,                      
            }

            return res.status(status).json(_return)

        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },



    async find(req, res){

        try {
            const { id } = req.params

            const media = await prisma.media.findUnique({where : {id: Number(id)}})
            const status = !media ? 400 : media && media.id ? 200 : 500
            
            const _return = {
                length: media ? 1 : 0,
                status: status,
                success: status === 200,  
                data: media ? media : [],                     
            } 

            return res.status(status).json(_return)


        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },


    async update(req, res){

        try {
            const { id } = req.params
            const { code, postId, ownercode, ownertype, type, filetype, filename, local, url, status, image, title, subtitle, overview, order, created_by, updated_by } = req.body

            const _media = await prisma.media.findUnique({where : {id: Number(id)}})

            if(!_media) return res.json({ error: 'registro não encontrado!'})

            const media = await prisma.media.update({
                where: { id: Number(id)},
                data: { code, postId, ownercode, ownertype, type, filetype, filename, local, url, status, image, title, subtitle, overview, order, created_by, updated_by },
            })
            
            return res.json(media)

        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },


    async delete(req, res){

        try {
            const { id } = req.params
            const media = await prisma.media.findUnique({where : {id: Number(id)}})

            if(!media) return res.json({ error: 'registro não encontrado!'})

            await prisma.media.delete({ where: { id:  Number(id)}})

            return res.json({ message: 'registro deletado com sucesso!'})

        } catch (error) {
            
            return res.status(500).json({error})  
        }
    },
}