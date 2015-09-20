var express = require('express');
var router = express.Router();

var db = require('monk')('localhost/keto');
var foodsCollection = db.get('foods');
var mealsCollection = db.get('meals');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ketoHero' });
});

router.get('/food/newfood', function(req, res, next){
  res.render('newfood')

  res.redirect('/');
});

router.get('/food', function(req, res, next){
  foodsCollection.find({}, function (err, foods) {
  res.render('food'), {allFoods: foods}
  });
});



router.get('/food/:id', function(req, res, next) {
  // foodsCollection.findOne({_id: req.params.id}, function (err, food) {
    res.render('food/:id/show'); // ,{allFoods: foods} <-object needs to be inserted in parens
  // });
});
//

router.get('/food/:id/edit', function(req, res, next) {
  // foodsCollection.findOne({_id: req.params.id}, function (err, record) {
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
  mealsCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('meal/show'); // ,{allMeals: meals} <-object needs to be inserted in parens
  });
});


router.get('/meal/:id/edit', function(req, res, next) {
  // mealsCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('meal/edit');// ,{theMeal: meal} <-object needs to be inserted

});

router.post('/food', function(req, res, next) {
  foodsCollection.insert({ total_grams: req.body.total_grams, 
                           food_name: req.body.food_name, 
                           protien_grams: req.body.protien_grams, 
                           fat_grams: req.body.fat_grams,
                           carbs_grams: req.body.carbs_grams,
  });
  res.redirect('/food');
});

router.post('/meal', function(req, res, next) {
  mealsCollection.insert({ meal_name: req.body.meal_name, 
                           meal_item1: req.body.meal_item, 
                           meal_item2: req.body.meal_item,
                           meal_item3: req.body.meal_item,
                           meal_item4: req.body.meal_item,
                           meal_item5: req.body.meal_item  
  });
  res.redirect('/meal');
});



module.exports = router;
