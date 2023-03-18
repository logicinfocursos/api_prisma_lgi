import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {
            const { code, coursecode, chaptercode, videourl, title, subtitle, type, authorcode, content, overview, order, status, created_by, updated_by } = req.body

            const lesson = await prisma.lesson.create(
                {
                    data: { code, coursecode, chaptercode, videourl, title, subtitle, type, authorcode, content, overview, order, status, created_by, updated_by }
                })

            return res.json(lesson)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async findAll(req, res) {

        try {
            const lessons = await prisma.lesson.findMany()
            const courseList = await prisma.post.findMany()
            const chapterList = await prisma.chapter.findMany()
            const mediaList = await prisma.media.findMany()
            const authorList = await prisma.author.findMany()

            let _lessons = []

            for (const item of lessons) {

                _lessons.push(inserCourseChapterAndMediasInLessonItem(item, courseList, chapterList, mediaList, authorList))
            }

            const status = !lessons ? 500 : lessons.length > 0 ? 200 : 200

            const _return = {
                length: lessons.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: _lessons,
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async find(req, res) {

        try {
            const { id } = req.params

            const lesson = await prisma.lesson.findUnique({ where: { id: Number(id) } })

            const courseList = await prisma.post.findMany()
            const chapterList = await prisma.chapter.findMany()
            const mediaList = await prisma.media.findMany()
            const authorList = await prisma.author.findMany()

            let _lesson = []
            _lesson.push(inserCourseChapterAndMediasInLessonItem(lesson, courseList, chapterList, mediaList, authorList))

            const status = !lesson ? 400 : lesson && lesson.id ? 200 : 500

            const _return = {
                length: lesson ? 1 : 0,
                status: status,
                success: status === 200,
                data: _lesson ? _lesson : [],
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async update(req, res) {

        try {
            const { id } = req.params
            const { code, coursecode, chaptercode, videourl, title, subtitle, type, authorcode, content, overview, order, status, created_by, updated_by } = req.body

            let lesson = await prisma.lesson.findUnique({ where: { id: Number(id) } })

            if (!lesson) return res.json({ error: 'registro não encontrado!' })

            lesson = await prisma.lesson.update({
                where: { id: Number(id) },
                data: { code, coursecode, chaptercode, videourl, title, subtitle, type, authorcode, content, overview, order, status, created_by, updated_by },
            })

            return res.json(lesson)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },


    async delete(req, res) {

        try {
            const { id } = req.params
            const lesson = await prisma.lesson.findUnique({ where: { id: Number(id) } })

            if (!lesson) return res.json({ error: 'registro não encontrado!' })

            await prisma.lesson.delete({ where: { id: Number(id) } })

            return res.json({ message: 'registro deletado com sucesso!' })

        } catch (error) {

            return res.status(500).json({ error })
        }
    },
}


export const inserCourseChapterAndMediasInLessonItem = (lesson, courseList, chapterList, mediaList, authorList) => {

    //const _mediasLesson = mediaList.filter((i) => i.ownercode === lesson.code && i.ownertype==="lesson" && i.status === 1)
    const _mediasLesson = mediaList.filter((m) => m.ownercode === lesson.code)
    const _chapter = chapterList.filter((c) => c.code === lesson.chaptercode)
    const _course = courseList.filter((i) => i.code === _chapter[0].coursecode )
    const _author = authorList.filter((a) => a.code === lesson.authorcode)

    const _newPost = {
        ...lesson,
        medias: _mediasLesson ? _mediasLesson : [],
        chapter: _chapter && _chapter[0] ? _chapter[0] : [],
        course: _course && _course[0] ? _course[0] : [],
        author: _author && _author[0] ? _author[0] : [],
    }

    return _newPost
}