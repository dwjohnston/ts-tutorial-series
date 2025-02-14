# Lesson 1 - Introduction to TypeScript

## What is TypeScript?

The purpose of TypeScript is to add static typing to JavaScript.

Functionally, *TypeScript is just JavaScript*  - TypeScript can't do anything that JavaScript can't do. All TypeScript can really do is give you errors before runtime. 

Syntatically, TypeScript is a superset of JavaScript - ie. all valid JavaScript is valid TypeScript, but not all TypeScript is a valid JavaScript. 

## 1.1 TypeScript compiles to JavaScript. 

In index1.ts - I have written some complicated TypeScript code, using generics, conditional types, Type Coercion. 

**Exercise** 

Run `yarn build:1` and examine `lib/index1.js` - Note that all of the generics, conditonal types, type coercion has been stripped out - it's just plain recognisable JavaScript left. 

## 1.2 TypeScript is a compiler (like Babel is a compiler)

Note that the compiled code has ES6 features (arrow function) and modern ESM modules (export syntax). 

If we were to run this code on node, we would run into issues, because node by itself doesn't recognise ESM modules. 

**Exercise**

Run `yarn start:1` and note what error message you get. 


Modules and EcmaScript features are a whole nother discussion, that isn't specific to TypeScript. But basically the typical solution is that we compile down to ES5 and CJS modules to ensure our code can be run easily other runtimes and by code that would be importing our code as a package. 

The format of the code is controlled by the `target` and `modules` properties of the `tsconfig.json`. 

**Excercise**

Change `target` to `es5` and `modules` to `commonjs` and then run `yarn build:1` again - see how the output changes. 

## 1.3 Lib

In the same vein as configuring the format of the code that TypeScript is going to compile to, TypeScript also needs to know what features of EcmaScript it is using. 

(Btw, what's the difference between EcmaScript and JavaScript - basically the same thing - as a convention I use the term 'EcmaScript' when referring to feature proposals etc, as that's the term they use)

Basically JavaScript is not an unchanging language - it is constantly being updated with new features, and those exist in a different state of lifestyle from proposed to adopted etc. 

**Exercise**

Open `index2.ts`

Note you have an error: 

>Property 'flatMap' does not exist on type 'number[][]'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)

TypeScript is being quite helpful in telling us what's wrong here - the problem is that the `flatMap` function doesn't exist on JavaScript until later verions. 

**Exercise**

Change `lib` in `tsconfig.json` to `ES2019`. Observe that the error goes away. YOU MAY NEED TO RESTART YOUR VSCODE!


## 1.4 - d.ts files. 


**Exercise** 

Change `declaration` to `true` in `tsconfig.json`. 

Run `yarn build:2`. 

Observe that an `index2.d.ts` file has been created in the `lib` folder. 

These files don't run by themselves. Instead they sit along side the `.js` files and tell TypeScript about the typings. This is how we can export typings as part of a library. 




