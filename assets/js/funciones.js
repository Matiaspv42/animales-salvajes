c = 3
d = 4

var iife = ((a = 1,b = 3)=>{
    console.log(a,b);
})(c,d)



iife