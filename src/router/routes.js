import { Router } from 'express'
import { handleLLMRequest } from './../controller/controller.js'

const router = Router()

router.post('/', handleLLMRequest)

export default router