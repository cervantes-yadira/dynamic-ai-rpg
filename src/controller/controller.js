import handleDungeonPrompt from './../services/api.js'

export const handleLLMRequest = async (req, res) => {
    try {
        const { userInput, chatLog } = req.body
        const result = await handleDungeonPrompt(userInput, chatLog)
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error })
    }
}