var express = require('express');
var router = express.Router();

var db = require('monk')('localhost/keto');
var foodsCollection = db.get('foods');
var mealsCollection = db.get('meals');
var mealItemsCollection = db.get('meal_items')

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


router.get('/meal', function(req, res, next){
  console.log('GET MEAL')
  
  var viewObject = [];
  mealsCollection.find({}, function (err, meals) {
    var mealObject = {_id: mealObject}
    for (var i = 0; i < meals.length; i++) {
      var food_id_one = meals[i].meal_item1
console.log (meals[i], 'MEALSI')
      // var food_id_two = meals[i].meal_item2

console.log('ACCUMULATOR')
      foodsCollection.find({_id: food_id_one}, function(err, food) {
      });
console.log(food_id_one, 'FOOD_ID_ONE')
console.log(mealObject, 'MEAL OBJECT')
console.log(viewObject, 'VIEWOBJECT')
      // foodsCollection.find({_id: meal_item1}, function(err, food) {      
      // });
      viewObject.push(mealObject);
      // when the viewObject has a length of meals.length
      // res.render
    }
// for each meal, grab the meal_item_1 id
// query foods with meal_item_1 id
// push the food into the accumulator
// for each meal, 
// grab the meal_item_2 id
// query foods with meal_item_2 id
// push the food into the accumulator
                // var meal = {};
                //   meal.name = req.body.name
                //   meal.foods = []
                //   meal.foods.push(req.body.meal_item1)
                //   meal.foods.push(req.body.meal_item2)
                //   console.log(meal)
                //   mealsCollection.insert(meal);
                // var ingredient = {};
                // ingredient.name = req.body.name
                // ingredient.specs = []
                // ingredient.specs.push(req.body.protien_grams)
                // mealsCollection.insert(food.protien_grams)


  res.render('meal', {allMeals: meals});
  });
});


router.get('/meal/newmeal', function(req, res, next){
  console.log('NEWMEAL?????')
  foodsCollection.find({}, function (err, foods) {
    res.render('newmeal', {allFoods: foods});
  });
  console.log('GET NEWMEAL')
});

router.get('/meal/:id', function(req, res, next) {
  mealsCollection.findOne({_id: req.params.id}, function (err, meal) {
    res.render('showmeal',{meal: meal}); 
  });
});

router.get('/meal/:id/editmeal', function(req, res, next) {
  console.log('GET EDITMEAL')
  mealsCollection.findOne({_id: req.params.id}, function (err, meal) {   
    foodsCollection.find({}, function (err, foods) {    
      // foodsCollection.findOne({_id: req.params.id}, function (err, foods) { 
      // });       
  res.render('editmeal',{theMeal: meal, allFoods: foods});
    });        
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
  console.log(req.body)
  
  var meal = {};
  meal.name = req.body.name
  meal.foods = []
  meal.foods.push(req.body.meal_item1)
  meal.foods.push(req.body.meal_item2)
  // meal.foods.push(req.body.total_grams)
  // meal.foods.push(req.body.food_name)
  // meal.foods.push(req.body.protien_grams)
  // meal.foods.push(req.body.fat_grams)
  // meal.foods.push(req.body.carbs_grams)
  console.log(meal)
  mealsCollection.insert(meal);


    // var ingredient = {};
    // ingredient.name = req.body.name
    // ingredient.specs = []
    // ingredient.specs.push(
    //                     req.body.total_grams, 
    //                     req.body.food_name, 
    //                     req.body.protien_grams, 
    //                     req.body.fat_grams,
    //                     req.body.carbs_grams)
    // mealsCollection.insert(protien_grams)

  res.redirect('/meal');
 });

console.log('FANCY PANTS')

router.post('/meal/:id', function(req, res, next) {
  mealsCollection.updateById({_id: req.params.id},  function (err, meal) {
    res.render('showmeal', {theMeal: meal}); 
  });
});

router.post('/meal/:id/editmeal', function(req, res, next) {
console.log('POST EDITMEAL')
  mealsCollection.updateById(req.params.id, {
                          name: req.body.name,
                          meal_item1: req.body.meal_item1,
                          meal_item2: req.body.meal_item2                   
                        },function (err, meals) {
  res.redirect('/meal/' + req.params.id);

  console.log('POST REDIRECT EDITMEAL')

  });
});   





module.exports = router;
