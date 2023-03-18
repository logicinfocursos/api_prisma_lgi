import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async create(req, res) {

        try {
            const { code, coursecode, title, subtitle, authorcode, content, overview, order, status, created_by, updated_by } = req.body

            const chapter = await prisma.chapter.create(
                {
                    data: { code, coursecode, title, subtitle, authorcode, content, overview, order, status, created_by, updated_by }
                })

            return res.json(chapter)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async findAll(req, res) {

        try {
            const chapters = await prisma.chapter.findMany()
            const lessonList = await prisma.lesson.findMany()
            const courseList = await prisma.post.findMany()

            let _charpters = []

            for (const item of chapters) {

                _charpters.push(insertCourseAndLessonInChapterItem(item, courseList, lessonList))
            }

            const status = !chapters ? 500 : chapters.length > 0 ? 200 : 200

            const _return = {
                length: chapters.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: _charpters,
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },



    async find(req, res) {

        try {
            const { id } = req.params

            const chapter = await prisma.chapter.findUnique({ where: { id: Number(id) } })

            const lessonList = await prisma.lesson.findMany()
            const courseList = await prisma.post.findMany()

            const _charpter = (insertCourseAndLessonInChapterItem(chapter, courseList, lessonList))

            const status = !chapter ? 400 : chapter && chapter.id ? 200 : 500

            const _return = {
                length: chapter ? 1 : 0,
                status: status,
                success: status === 200,
                data: _charpter ? _charpter : [],
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

            let chapter = await prisma.chapter.findUnique({ where: { id: Number(id) } })

            if (!chapter) return res.json({ error: 'registro não encontrado!' })

            chapter = await prisma.chapter.update({
                where: { id: Number(id) },
                data: { code, coursecode, title, subtitle, authorcode, content, overview, order, status, created_by, updated_by },
            })

            return res.json(chapter)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },


    async delete(req, res) {

        try {
            const { id } = req.params
            const chapter = await prisma.chapter.findUnique({ where: { id: Number(id) } })

            if (!chapter) return res.json({ error: 'registro não encontrado!' })

            await prisma.chapter.delete({ where: { id: Number(id) } })

            return res.json({ message: 'registro deletado com sucesso!' })

        } catch (error) {

            return res.status(500).json({ error })
        }
    },
}



export const insertCourseAndLessonInChapterItem = (item, courses, lessons) => {

    const _course = courses.filter((i) => i.code === item.coursecode && i.status === 1)
    const _lessons = lessons.filter((l)=>l.coursecode===item.coursecode)

    const _newChapter = {
        ...item,
        course: _course ? _course[0] : [],
        lessons: _lessons ? _lessons: [],
    }

    return _newChapter
}