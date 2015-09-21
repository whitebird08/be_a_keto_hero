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
 console.log('GET EDITFOOD')
 foodsCollection.findOne({_id: req.params.id}, function (err, foods) {
    res.render('editfood', {allFoods: foods});
     console.log('RENDER EDITFOOD')
  });
});

router.get('/meal/newmeal', function(req, res, next){
  console.log('GET NEWMEAL')
  res.render('newmeal')

  res.redirect('/');
});

router.get('/meal', function(req, res, next){
  console.log('GET MEAL')
  mealsCollection.find({}, function (err, meals) {
  res.render('meal', {allMeals: meals});

  });
});

router.get('/meal/:id', function(req, res, next) {
  mealsCollection.findOne({_id: req.params.id}, function (err, meals) {
    res.render('showmeal',{allMeals: meals}); 
  });
});


router.get('/meal/:id/editmeal', function(req, res, next) {
    console.log('GET EDITMEAL')
  mealsCollection.findOne({_id: req.params.id}, function (err, meals) {
    res.render('editmeal',{allMeals: meals});
    console.log('GET RENDER EDITMEAL')
  });
});

router.post('/food/:id/delete', function(req, res, next) {
  foodsCollection.remove({_id: req.params.id}, function (err, foods) {
      res.redirect('/food');
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
   console.log('POST EDITFOOD')
    foodsCollection.updateById(req.params.id, {
                          total_grams: req.body.total_grams, 
                          food_name: req.body.food_name, 
                          protien_grams: req.body.protien_grams, 
                          fat_grams: req.body.fat_grams,
                          carbs_grams: req.body.carbs_grams
                          },function (err, foods) {
    res.redirect('/food/' + req.params.id);
       console.log('POST RENDERFOOD')
  });
});   

router.post('/meal/:id/delete', function(req, res, next) {
  mealsCollection.remove({_id: req.params.id}, function (err, meals) {
      res.redirect('/meal');
  });
});

router.post('/meal', function(req, res, next) {
  console.log('POST MEAL')
  mealsCollection.insert({ meal_name: req.body.meal_name, 
                           meal_item1: req.body.meal_item, //food _id but with a new/adjusted quantity value for /edit
                           meal_item2: req.body.meal_item, //food _id
                           meal_item3: req.body.meal_item, //food _id
                           meal_item4: req.body.meal_item, //food _id
                           meal_item5: req.body.meal_item  //food _id
  });
    console.log('POST REDIRECT MEAL')
  res.redirect('/meal');
});

router.post('/meal/:id', function(req, res, next) {
   mealsCollection.updateById({_id: req.params.id}, function (err, meals) {
    res.render('showmeal', {allMeals: meals}); 
  });
});

router.post('/meal/:id/editmeal', function(req, res, next) {
console.log('POST EDITMEAL')
    mealsCollection.updateById(req.params.id, {
                           meal_name: req.body.meal_name, 
                           meal_item1: req.body.meal_item, //food _id but with a new/adjusted quantity value for /edit
                           meal_item2: req.body.meal_item, //food _id
                           meal_item3: req.body.meal_item, //food _id
                           meal_item4: req.body.meal_item, //food _id
                           meal_item5: req.body.meal_item  
                          },function (err, meals) {
    res.redirect('/meal/' + req.params.id);
    console.log('POST REDIRECT EDITMEAL')
 
  });
});   





module.exports = router;
