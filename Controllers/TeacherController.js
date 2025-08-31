const TeacherModel = require('../Models/teacher')


class TeacherController {

    static display = async(req, res) => {   // async -> promise-based function
        try {
            const {name,email, password} = req.body
            const data = await TeacherModel.create({
                name,
                email,
                password
            })
        } catch(error) {
            console.error(error)
        }
    }

    static create = async(req, res) => {   
        try {
            console.log(req.body)
        } catch(error) {
            console.error(error)
        }
    }
    static view = async(req, res) => {
        try {
            const id = req.params.id
            const data = await TeacherModel.findById(id)
            res.json(data)
        } catch(error) {
            console.error(error)
        }
    }
    static update = async(req, res) => {
        try {
            const id = req.params.id
            const {name, email, password} = req.body
            const data = await TeacherModel.findByIdAndUpdate(id, {
                name,
                email,
                password
            })
            res.json(data)
        } catch(error) {
            console.error(error)
        }
    }

}
module.exports = TeacherController