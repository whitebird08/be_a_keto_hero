var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ketoHero' });
});

router.get('/food/newfood', function(req, res, next){
  res.render('newfood')

  res.redirect('/');
});

router.get('/food', function(req, res, next){
  res.render('food')

});

router.get('/food/:id', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/show'); // ,{allFoods: foods} <-object needs to be inserted in parens
  });
});
//

router.get('/food/:id/edit', function(req, res, next) {
  // albumCollection.findOne({_id: req.params.id}, function (err, record) {
  //    console.log(record)
    res.render('food/edit');// ,{theFood: food} <-object needs to be inserted in parens 

});


router.get('/meal/newmeal', function(req, res, next){
  res.render('newmeal')

  res.redirect('/');
});

router.get('/meal', function(req, res, next){
  res.render('meal')

});

router.get('/meal/:id', function(req, res, next) {
  albumCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('albums/show'); // ,{allMeals: meals} <-object needs to be inserted in parens
  });
});


router.get('/meal/:id/edit', function(req, res, next) {
  // albumCollection.findOne({_id: req.params.id}, function (err, record) {
  //    console.log(record)
    res.render('meal/edit');// ,{theMeal: meal} <-object needs to be inserted

});



module.exports = router;
