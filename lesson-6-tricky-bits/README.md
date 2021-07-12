# Tricky Bits and Useful Bits


## TypeScript Utility Types 

TODO: link

The TypeScript utility types are your friend, get used to looking them up to see if the can do something you need. 


## ReadOnly type. 

TypeScript has this concept of
 Readonly types, which reflects the native JavaScript immutability features. 


Note though, that when we compile this TypeScript isn't injecting 'Object.freeze' functionality into this code, at runtime these objects are mutable!

Note that the Readonly type is also shallow. 

If you wanted a DeepReadonly: TODO

However, if you use the Object.freeze functionality then its output is a Readonly type. 


## Type Widening on strings that are on objects

This brings us to our first pitfall you may encounter in TypeScript: 

 