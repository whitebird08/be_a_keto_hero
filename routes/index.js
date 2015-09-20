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
  res.render('food', {allFoods: foods});
  });
});


router.get('/food/:id', function(req, res, next) {
   foodsCollection.findOne({_id: req.params.id}, function (err, foods) {
    res.render('showfood', {allFoods: foods}); 
  });
});


router.get('/food/:id/editfood', function(req, res, next) {
 foodsCollection.findOne({_id: req.params.id}, function (err, foods) {
    res.render('editfood', {allFoods: foods});
  });
});


router.get('/meal/newmeal', function(req, res, next){
  res.render('newmeal')

  res.redirect('/');
});

router.get('/meal', function(req, res, next){
  res.render('meal')

});

router.get('/meal/:id', function(req, res, next) {
  mealsCollection.findOne({_id: req.params.id}, function (err, meals) {
    res.render('showmeal',{allMeals: meals}); 
  });
});


router.get('/meal/:id/editmeal', function(req, res, next) {
  mealsCollection.findOne({_id: req.params.id}, function (err, meals) {
    res.render('editmeal',{allMeals: meals});
  });
});

router.post('/food/:id/delete', function(req, res, next) {
  foodsCollection.remove({_id: req.params.id}, function (err, foods) {
      res.redirect('food');
  });
});


router.post('/food', function(req, res, next) {
  foodsCollection.insert({ total_grams: req.body.total_grams, 
                           food_name: req.body.food_name, 
                           protien_grams: req.body.protien_grams, 
                           fat_grams: req.body.fat_grams,
                           carbs_grams: req.body.carbs_grams
  });
  res.redirect('/food');
});

router.post('/food/:id', function(req, res, next) {
   foodsCollection.updateById({_id: req.params.id}, function (err, foods) {
    res.render('food/showfood', {allFoods: foods}); 
  });
});

router.post('/food/:id/editfood', function(req, res, next) {
  albumCollection.updateById(req.params.id, {
                          total_grams: req.body.total_grams, 
                          food_name: req.body.food_name, 
                          protien_grams: req.body.protien_grams, 
                          fat_grams: req.body.fat_grams,
                          carbs_grams: req.body.carbs_grams
                          },function (err, foods) {

    res.redirect('/food/' + req.params.id);
  });
});

router.post('/meal/:id/delete', function(req, res, next) {
  mealsCollection.remove({_id: req.params.id}, function (err, meals) {
      res.redirect('meal');
  });
});

router.post('/meal', function(req, res, next) {
  mealsCollection.insert({ meal_name: req.body.meal_name, 
                           meal_item1: req.body.meal_item, //food _id but with a new/adjusted quantity value for /edit
                           meal_item2: req.body.meal_item, //food _id
                           meal_item3: req.body.meal_item, //food _id
                           meal_item4: req.body.meal_item, //food _id
                           meal_item5: req.body.meal_item  //food _id
  });
  res.redirect('meal');
});

router.post('/meal/:id', function(req, res, next) {
   mealsCollection.updateById({_id: req.params.id}, function (err, meals) {
    res.render('showmeal', {allMeals: meals}); 
  });
});





module.exports = router;
