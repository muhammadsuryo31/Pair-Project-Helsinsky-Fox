 const {Admin, Operator} = require("../models")
 class Home {
    static getHome (req, res) {
        res.render("loginOrRegister")
    }
    static getRegister (req, res) {
        res.render("register")
    }
    static postRegister (req, res) {
        const {role, name, username, email, password} = req.body
        if (role === "Admin"){
            const newData = {
                name,
                username,
                email,
                password
            }
            Admin.create(newData)
                .then((data) => {
                    res.send(data)
                })
                .catch(err => {
                    if (err.errors){
                        let errors = []
                        err.errors.forEach(element => {
                                errors.push(element.message)
                        });
                        res.redirect(`/register?alert= ${errors}`)
                    } else {
                        res.send("err")
                    }
                })
        } else if (role === "Operator"){
            const newData = {
                name,
                username,
                email,
                password
            }
            Operator.create(newData)
                .then((data) => {
                    res.send(data)
                })
                .catch(err => {
                    if (err.errors){
                        let errors = []
                        err.errors.forEach(element => {
                                errors.push(element.message)
                        });
                        res.redirect(`/register?alert= ${errors}`)
                    } else {
                        res.send("err")
                    }
                })
        }
       
    }
 }

 module.exports = Home;