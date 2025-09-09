1) What is the difference between var, let, and const?

ans:
Var: Function-scoped, hoisted, and capable of being updated and redeclared.

 Let: Block-scoped, hoisted but not initialized, updateable but not redeclared in the same scope.

 const: Block-scoped, requires initialization, and cannot be updated or redeclared.
 

 2) What is the difference between map(), forEach(), and filter()?

ans:
map(): After giving each element a function, it returns a new array.

 forEach(): Does not return anything; instead, it runs a function on each element.

 A new array containing elements that meet a condition is returned by the filter() function.


 3) What are arrow functions in ES6?

 ans: 
 Functions have a shorter syntax: (params) => expression.

 This is lexically bound.


4) How does destructuring assignment work in ES6?
 ans:
 In ES6 (ECMAScript 2015), destructuring assignment is a simple method of assigning values to variables in 
 a clear syntax after extracting values from arrays or properties from objects. You can "unpack" each element
 or property directly rather than gaining access to them one at a time.


5) Explain template literals in ES6. How are they different from string concatenation?

ans:

A feature of ES6 called Template Literals makes working with strings simpler and easier to read, particularly when working with multi-line strings, expressions, or interpolation (embedding variables).

Difference from concatenation:

a.Syntax cleaner (\My name is ${name}` as opposed to "My name is " + name`)

b.Allows for multi-line without

c.evaluates expressions inside ${} directly.
