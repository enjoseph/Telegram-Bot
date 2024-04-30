let questions = [
  {
    id: 1,
    pollID: false,
    question: "What's the output?",
    code: `function sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Lydia';\n  let age = 21;\n}\n\nsayHi()`,
    options: [
      "Lydia and undefined",
      "Lydia and ReferenceError",
      "ReferenceError and 21",
      "undefined and ReferenceError",
    ],
    correctAnswerIndex: "3",
    explanation:
      "Within the function, we first declare the `name` variable with the `var` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of `undefined`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the `name` variable, so it still holds the value of `undefined`.\n\nVariables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the 'temporal dead zone'. When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`.",
  },
  {
    id: 2,
    pollID: false,
    question: "What's the output?",
    code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}",
    options: ["0 1 2 and 0 1 2", "0 1 2 and 3 3 3", "3 3 3 and 0 1 2"],
    correctAnswerIndex: "2",
    explanation:
      "Because of the event queue in JavaScript, the `setTimeout` callback function is called after the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.\n\nIn the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop.",
  },
  {
    id: 3,
    pollID: false,
    question: "What's the output?",
    code: "const shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2;\n  },\n  perimeter: () => 2 * Math.PI * this.radius\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());",
    options: [
      "20 and 62.83185307179586",
      "20 and NaN",
      "20 and 63",
      "NaN and 63",
    ],
    correctAnswerIndex: "2",
    explanation:
      "Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.\n\nWith arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example).\n\nThere is no value `radius` on that object, which returns `undefined`.",
  },
  {
    id: 4,
    pollID: false,
    question: "What's the output?",
    code: "+true;\n!'Lydia';",
    options: ["1 and false", "false and NaN", "false and false"],
    correctAnswerIndex: "0",
    explanation:
      "The unary plus tries to convert an operand to a number. `true` is `1`, and `false` is `0`.\n\nThe string `'Lydia'` is a truthy value. What we're actually asking, is 'is this truthy value falsy?'. This returns `false`.",
  },
  {
    id: 5,
    pollID: false,
    question: "Which one is true?",
    code: "const bird = {\n  size: 'small',\n};\n\nconst mouse = {\n  name: 'Mickey',\n  small: true,\n};",
    options: [
      "mouse.bird.size is not valid",
      "mouse[bird.size] is not valid",
      'mouse[bird["size"]] is not valid',
      "All of them are valid",
    ],
    correctAnswerIndex: "0",
    explanation:
      "In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood.\n\nJavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement.\n\n`mouse[bird.size]`: First it evaluates `bird.size`, which is `'small'`. `mouse[\"small\"]` returns `true`\n\nHowever, with dot notation, this doesn't happen. `mouse` does not have a key called `bird`, which means that `mouse.bird` is `undefined`. Then, we ask for the `size` using dot notation: `mouse.bird.size`. Since `mouse.bird` is `undefined`, we're actually asking `undefined.size`. This isn't valid, and will throw an error similar to `Cannot read property \"size\" of undefined`.",
  },
  {
    id: 6,
    pollID: false,
    question: "What's the output?",
    code: "let c = { greeting: 'Hey!' };\nlet d;\n\nd = c;\nc.greeting = 'Hello';\nconsole.log(d.greeting);",
    options: ["Hello", "Hey!", "undefined", "ReferenceError", "TypeError"],
    correctAnswerIndex: "0",
    explanation:
      "In JavaScript, all objects interact by reference when setting them equal to each other.\n\nFirst, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.\n\nWhen you change one object, you change all of them.",
  },
  {
    id: 7,
    pollID: false,
    question: "What's the output?",
    code: "let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);",
    options: [
      "true false true",
      "false false true",
      "true false false",
      "false true true",
    ],
    correctAnswerIndex: "2",
    explanation:
      "`new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.\n\nWhen we use the `==` operator, it only checks whether it has the same value. They both have the value of `3`, so it returns `true`.\n\nHowever, when we use the `===` operator, both value and type should be the same. It's not: `new Number()` is not a number, it's an object. Both return `false`.",
  },
  {
    id: 8,
    pollID: false,
    question: "What's the output?",
    code: "class Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n\n  constructor({ newColor = 'green' } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: 'purple' });\nconsole.log(freddie.colorChange('orange'));",
    options: ["orange", "purple", "green", "TypeError"],
    correctAnswerIndex: "3",
    explanation:
      "The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children. Since `freddie` is a child, the function is not passed down, and not available on the `freddie` instance: a `TypeError` is thrown.",
  },
  {
    id: 9,
    pollID: false,
    question: "What's the output?",
    code: "let greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);",
    options: ["{}", "ReferenceError: greetign is not defined", "undefined"],
    correctAnswerIndex: "0",
    explanation:
      'It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as `global.greetign = {}` (or `window.greetign = {}` in a browser).\n\nIn order to avoid this, we can use "use strict". This makes sure that you have declared a variable before setting it equal to anything.',
  },
  {
    id: 10,
    pollID: false,
    question: "What happens when we do this?",
    code: "function bark() {\n  console.log('Woof!');\n}\n\nbark.animal = 'dog';",
    options: [
      "Nothing, this is totally fine!",
      "SyntaxError. You cannot add properties to a function this way.",
      '"Woof" gets logged.',
      "ReferenceError",
    ],
    correctAnswerIndex: "0",
    explanation:
      "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)\n\nA function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.",
  },
];


module.exports = questions