import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import { upload } from "./middleware/multerMiddleware.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
const prisma = new PrismaClient()

const getAllImage = async(req,res) => {
    try {
        const data = await prisma.image.findMany()
        res.json({
            data : data
        })
    } catch (error) {
        console.log(error)
    }
} 

const createImage = async(req,res) => {
    try {
        const foto = req.file.filename
        const data = await prisma.image.create({
            data : {
                foto : foto
            }
        })
        res.json({
            data : data
        })
    } catch (error) {
        console.log(error)
    }
} 

app.get("/image",getAllImage)
app.post("/image",upload.single("foto"),createImage)

app.use("/upload",express.static("upload"))

app.listen(port, () => {
    console.log(`Server running on http://localhost:3000/`)
})