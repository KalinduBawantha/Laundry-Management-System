const route = require ('express').Router();



route.get('/' , (req, res) =>{
    res.json({result : "successfully working"});
});

module.exports = route;