const express = require("express")

function createTramiteRouter(controller){
    const router = express.Router()

    router.post("/", controller.create)

    return router
}

module.exports = createTramiteRouter
