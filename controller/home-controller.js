 const { Admin } = require("../models")
 const { compare } =require("../helpers/hasher");
 class Home {
    static getHome (req, res) {
        res.render("loginOrRegister")
    }
    static getRegister (req, res) {
        let error = req.query.alert
        res.render("register", {error})
    }
    static postRegister (req, res) {
        const {name, username, email, password} = req.body
            const newData = {
                name,
                username,
                email,
                password
            }
            Admin.create(newData)
                .then((data) => {
                    res.redirect("/")
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
    static getLogin (req, res) {
        let error = req.query.alert
        res.render("login", {error})
    }
    static postLogin (req, res) {
        Admin.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(data => {
                let pass = compare(req.body.password, data.password)
                if (data && pass) {
                    req.session.AdminId = data.id
                    res.redirect("/products/list")
                } else {
                    let errors = ["Invalid Password"]
                    res.redirect(`/login?alert= ${errors}`)
                }
            })
            .catch(err => {
                    let errors = ["Invalid username or password"]
                    res.redirect(`/login?alert= ${errors}`)
                
            })

    }
    
 }

 module.exports = Home;