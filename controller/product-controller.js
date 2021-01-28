const { Product, Operator, RawMaterial, ProductRawMaterial } = require("../models");
// const operator = require("../models/operator");
// const productrawmaterial = require("../models/productrawmaterial");
const { Op } = require("sequelize")
const nodemailer = require("nodemailer");

class Product2 {
    static getList(req, res) {
        Product.findAll({include: Operator})
            .then(data => {
                // console.log(data);
                res.render("product-list", {data});
            })
            .catch(err => {
                console.log("error1");
            })
    }
    static getAdd(req, res) {
        let error = req.query.alert
        Operator.findAll()
            .then(data => {
                res.render("addproduct", {
                    data,
                    error
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static postAdd(req, res){
        const {name, type, OperatorId} = req.body
        const newData = {
            name,
            type,
            OperatorId
        }
        Product.create(newData)
            .then(() => {
                return Operator.findAll({where:{id:OperatorId}})
                
            })
            .then(data => {
                // console.log(data);
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'dummyhacktiv8@gmail.com',
                        pass: 'dummypassword'
                    }
                });
                let mailOptions = {
                    from: 'dummyhacktiv8@gmail.com',
                    to: `${data[0].email}`,
                    subject: 'new job assigned',
                    text: `you're assigned to a job ${name}`
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email sent: ' + info.response);
                });
                res.redirect("/products/list")
            })
            .catch(err => {
                if (err.errors){
                    let errors = []
                    err.errors.forEach(element => {
                            errors.push(element.message)
                    });
                    res.redirect(`/products/add?alert= ${errors}`)
                } else {
                    res.send(err)
                }
            })

    }
    static getRegister(req, res) {
        let error = req.query.alert
        res.render("operator-register", {error})
    }
    static postRegister(req, res){
        const {name, email} = req.body 
        const newData = {
            name,
            email
        }
        Operator.create(newData)
        .then(() => {
            res.redirect("/products/operator")
        })
        .catch(err => {
            if (err.errors){
                let errors = []
                err.errors.forEach(element => {
                        errors.push(element.message)
                });
                res.redirect(`/products/register?alert= ${errors}`)
            } else {
                res.send(err)
            }
        })
    }
    static getOperator(req, res) {
        Operator.findAll()
            .then(data => {
                res.render("operator-list", {data})
            })
            .catch(err => {
                console.log("error2");
                res.send(err)
            })
    }
    static getAddMaterial (req, res) {
        let error = req.query.alert
        res.render("add-material", {error})
    }
    static postAddMaterial (req, res) {
        const {name, availability} = req.body 
        const newData = {
            name,
            availability
        }
        RawMaterial.create(newData)
        .then(() => {
            res.redirect("/products/material")
        })
        .catch(err => {
            if (err.errors){
                let errors = []
                err.errors.forEach(element => {
                        errors.push(element.message)
                });
                res.redirect(`/products/addmaterial?alert= ${errors}`)
            } else {
                res.send(err)
            }
        })
    }
    static getMaterialList(req,res) {
        RawMaterial.findAll()
            .then(data => {
                console.log(data);
                res.render("material-list", {data})
            })
            .catch(err => {
                console.log("error 3");
                res.send(err)
            })
    }
    static getDetail (req, res) {
        let error = req.query.alert
        let id = +req.params.id
        let productData;
        Product.findAll({
            where: {id:id},
            include: ProductRawMaterial
        })
        .then(data => {
            productData = data;
            return RawMaterial.findAll()
        })
        .then(data2 => {
            res.render("product-rawmaterial", {
                id,
                productData,
                data2,
                error
            })
        })
        .catch(err => {
            res.send(err)
        })
    }
    static postDetail(req, res){
        let ProductId = +req.params.id
        let RawMaterialId = Number(req.body.RawMaterialId)
        let amount = Number(req.body.amount)
        const newData = {
            ProductId,
            RawMaterialId,
            amount
        }
        if (ProductId <= 0 || RawMaterialId <= 0 || amount <= 0){
            ProductRawMaterial.create(newData)
            .then(() => {
                res.redirect(`/products/detail/${ProductId}`)
            })
            .catch(err => {
                console.log(err);
                if (err.errors){
                    let errors = []
                    err.errors.forEach(element => {
                            errors.push(element.message)
                    });
                    res.redirect(`/products/detail/${ProductId}?alert= ${errors}`)
                } else {
                    res.send(err)
                }
            })
        } else {
            RawMaterial.findAll({where: {id:RawMaterialId}})
                .then(data => {
                    if (data[0].availability < amount) {
                        res.redirect(`/products/detail/${ProductId}?alert= ${["amount melebihi availability"]}`)
                    } else {
                        console.log("masuk sini");
                        return RawMaterial.decrement('availability', {by: amount, where: {id:RawMaterialId}})
                    }
                })
                .then(() => {
                    return ProductRawMaterial.create(newData)
                })
                .then(() => {
                    res.redirect(`/products/detail/${ProductId}`)
                })
                .catch(err => {
                    console.log(err);
                    if (err.errors){
                        let errors = []
                        err.errors.forEach(element => {
                                errors.push(element.message)
                        });
                        res.redirect(`/products/detail/${ProductId}?alert= ${errors}`)
                    } else {
                        res.send(err)
                    }
                })
        }
    }
    static getRestock(req, res) {
        let id = +req.params.id
        RawMaterial.increment('availability', {by: 100, where: {id:id}})
            .then(()=> {
                res.redirect("/products/material")
            })
            .catch(err => {
                console.log("error 4");
                res.send(err)
            })
    }
    static getUsedMaterialPlus(req, res) {
        let productid = +req.params.productid
        let materialid = +req.params.materialid
        let data1;
        ProductRawMaterial.findAll({ where: {[Op.and]: [
            { ProductId:productid },
            { RawMaterialId: materialid }
          ]
        }})
            .then(data => {
                data1 =data
                return RawMaterial.findAll({where:{id:materialid}})
            })
            .then(data2 => {
                if (data2[0].availability < data1[0].amount){
                    res.redirect (`/products/detail/${productid}?alert= ${["tidak bisa menambah melebihi availability"]}`)
                } else {
                    ProductRawMaterial.increment('amount', 
                    {by: 1, where: {[Op.and]: [
                        { ProductId:productid },
                        { RawMaterialId: materialid }
                    ]
                    }})
                    .then(()=> {
                        return RawMaterial.decrement("availability", {by:1, where:{id: materialid}})
                    })
                    .then(()=> {
                        res.redirect(`/products/detail/${productid}`)
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(err)
                    })
                }
            }) 
            .catch(err => {
                res.send(err)
            })
    }
    static getUsedMaterialMinus(req, res) {
        let productid = +req.params.productid
        let materialid = +req.params.materialid
        ProductRawMaterial.findAll({ where: {[Op.and]: [
            { ProductId:productid },
            { RawMaterialId: materialid }
          ]
        }})
            .then(data => {
                if (data[0].amount <= 0) {
                    res.redirect (`/products/detail/${productid}?alert= ${["tidak bisa mengurangi hingga minus"]}`)
                } else {
                    ProductRawMaterial.decrement('amount', 
                    {by: 1, where: {[Op.and]: [
                        { ProductId:productid },
                        { RawMaterialId: materialid }
                      ]
                    }})
                    .then(()=> {
                        return RawMaterial.increment("availability", {by:1, where:{id: materialid}})
                    })
                    .then(()=> {
                        res.redirect(`/products/detail/${productid}`)
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(err)
                    })
                }
            })
            .catch(err => {
                res.send(err)
            })
       
    }
    static getEdit (req, res) {
        let id = +req.params.id
        let error = req.query.alert
        let data1;
        Product.findAll({where:{id:id}})
            .then(data => {
                data1 =data
                return Operator.findAll()
            })
            .then(data2 => {
                res.render("product-edit", {
                    id,
                    data1,
                    data2,
                    error
                })
            })
    }
    static postEdit (req, res) {
        let id = +req.params.id
        const {name, type, OperatorId} = req.body
        const newData = {
            name,
            type,
            OperatorId
        }
        Product.update(newData,{where: {id:id}})
        .then(() => {
            return Operator.findAll({where:{id:OperatorId}}) 
        })
        .then(data => {
            // console.log(data);
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dummyhacktiv8@gmail.com',
                    pass: 'dummypassword'
                }
            });
            let mailOptions = {
                from: 'dummyhacktiv8@gmail.com',
                to: `${data[0].email}`,
                subject: 'new job assigned',
                text: `you're assigned to a job ${name}`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                console.log('Email sent: ' + info.response);
            });
            res.redirect("/products/list")
        })
        .catch(err => {
            if (err.errors){
                let errors = []
                err.errors.forEach(element => {
                        errors.push(element.message)
                });
                res.redirect(`/products/edit/${id}?alert= ${errors}`)
            } else {
                res.send(err)
            }
        })
    }
    static getDone (req, res) {
        let id = +req.params.id
        Product.destroy({where:{id:id}})
            .then(() => {
                res.redirect("/products/list")
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
    static logOut (req, res) {
        req.session.destroy(function(err) {
            res.redirect("/")
        })
    }


}

module.exports = Product2