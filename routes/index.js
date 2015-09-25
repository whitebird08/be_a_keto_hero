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
  
  mealsCollection.find({}, function (err, meals) {
    foodsCollection.find({}, function(err, foods) {
      for (var i = 0; i < meals.length; i++) {
        var food_id_one = meals[i].foods[0]
          for (var j = 0; j < foods.length; j++) {
            if (food_id_one == foods[j]._id){
              console.log(foods[j])
              meals[i].foods = foods[j]
            }
          }
      }
      res.render('meal', {allMeals: meals});
    });
  });
});


router.get('/meal/newmeal', function(req, res, next){
  console.log('NEWMEAL?????')
  foodsCollection.find({}, function (err, foods) {
///////////
    mealsCollection.find({}, function (err, meals) {
    foodsCollection.find({}, function(err, foods) {
      for (var i = 0; i < meals.length; i++) {
        var food_id_one = meals[i].foods[0]
          for (var j = 0; j < foods.length; j++) {
            if (food_id_one == foods[j]._id){
              console.log(foods[j])
              meals[i].foods = foods[j]
            }
          }
      }
    });
    });
/////////////
    res.render('newmeal', {allFoods: foods});
  });

  console.log('GET NEWMEAL')
});

router.get('/meal/:id', function(req, res, next) {
  mealsCollection.findOne({_id: req.params.id}, function (err, meal) {

console.log(meal)
    foodsCollection.find({}, function(err, foods) {
   
        var food_id_one = meal.foods[0]
        var food_id_two = meal.foods[1]
        var food_id_three = meal.foods[2]
        var food_id_four = meal.foods[3]
        var food_id_five = meal.foods[4]
          for (var j = 0; j < foods.length; j++) {
            if (food_id_one == foods[j]._id){
              console.log(foods[j])
              meal.foodOne = foods[j]
            }
          }
          for (var j = 0; j < foods.length; j++) {
            if (food_id_two == foods[j]._id){
              console.log(foods[j])
              meal.foodTwo = foods[j]
            }
          }
          for (var j = 0; j < foods.length; j++) {
            if (food_id_three == foods[j]._id){
              console.log(foods[j])
              meal.foodThree = foods[j]
            }
          }
          for (var j = 0; j < foods.length; j++) {
            if (food_id_four == foods[j]._id){
              console.log(foods[j])
              meal.foodFour = foods[j]
            }
          }
          for (var j = 0; j < foods.length; j++) {
            if (food_id_five == foods[j]._id){
              console.log(foods[j])
              meal.foodFive = foods[j]
            }
          }

    console.log(meal)  
       res.render('showmeal',{meal: meal});
    });

    
  });
});

router.get('/meal/:id/editmeal', function(req, res, next) {
  console.log('GET EDITMEAL')
  mealsCollection.findOne({_id: req.params.id}, function (err, meal) {   
    foodsCollection.find({}, function(err, foods) {
   
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
  console.log(meal)
  mealsCollection.insert(meal);

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
                          foods: [req.body.meal_item1,
                          req.body.meal_item2 ]                  
                        },function (err, meals) {
  res.redirect('/meal/' + req.params.id);

  console.log('POST REDIRECT EDITMEAL')

  });
});   





module.exports = router;
