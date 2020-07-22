module.exports = app => {

    const { sessionToken, beersPage, verifyDataAPI } = app.functions.functions;

    app.route("/api/punk/index")
    .post(sessionToken, (req, res) => {
        
        let beer = req.body;

        let erros = verifyDataAPI(beer);

        if (erros.length>0) {
            return res.status(400).render('api/punk/index', { errs:erros,ok:"", user:req.session.data, beer, beers:[] });
        }
        const page = parseInt(beer.page);
        const perPage= parseInt(beer.perPage);
        beersPage(page,perPage)
        .then(resp=>{

            res.status(200).render("api/punk/index", { errs:[],ok:"Carregado as informações das cervejas com sucesso!", user: req.session.data, beer:{},beers:resp.data });
        });
    })
    .get(sessionToken,(req,res)=>{

        beersPage(1,15)
        .then(resp=>{
            res.status(200).render("api/punk/index", { errs:[],ok:"Carregado as informações das cervejas com sucesso!", user: req.session.data, beer:{}, beers:resp.data });
        });
    });
}