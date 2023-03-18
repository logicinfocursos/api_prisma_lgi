import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export default {
    async findAll(req, res) {

        try {
            const posts = await prisma.post.findMany()
            const mediaList = await prisma.media.findMany()
            const commentList = await prisma.comment.findMany()
            const categoryList = await prisma.category.findMany()
            const lessonList = await prisma.lesson.findMany()
            const chapterList = await prisma.chapter.findMany()

            let _posts = []

            for (const item of posts) {

                _posts.push(insertMediasAndCommentInPostItem(item, mediaList, categoryList, commentList, lessonList, chapterList))
            }

            const status = !posts ? 500 : posts.length > 0 ? 200 : 200

            const _return = {
                length: posts.length,
                total_pages: 1,
                actual_page: 1,
                itens_per_page: 25,
                status: status,
                success: status === 200,
                data: _posts,
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

            const mediaList = await prisma.media.findMany()
            const commentList = await prisma.comment.findMany()
            const categoryList = await prisma.category.findMany()
            const lessonList = await prisma.lesson.findMany()
            const chapterList = await prisma.chapter.findMany()

            const _newPost = insertMediasAndCommentInPostItem(post, mediaList, categoryList, commentList, lessonList, chapterList)

            const status = !post ? 400 : post && post.id ? 200 : 500

            const _return = {
                length: post ? 1 : 0,
                status: status,
                success: status === 200,
                data: _newPost ? _newPost : [],
            }

            return res.status(status).json(_return)

        } catch (error) {

            return res.status(500).json({ error })
        }
    },

}


export const insertMediasAndCommentInPostItem = (post, medias, categories, comments, lessons, chapters) => {

    const _imagesPost = medias.filter((i) => i.ownercode === post.code && i.status === 1)
    const _commentsPost = comments.filter((i) => i.postcode === post.id && i.status === 1)
    const _categoryPost = categories.filter((i) => i.code === post.categorycode && i.status === 1)  
    const _chapters = chapters.filter((l) => l.coursecode === post.code)

    let _chaptersList = []

    for (const item of _chapters) {

        const _newChapter = {
            ...item,
            lessons:  lessons.filter((l) => l.chaptercode === item.code)
        }

        _chaptersList.push(_newChapter)
    }

    const _newPost = {
        ...post,
        images: _imagesPost ? _imagesPost : [],
        comments: _commentsPost ? _commentsPost : [],
        category: _categoryPost ? _categoryPost[0] : [],
        chapters: _chaptersList,
    }

    return _newPost
}