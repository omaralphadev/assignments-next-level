# Why do we need Type-narrowing in Typescript ?

## Introduction
Type Narrowing is a feature in TypeScript that allows us to refine a variable's type from a broader type to a more specific type based on conditional checks.

 When a variable can have multiple types `(such as string | number)`, TypeScript uses control flow analysis to determine its specific type within a particular code block. This technique helps us write safer code by ensuring that we only perform operations supported by the variable's actual type.

 ## Type Narrowing techniques
 There are multiple techniques of narrowing types. Few of the techniques have been discussed below.

 ### Type Narrowing Using `typeof`

 The `typeof` operator is used to check the type of a variable at runtime. It is particularly useful for narrowing primitive types such as `string`, `number`, and `boolean`.

 ```TS

function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value.toFixed(2);
}

console.log(formatValue("hello")); 
console.log(formatValue(25.567));  
 ```
 #### Explanation:
- Initially, value can be either a `string` or a `number`.
- If `typeof value === "string"`, TypeScript narrows `value` to `string`, allowing us to use `toUpperCase()`.
- Otherwise, TypeScript knows `value` must be a `number`, allowing us to use `toFixed()`.


### Type Narrowing Using `instanceof`
The `instanceof` operator checks whether an object is an instance of a particular class or constructor. It is especially useful when working with classes, custom objects, and built-in types such as `Date` and `Error`.
```TS

class Admin {
    manageUsers(): void {
        console.log("Managing users...");
    }
}

class Customer {
    placeOrder(): void {
        console.log("Placing an order...");
    }
}

function performAction(user: Admin | Customer): void {
    if (user instanceof Admin) {
        user.manageUsers();
    } else {
        user.placeOrder();
    }
}

performAction(new Admin());    
performAction(new Customer()); 
```
#### Explanation:
- The `user` parameter can be either an `Admin` or a `Customer`.
- `instanceof` `Admin` checks whether the object was created from the `Admin` class.
- If the condition is `true`, TypeScript narrows user to `Admin`.
- Otherwise, TypeScript narrows it to `Customer`.

This allows us to safely access methods specific to each class.


### Type Narrowing Using the in Operator
The `in` operator checks whether a specified property exists in an object or its prototype chain. It is useful when working with union types containing different object structures.
```TS

type Dog = {
    name: string;
    bark: () => void;
};

type Cat = {
    name: string;
    meow: () => void;
};

function makeSound(animal: Dog | Cat): void {
    if ("bark" in animal) {
        animal.bark();
    } else {
        animal.meow();
    }
}

const dog: Dog = {
    name: "Buddy",
    bark: () => console.log("Woof!")
};

const cat: Cat = {
    name: "Kitty",
    meow: () => console.log("Meow!")
};

makeSound(dog); // "Woof!"
makeSound(cat); // "Meow!"
```
#### Explanation:
- Initially, animal can be either a Dog or a Cat.
- The condition "bark" in animal checks whether the object contains a bark property.
- If true, TypeScript narrows animal to Dog.
- Otherwise, TypeScript narrows it to Cat.

This allows us to access the appropriate method without TypeScript errors.

## Conclusion:
Type narrowing is how TypeScript figures out what a value really is, based on the checks you write. Inside an if block, TypeScript knows more about the value than it did before, so you can use it safely and avoid runtime errors.

There are three common ways to narrow a type:
- `typeof` checks primitive types like strings and numbers.
- `instanceof` checks whether something is an instance of a class.
- `in` checks whether an object has a certain property, which helps you tell similar objects apart.

One thing to remember, narrowing doesn’t change your value at all. It only changes what TypeScript knows about it at that point in your code.