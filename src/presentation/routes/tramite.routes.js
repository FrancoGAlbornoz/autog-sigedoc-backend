const express = require("express")

function createTramiteRouter(controller){
    const router = express.Router()

    router.post("/", controller.create)
    router.get("/", controller.getAll)
    router.get("/:id", controller.getById)
    return router
}

module.exports = createTramiteRouter
