const bcrypt = require("bcryptjs");
let erros = [];

module.exports = app => {

    const { accessData, sessionToken, createToken,verifyData } = app.functions.functions;
    const { Users } = app.user.DataUserModel;

    app.get("/api/user/index", sessionToken, (req, res) => {
        
        res.status(200).render("api/user/index", { errs:[],ok:"", user: req.session.data });
    });

    app.route("/api/user/login")
    .post((req, res) => {

        const user = req.body;
        erros=verifyData(erros,user);

        if (erros.length > 0) {
            return res.status(400).render("login",{ errs:erros, user });
        }

        Users.findOne({
            where: {
                email: user.email
            }
        }).then(use => {

            if (use == undefined) {

               return res.status(400).render('login', { errs: [{msg:"Usuário não cadastrado!"}], user });
            }
            else {
                bcrypt.compare(user.password, use.password, (err, resp) => {
                    if (err){
                      return res.status(400).render('login', { errs: [{msg:"Ocorreu seguinte erro: "+err}], user });
                    }
                    if (resp){
                       req.session.userAuth="Bearer "+createToken(user);
                       user.id=use.id;
                       req.session.data=user;
                       accessData(res,[],"Usuário logado com sucesso!",user);
                    }else{
                      return res.status(400).render('login', { errs: [{msg:"Password do usuário inválido!"}], user });
                    }
                });
            }
        }).catch(err => {
            res.status(500).render("login", { errs: [{ msg:"Ocorreu falha durante a conexão do banco "+err}], user });
        });

    }).get(sessionToken,(req,res)=>{

        accessData(res,[],"",req.session.data);
    });

    app.route("/api/user/save")
    .post((req, res) => {

        const user = req.body;

        erros=verifyData(erros,user);

        if (erros.length > 0) {
            return res.status(400).render("register",{ errs:erros, user });
        }

        Users.findOne({
            where: {
                email: user.email
            }
        }).then(use => {

            if (use != undefined) {

                return res.status(400).render('register', { errs: [{msg:"Esta conta de usuário já está cadastrado"}], user });
            }
            else {

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(user.password, salt);

                Users.create({
                    email: user.email,
                    password: hash
                }).then(() => {

                    Users.findOne({
                        where: {
                            email: user.email
                        }
                    }).then(use=>{
                        req.session.userAuth="Bearer "+createToken(user);
                        user.id=use.id;
                        req.session.data=user;
                        accessData(res,[],"Usuário cadastrado com sucesso!",user);
                    })
                    .catch(err=>{
                        res.status(500).render("register", { errs: [{msg:"Ocorreu falha durante a conexão do banco "+err}], user });
                    });

                }).catch(err => {
                    res.status(500).render("register", { errs: [{msg:"Ocorreu falha durante a conexão do banco "+err}], user });
                });
            }

        }).catch(err => {
            res.status(500).render("register", { errs: [{ msg:"Ocorreu falha durante a conexão do banco "+err}], user });
        });



    }).get((req,res)=>{

        res.status(200).redirect("/");
    });

    app.route("/api/user/update")
    .post(sessionToken,(req, res) => {

        const user = req.body;

        verifyData(erros,user,res,"/api/user/index");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        Users.update({
            email: user.email,
            password: hash
        },
            {
                where: {
                    id: user.id
                }

            }).then(() => {
                accessData(res,[], "Usuário atualizado com sucesso!", user);
            }).catch(err => {

                res.status(500).render("api/user/edit", { errs: [{msg:"Ocorreu falha durante a conexão do banco "+err}], user });
            });
    }).get((req,res)=>{

        res.status(200).redirect("/api/user/index");
    });

    app.route("/api/user/edit")
    .post(sessionToken, (req, res) => {

        let id = req.body.id;
        id = parseInt(id);

        Users.findByPk(id)
            .then(user => {

                res.status(200).render("api/user/edit", { errs: [], user });
            })
            .catch(err => {
                accessData(res, [{msg:"Ocorreu falha durante a conexão do banco "+err}], "", req.session.data);
            });

    }).get((req,res)=>{

        res.status(200).redirect("/api/user/index");
    });

    app.route("/api/user/delete")
    .post(sessionToken, (req, res) => {

        let id = req.body.id;
        id = parseInt(id);

        Users.destroy({
            where: { id }
        }).then(() => {

            req.session.userAuth=undefined;
            req.session.data=undefined;
            res.status(200).redirect("/");

        }).catch(err => {

            accessData(res, [{msg:"Ocorreu falha durante a conexão do banco "+err }], "", req.session.data);
        });

    })
    .get((req,res)=>{

        res.status(200).redirect("/api/user/index");
    });

    app.get("/api/user/logout", sessionToken, (req, res) => {
 
        req.session.userAuth=undefined;
        req.session.data=undefined;
        res.status(200).redirect("/");
    });
}