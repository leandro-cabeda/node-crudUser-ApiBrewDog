const jwt = require('jsonwebtoken');
const axios= require("axios").default;
const secret= "kjiw#$kk@lç*&jm";

function sessionToken(req, res, next) {
  let auth = req.session.userAuth;

  if (auth) {
      auth = req.session.userAuth.split(' ')[1];
      
      jwt.verify(auth,secret, function (err) {
          if (err) {
            res.status(401).redirect("/login");
          } else {
              next(); 
          }
      
      });

  } else {
    res.status(401).redirect("/login");
  }
  
}

function createToken(user){

  let token = jwt.sign({
    email: user.email,
    password: user.password
},
    secret,
    {
        expiresIn: 120
    });

    return token;
}

const verifyErrsStatus = errs => {

  let status = 200;

  if (errs.length > 0) {

    let erro = errs[0].msg;

    if (erro.includes("Erro")) {
      status=400;
    }
    else if(erro.includes("Ocorreu"))
    {
      status=500;
    }

  }

  return status;

}

const accessData = (res,errs, ok ,user) => {

  let status = verifyErrsStatus(errs);
  res.status(status).render("api/user/index", { errs, ok, user });
}

const verifyData=(erros, user)=>{

  erros = [];

  if(user.email.trim()==""){
    erros.push({msg:"Email inválido, por favor preencha o campo!"});
  }
  if(user.password.trim()==""){
      erros.push({msg:"Password inválido, por favor preencha o campo!"});
  }

  return erros;

}

const verifyDataAPI=(beer)=>{

  let erros = [];

  if(beer.page.trim()==""){
      erros.push({msg:"Page inválido, por favor preencha o campo!"});
  }
  if(beer.perPage.trim()==""){
      erros.push({msg:"PerPage inválido, por favor preencha o campo!"});
  }

  return erros;

}

const beersPage= async (numPage,numPerPage)=>{

  let list=[];

  await axios.get(`https://api.punkapi.com/v2/beers?page=${numPage}&per_page=${numPerPage}`)
  .then(data=>{
    list=data;
  }).catch(err=>console.log("Err: "+err));

  return list;

}


const functions=()=>{
  return {
    sessionToken,
    accessData,
    createToken,
    verifyData,
    beersPage,
    verifyDataAPI
  }
}

module.exports=functions;