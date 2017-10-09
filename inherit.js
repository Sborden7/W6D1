
// ES5
// Function.prototype.inherits = function(parent) {
//   function Surrogate(){}
//   Surrogate.prototype = parent.prototype;
//   this.prototype = new Surrogate();
//   this.prototype.constructor = this;
// };

//Object Create

Function.prototype.inherits = function(parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};


function Animal(name) {
  this.name = name;
}

Animal.prototype.moves = function(){
  console.log(`${this.name} is moving`);
};

function Cat(name, hairColor){
  Animal.call(this, name);
  this.hairColor = hairColor;
}

Cat.inherits(Animal);

Cat.prototype.meows = function(){
  console.log(`${this.name} meooowwwsss`);
};
