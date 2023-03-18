import { Router } from "express"

import UserController from "./controllers/UserController"
import PostController from "./controllers/PostController"
import PostFullController from "./controllers/PostFullController"
import CategoryController from "./controllers/CategoryController"
import AuthorController from "./controllers/AuthorController"
import MediaController from "./controllers/MediaController"
import CommentController from "./controllers/CommentController"
import LessonController from "./controllers/LessonController"
import ChapterController from "./controllers/ChapterController"



const router = Router()

router.post('/user', UserController.create)
router.get('/users', UserController.findAll)
router.get('/user/:id', UserController.find)
router.put('/user/:id', UserController.update)
router.delete('/user/:id', UserController.delete)

router.post('/post', PostController.create)
router.get('/posts', PostController.findAll)
router.get('/post/:id', PostController.find)
router.put('/post/:id', PostController.update)
router.delete('/post/:id', PostController.delete)

router.post('/category', CategoryController.create)
router.get('/categories', CategoryController.findAll)
router.get('/category/:id', CategoryController.find)
router.put('/category/:id', CategoryController.update)
router.delete('/category/:id', CategoryController.delete)

router.post('/author', AuthorController.create)
router.get('/authors', AuthorController.findAll)
router.get('/author/:id', AuthorController.find)
router.put('/author/:id', AuthorController.update)
router.delete('/author/:id', AuthorController.delete)

router.post('/media', MediaController.create)
router.get('/medias', MediaController.findAll)
router.get('/media/:id', MediaController.find)
router.put('/media/:id', MediaController.update)
router.delete('/media/:id', MediaController.delete)

router.post('/comment', CommentController.create)
router.get('/comments', CommentController.findAll)
router.get('/comment/:id', CommentController.find)
router.put('/comment/:id', CommentController.update)
router.delete('/comment/:id', CommentController.delete)

router.get('/postsfull', PostFullController.findAll)
router.get('/postsfull/:id', PostFullController.find)

router.post('/lesson', LessonController.create)
router.get('/lessons', LessonController.findAll)
router.get('/lesson/:id', LessonController.find)
router.put('/lesson/:id', LessonController.update)
router.delete('/lesson/:id', LessonController.delete)

router.post('/chapter', ChapterController.create)
router.get('/chapters', ChapterController.findAll)
router.get('/chapter/:id', ChapterController.find)
router.put('/chapter/:id', ChapterController.update)
router.delete('/chapter/:id', ChapterController.delete)

export { router }