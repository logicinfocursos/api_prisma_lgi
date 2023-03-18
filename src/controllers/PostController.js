import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {
            const {
                code,
                usercode,
                authorcode,
                categorycode,
                title,
                slug,
                subtitle,
                tags,
                obs,
                content,
                text,
                overview,
                summary,
                additionaltext,
                pdf,
                pdftext,
                url,
                urltext,
                video,
                videotitle,
                videotext,
                level,
                strip,
                type,
                group,
                access,
                readyClasses,
                featureimage,
                order,
                status,
                created_by,
                updated_by,
            } = req.body

            const post = await prisma.post.create(
                {
                    data: {
                        code,
                        usercode,
                        authorcode,
                        categorycode,
                        title,
                        slug,
                        subtitle,
                        tags,
                        obs,
                        content,
                        text,
                        overview,
                        summary,
                        additionaltext,
                        pdf,
                        pdftext,
                        url,
                        urltext,
                        video,
                        videotitle,
                        videotext,
                        level,
                        strip,
                        type,
                        group,
                        access,
                        readyClasses,
                        featureimage,
                        order,
                        status,
                        created_by,
                        updated_by,
                    }
                })

            return res.json(post)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async findAll(req, res) {

        try {
            const posts = await prisma.post.findMany()

            const status = !posts ? 500 : posts.length > 0 ? 200 : 200

            const _return = {
                length: posts.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: posts,
            }

            return res.status(status).json(_return)


        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async find(req, res) {

        try {
            const { id } = req.params
            const post = await prisma.post.findUnique(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )

            const status = !post ? 400 : post && post.id ? 200 : 500

            const _return = {
                length: post ? 1 : 0,
                status: status,
                success: status === 200,
                data: post ? post : [],
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },


    async update(req, res) {

        try {
            const { id } = req.params
            const {
                code,
                usercode,
                authorcode,
                categorycode,
                title,
                slug,
                subtitle,
                tags,
                obs,
                content,
                text,
                overview,
                summary,
                additionaltext,
                pdf,
                pdftext,
                url,
                urltext,
                video,
                videotitle,
                videotext,
                level,
                strip,
                type,
                group,
                access,
                readyClasses,
                featureimage,
                order,
                status,
                created_by,
                updated_by,
            } = req.body

            let post = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!post) return res.json({ error: 'registro não encontrado!' })

            post = await prisma.post.update({
                where: { id: Number(id) },
                data: {
                    code,
                    usercode,
                    authorcode,
                    categorycode,
                    title,
                    slug,
                    subtitle,
                    tags,
                    obs,
                    content,
                    text,
                    overview,
                    summary,
                    additionaltext,
                    pdf,
                    pdftext,
                    url,
                    urltext,
                    video,
                    videotitle,
                    videotext,
                    level,
                    strip,
                    type,
                    group,
                    access,
                    readyClasses,
                    featureimage,
                    order,
                    status,
                    created_by,
                    updated_by,
                },
            })

            return res.json(post)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },


    async delete(req, res) {

        try {
            const { id } = req.params
            const post = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!post) return res.json({ error: 'registro não encontrado!' })

            await prisma.post.delete({ where: { id: Number(id) } })

            return res.json({ message: 'registro deletado com sucesso!' })

        } catch (error) {

            return res.status(500).json({ error })
        }
    },
}