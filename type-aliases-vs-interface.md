# Core differences between type and interface in Typescript

## Introduction
In Typescript, both `type-aliases` and `interface` are used to define the structure of data and enforce type safety. 

A type alias in TypeScript allows you to create a custom name for a type using the type keyword.
Instead of repeatedly writing the same type definition, you can define it once and reuse it throughout your code.
```TS
type UserName = string;
let name: UserName = "John";
```

An `interface` in TypeScript is a way to define the structure (or shape) of an object. It specifies what properties and methods an object should have and what their types must be.
```TS
interface User {
  name: string;
  age: number;
  email: string;
}

const user1: User = {
  name: "John",
  age: 25,
  email: "john@example.com"
};
```

## Core differences between the two approaches
Even though they have some simmilaties, there are dissimilarities as well. In this blog some core differences between `type` and `interface` has been described.

### 1.Flexibility in defining types

In Typescript, `type` can be used to define any types, while `interface` can be used to define only object type.
```TS
//Using type
type UserId = string | number;

type Status = "pending" | "approved" | "rejected";

type Coordinates = [number, number];

type User = {
  id: UserId;
  name: string;
  status: Status;
};

//Using interface
interface User {
    id: number;
    name: string;
    status: boolean;
}
const user: User = {
    id: 1,
    name: "Omar",
    status: true
}
```

### 2.Extending and combining types
Both approaches support creating new types from existing ones, but their syntax differs.
```TS
//Using interface
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

//Using type
type Person = {
  name: string;
  age: number;
};

type Employee = Person & {
  employeeId: number;
  department: string;
};
```

### 3.Declaration merging
This is one of the most important differences. TypeScript allows multiple `interface` declarations with the same name to merge automatically.
```TS

interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "John",
  age: 25
};
```
TypeScript combines both declarations into a single User `interface` containing name and age.

However, `type` do not support declaration merging.
```TS
type User = {
  name: string;
};

// Error: Duplicate identifier 'User'
type User = {
  age: number;
};
```
Once a `type` is declared, it cannot be declared again in the same scope.

This makes `interface` particularly useful when designing extensible libraries and APIs where other developers may need to augment existing declarations.


## When should we choose which one ?
This decision depends on spcifically the use case.

Choose `interface` when:
- You are defining the structure of objects, such as users, products, or API request bodies.
- You are working with classes that implement contracts.
- You want to extend object structures using extends.
- You are building libraries where declaration merging or type augmentation is useful.
```TS
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
}

class SystemAdmin implements Admin {
  id = 1;
  name = "John";
  email = "john@example.com";
  permissions = ["read", "write", "delete"];
}
```


Choose `type` when:
- You need union types, tuple types, or primitive aliases.
- You are combining different types using intersections.
- You are creating complex types with mapped types, conditional types, or utility types.
- You want a fixed definition that cannot be expanded through declaration merging.
```TS
type Role = "admin" | "user" | "moderator";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

type UserResponse = ApiResponse<{
  id: number;
  name: string;
  role: Role;
}>;
```


## Conclusion

Both `type` and `interface` help you describe the shape of your data in TypeScript. They overlap a lot, but each has its strengths.

- **Use `interface`** when you're describing objects, working with classes, or need declaration merging (where TypeScript combines multiple declarations with the same name).

- **Use `type`** when you need something more flexible, like unions, tuples, primitives, or more complex combinations of types.

There's no single winner. Pick the one that fits what you're building. Knowing the difference just helps you write code that's cleaner and easier to maintain.