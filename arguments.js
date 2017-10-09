// function sum() {
//   const args = Array.prototype.slice.call(arguments);
//   return args.reduce( (a,b) => a + b );
// }

function sum(...args) {
  return args.reduce( (a,b) => a + b );
}


Function.prototype.myBind = function(ctx) {
  const bindArgs = Array.prototype.slice.call(arguments, 1);
  const origFunc = this;

  return function() {
    const callArgs = Array.prototype.slice.call(arguments);
    return origFunc.apply(ctx, bindArgs.concat(callArgs));
  };
};


// Function.prototype.myBind = function(ctx, ...bindArgs) {
//   return (...callArgs) => {
//     this.call(ctx, ...bindArgs.concat(callArgs));
//   };
// };


function curriedSum(numArgs) {
  const nums = [];

  const _sum = (num) => {
    nums.push(num);

    if (nums.length === numArgs) {
      return nums.reduce( (a,b) => a + b);
    } else {
      return _sum;
    }
  };

  return _sum;
}

Function.prototype.curry = function(numArgs){
  const args = [];
  // const origFunc = this;

  const _func = (arg) => {
    args.push(arg);
    if (args.length === numArgs) {
      return this.apply(null, args);
    } else {
      return _func;
    }
  };
  return _func;
};


// Function.prototype.curry = function(numArgs){
//   const args = [];
//   const origFunc = this;
//
//   const _func = (arg) => {
//     args.push(arg);
//     if (args.length === numArgs) {
//       return origFunc(...args);
//     } else {
//       return _func;
//     }
//   };
//   return _func;
// };



const newSum = function(){
    const args = Array.prototype.slice.call(arguments);
    return args.reduce( (a,b) => a + b );
};

const currySum = newSum.curry(3);
console.log(currySum(3)(3)(3));
