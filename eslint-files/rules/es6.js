"use strict";

module.exports = {
    // require braces in arrow function body
    "arrow-body-style": 0,
    // require parens in arrow function arguments
    "arrow-parens": 2,
    // require space before/after arrow function's arrow
    "arrow-spacing": 2,
    // verify super() callings in constructors
    "constructor-super": 2,
    // enforce the spacing around the * in generator functions
    "generator-star-spacing": 2,
    // Disallow arrow functions where they could be confused with comparisons
    "no-confusing-arrow": 2,
    // disallow constant expressions in conditions
    "no-constant-condition": 2,
    // disallow modifying variables of class declarations
    "no-class-assign": 2,
    // disallow modifying variables that are declared using const
    "no-const-assign": 2,
    // disallow duplicate name in class members
    "no-dupe-class-members": 2,
    // disallow to use this/super before super() calling in constructors.
    "no-this-before-super": 2,
    // require let or const instead of var
    "no-var": 0, // !!!!!!!!! consider error !!!!!!!!!!!!!!!!!!!!!
    // require method and property shorthand syntax for object literals
    "object-shorthand": 2,
    // suggest using arrow functions as callbacks
    "prefer-arrow-callback": 1,
    // suggest using of const declaration for variables that are never modified after declared
    "prefer-const": 2,
    // suggest using Reflect methods where applicable
    "prefer-reflect": 0,
    // suggest using the spread operator instead of .apply()
    "prefer-spread": 0,
    // suggest using template literals instead of strings concatenation
    "prefer-template": 0, // !!!!!!!!! consider warning !!!!!!!!!!!!!!!!!!!!!
    // disallow generator functions that do not have yield
    "require-yield": 2
};
