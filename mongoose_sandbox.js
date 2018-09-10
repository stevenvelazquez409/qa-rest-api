'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sandbox');

const db = mongoose.connection;

db.on('error', function(err){
  console.error("connection error:",err);
});

db.once('open', function(){
  console.log('Database connection successful');
  //All database communication fgoes here

  const Schema = mongoose.Schema;
  const AnimalSchema = new Schema({
    type: {type: String, default: "goldfish"},
    color: {type: String, default: "golden"},
    size: String,
    mass: {type: Number, default: 0.009},
    name: {type: String, default: "angela"}
  });

  AnimalSchema.pre('save', function(next){
    if(this.mass >= 100){
      this.size = 'big';
    } else if(this.mass >= 5 || < 100){
      this.size = 'medium';
    } else{
      this.size = 'small';
    }
    next();
  });

  AnimalSchema.statics.findSize = function(size,callback){
    return this.find({size: size}, callback);
  }

  AnimalSchema.methods.findSameColor = function(callback) {
    //this == document
    return this.model('Animal').find({color: this.color}, callback);
  }

  const Animal = mongoose.model("Animal", AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    color: "gray",
    mass: 6000,
    name: "Lawrence"
  });

  var animal = new Animal({});//goldfish
  var whale = new Animal({
    type: 'whale',
    mass: 190500,
    name: 'Fig'
  });

  var animalData = [
    {
      type: 'mouse',
      color: 'grey',
      mass: 0.35,
      name: 'marvin'
    },
    {
      type: 'nutria',
      color: 'brown',
      mass: 6.35,
      name: 'Gretchgen'
    },
    {
      type: 'wolf',
      color: 'grey',
      mass: 45,
      name: "Steve"
    },
    elephant,
    animal,
    whale
  ];

  Animal.remove({}, function(err){
    if(err) console.error(err);
    Animal.create(animalData, function(err,animals){
        if(err) console.error(err);
        Animal.findOne({type:"elephant"}},function(err, elephant){
          elephant.findSameColor(function(err,animals){
            if(err) console.error(err);
            animals.forEach(function(animal){
              console.log(animal.name + " the " + animal.color + " " + animal.type + amimal.size + "-sized animal");
            });
            db.close(function(){
              console.log("Connection Closed");
            });
          });

        });
      });
    });
  });
