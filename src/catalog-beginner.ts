export type LearningLevel =
  | "Level 1: Start from zero"
  | "Level 2: Practise by building"
  | "Level 3: Explore real engineering";

export type BeginnerPedagogy = {
  level: LearningLevel;
  durationLabel: string;
  conceptExplanation: string;
  workedExample: {
    code: string;
    lineByLine: string[];
  };
  guidedActivity: string;
  milestones: { title: string; detail: string }[];
};

export type BeginnerExerciseSeed = {
  id: string;
  title: string;
  initiative_id: string;
  trackIndex: 0 | 1 | 2 | 3;
  level: LearningLevel;
  durationLabel: string;
  category:
    | "Programming & Git"
    | "Web Development"
    | "Databases & APIs"
    | "Data Structures & Algorithms"
    | "Systems & Networking"
    | "AI & Machine Learning"
    | "Cybersecurity"
    | "Software Engineering & Testing";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  effort: number;
  description: string;
  overview: string;
  prerequisites: string;
  prerequisiteIds: string[];
  objectives: string[];
  conceptExplanation: string;
  workedExample: {
    code: string;
    lineByLine: string[];
  };
  guidedActivity: string;
  milestones: { title: string; detail: string }[];
  problemStatement: string;
  constraints: string[];
  expectedOutput: string;
  hints: string[];
  testCases: { input: string; expected: string; note: string }[];
  instructions: string[];
  criteria: string[];
  deliverable: string;
  solutionReference: string;
  furtherChallenges: string[];
  relatedIds: string[];
  resources: { name: string; url: string }[];
};

export const LEVEL_1_AND_2_EXERCISES: BeginnerExerciseSeed[] = [
  // ============================================================================
  // LEVEL 1: START FROM ZERO (No project experience required)
  // ============================================================================
  {
    id: "print-your-name",
    title: "Print your name and first message on the screen",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "15–25 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Variables"],
    effort: 1,
    description:
      "Write and run your very first program that prints a greeting and a short introduction on the screen.",
    overview:
      "Every programmer starts right here: writing a few lines of code in a file, running it in the terminal or browser console, and seeing the computer print back your message. You don't need any prior coding experience to complete this exercise.",
    prerequisites:
      "No prior coding experience needed. You just need a text editor (like VS Code) and Node.js (or your web browser's Console tab).",
    prerequisiteIds: [],
    objectives: [
      "Display text on the screen using `console.log()`.",
      "Store a piece of text (a string) inside a variable using `const`.",
    ],
    conceptExplanation:
      "A computer program is a list of instructions executed from top to bottom. In JavaScript, `console.log(...)` tells the computer to print whatever is inside the parentheses onto the screen. Any text you want to print goes inside quotation marks, like `\"Hello!\"`, so the computer knows it is plain text and not a command.",
    workedExample: {
      code: `const name = "Aarav";
console.log("Hello, my name is " + name);
console.log("I am learning to code with TDA!");`,
      lineByLine: [
        "Line 1 creates a named box (variable) called `name` and stores the text `\"Aarav\"` inside it.",
        "Line 2 joins `\"Hello, my name is \"` with the value inside `name` and prints the full sentence.",
        "Line 3 prints a second line right below the first one.",
      ],
    },
    guidedActivity:
      "Create a file named `hello.js`, copy the 3-line example above into it, and change `\"Aarav\"` to your own name. Run `node hello.js` in your terminal (or paste it into your browser's Developer Console) and watch your name appear.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Learn how `console.log()` prints a line of text and how `const` saves a value so you can reuse it.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Run the 3-line greeting program and see how each line of code produces one line of output.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Replace the example name with your own name and add a second variable called `branch` or `hobby`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Print a 3-line introduction card showing your name, your favourite subject or hobby, and one thing you want to build this year.",
      },
    ],
    problemStatement:
      "Write a short script (`hello.js`) that stores your `name`, `year`, and `goal` in variables and prints a friendly 3-line introduction to the screen.",
    constraints: [
      "Use `const` variables to hold your name and goal instead of typing them directly inside `console.log`.",
      "Make sure every quotation mark `\"` has a matching closing quotation mark.",
    ],
    expectedOutput: `Hello, my name is Ananya
I am in Year 1
My goal: Build my first website`,
    hints: [
      "If you see `ReferenceError: Ananya is not defined`, check that you wrapped your text in quotes: `\"Ananya\"`.",
      "You can combine text and variables cleanly using template backticks: ``console.log(`Hello, my name is ${name}`)``.",
    ],
    testCases: [
      {
        input: "Run `node hello.js` in the terminal",
        expected: "Prints 3 clear lines containing your name, year, and goal without any error messages",
        note: "First program execution",
      },
      {
        input: "Change the `name` variable at the top of the file and re-run",
        expected: "The printed greeting updates automatically to show the new name",
        note: "Variable reuse check",
      },
    ],
    instructions: [
      "Open a new file called `hello.js` in your editor.",
      "Create three `const` variables: `name`, `year`, and `goal`.",
      "Use three `console.log()` statements to print your introduction on separate lines.",
      "Run `node hello.js` in your terminal and check that the output matches what you expected.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working `hello.js` script that stores your details in variables and prints a 3-line introduction.",
    solutionReference:
      "Using `const name = \"...\";` at the top of your file means if you use `name` in five places later, you only ever have to update it in one spot.",
    furtherChallenges: [
      "Print a decorative ASCII box around your introduction using `+---+` and `|` characters.",
      "Try using backtick template strings (`` `Hello, ${name}!` ``) instead of the `+` sign.",
    ],
    relatedIds: ["variables-and-calculator", "conditions-grade-helper"],
    resources: [
      { name: "JavaScript.info — Hello, world!", url: "https://javascript.info/hello-world" },
      { name: "JavaScript.info — Variables", url: "https://javascript.info/variables" },
    ],
  },
  {
    id: "variables-and-calculator",
    title: "Create a simple calculator",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "25–35 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Variables"],
    effort: 1,
    description:
      "Practise numbers, variables, and basic math operations (+, -, *, /) by building a clean calculator script.",
    overview:
      "Once you can print text, the next step is working with numbers. In this exercise you'll store numbers in variables, add, subtract, multiply, and divide them, and learn how to avoid the most common beginner mistake: accidentally joining numbers as text (`\"5\" + \"3\"` becoming `\"53\"`)!",
    prerequisites:
      "Printing text and creating `const` variables (from 'Print your name and first message').",
    prerequisiteIds: ["print-your-name"],
    objectives: [
      "Perform addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`) on number variables.",
      "Understand the difference between a number (`10`) and a string of digits (`\"10\"`).",
    ],
    conceptExplanation:
      "When you write `const a = 12;` without quotation marks, JavaScript treats `12` as a real number that you can do math with. If you write `\"12\"` with quotes, JavaScript treats it as text characters, so `\"12\" + \"5\"` glues them together into `\"125\"` instead of adding them to get `17`.",
    workedExample: {
      code: `const firstNumber = 20;
const secondNumber = 4;

const sum = firstNumber + secondNumber;
const product = firstNumber * secondNumber;

console.log("Sum:", sum);
console.log("Product:", product);`,
      lineByLine: [
        "Lines 1–2 store two numbers (`20` and `4`) without quotes so JavaScript knows they are numbers.",
        "Line 4 adds them together (`20 + 4`) and saves `24` in `sum`.",
        "Line 5 multiplies them (`20 * 4`) and saves `80` in `product`.",
        "Lines 7–8 print the labels and calculated answers.",
      ],
    },
    guidedActivity:
      "Copy the example into `calculator.js` and add two more variables: `difference` (using `-`) and `quotient` (using `/`). Print both results to the screen.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Numbers don't use quotes. The four basic math symbols in code are `+`, `-`, `*` (multiply), and `/` (divide).",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Run the addition and multiplication example with `20` and `4`.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Add subtraction (`-`) and division (`/`) and print all four results.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Add a check so that if `secondNumber` is `0`, your calculator prints a friendly message `\"Cannot divide by zero\"` instead of `Infinity`.",
      },
    ],
    problemStatement:
      "Create a script `calculator.js` that takes two numbers `a` and `b`, prints their sum, difference, product, and division result, and safely handles `b === 0`.",
    constraints: [
      "Store `a` and `b` as numbers (not strings).",
      "If `b === 0`, print `\"Division: Cannot divide by zero\"` instead of dividing.",
    ],
    expectedOutput: `Numbers: 15 and 3
Sum: 18
Difference: 12
Product: 45
Division: 5`,
    hints: [
      "Use `*` (the asterisk key) for multiplication and `/` (forward slash) for division.",
      "To check if `b` is zero, write: `if (b === 0) { console.log(\"Division: Cannot divide by zero\"); } else { console.log(\"Division:\", a / b); }`.",
    ],
    testCases: [
      {
        input: "a = 15, b = 3",
        expected: "Prints Sum: 18, Difference: 12, Product: 45, Division: 5",
        note: "Standard four operations",
      },
      {
        input: "a = 15, b = 0",
        expected: "Prints Sum: 15, Difference: 15, Product: 0, Division: Cannot divide by zero",
        note: "Zero division check",
      },
    ],
    instructions: [
      "Create `calculator.js` and define two number variables `a` and `b`.",
      "Calculate and print their sum (`a + b`), difference (`a - b`), and product (`a * b`).",
      "Use an `if / else` check on `b === 0` before printing the division result.",
      "Test your script with `(15, 3)`, `(10, 4)`, and `(15, 0)`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working calculator script that prints all four operations and handles division by zero safely.",
    solutionReference:
      "Always check boundary values like `b === 0` before dividing. Using `Number(input)` converts text input like `\"42\"` into the number `42`.",
    furtherChallenges: [
      "Use the remainder operator `%` (`a % b`) to also print the remainder after division.",
      "Read the two numbers from the terminal command line using `Number(process.argv[2])` and `Number(process.argv[3])`.",
    ],
    relatedIds: ["print-your-name", "conditions-grade-helper", "number-guessing-game"],
    resources: [
      { name: "JavaScript.info — Basic Operators & Maths", url: "https://javascript.info/operators" },
    ],
  },
  {
    id: "conditions-grade-helper",
    title: "Make decisions with if / else conditions",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "25–35 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Logic"],
    effort: 1,
    description:
      "Teach your program to make decisions using comparisons (>=, ===) and if / else branches.",
    overview:
      "Programs become useful when they can react differently depending on the input — like checking whether a password is long enough, whether a number is even or odd, or what feedback to show for a quiz score.",
    prerequisites:
      "Variables and basic math operations (from 'Create a simple calculator').",
    prerequisiteIds: ["variables-and-calculator"],
    objectives: [
      "Compare values using `===` (equal to), `>=` (greater than or equal to), and `<` (less than).",
      "Write `if`, `else if`, and `else` blocks so exactly one branch runs.",
    ],
    conceptExplanation:
      "An `if` statement asks a true-or-false question. When the condition inside `if (...)` is true, the code inside its curly braces `{ ... }` runs. If it is false, JavaScript skips down to the next `else if` or `else` block.",
    workedExample: {
      code: `const score = 78;

if (score >= 80) {
  console.log("Result: Distinction!");
} else if (score >= 50) {
  console.log("Result: Passed!");
} else {
  console.log("Result: Keep practising — you'll get there!");
}`,
      lineByLine: [
        "Line 1 sets `score` to `78`.",
        "Line 3 checks if `78 >= 80`. That is false, so JavaScript skips line 4.",
        "Line 5 checks if `78 >= 50`. That is true, so line 6 prints `\"Result: Passed!\"` and skips the final `else`.",
      ],
    },
    guidedActivity:
      "Run the example above with `score = 78`, then change `score` to `92` and `35` to verify that all three branches work.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Conditions are checked from top to bottom. As soon as one `if` or `else if` is true, its block runs and the rest are skipped.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Trace how `score = 78` skips the `>= 80` branch and matches `>= 50`.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Add a check at the very top that catches invalid scores below `0` or above `100`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Also check whether the score is an even or odd number using `score % 2 === 0`.",
      },
    ],
    problemStatement:
      "Write a script `decisions.js` that validates a `score` (`0` to `100`), prints the corresponding feedback tier (`Distinction` for 80+, `Merit` for 65–79, `Pass` for 50–64, `Retry` for below 50), and reports whether the number is even or odd.",
    constraints: [
      "If `score < 0` or `score > 100`, print `\"Invalid score: must be between 0 and 100\"`.",
      "Use `===` (triple equals) for equality comparisons rather than `=` (which assigns a value).",
    ],
    expectedOutput: `Score: 72 (Even)
Tier: Merit`,
    hints: [
      "Use the logical OR operator `||` to check out-of-range values: `if (score < 0 || score > 100)`.",
      "A number is even when dividing by 2 leaves a remainder of 0: `score % 2 === 0`.",
    ],
    testCases: [
      {
        input: "score = 85",
        expected: "Prints Score: 85 (Odd) and Tier: Distinction",
        note: "Top tier check",
      },
      {
        input: "score = 120",
        expected: "Prints Invalid score: must be between 0 and 100",
        note: "Out-of-range guard",
      },
    ],
    instructions: [
      "Create `decisions.js` with a `score` variable.",
      "Check `if (score < 0 || score > 100)` first so invalid numbers are caught immediately.",
      "Add `else if` branches for `>= 80`, `>= 65`, `>= 50`, and `else` for `< 50`.",
      "Test your code with `-5`, `42`, `65`, `88`, and `105`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working `decisions.js` script that categorizes scores and validates out-of-range inputs.",
    solutionReference:
      "Order your `else if` conditions from highest threshold to lowest (`>= 80`, then `>= 65`, then `>= 50`) so a score of `85` doesn't accidentally stop at `>= 50` first!",
    furtherChallenges: [
      "Build a leap-year checker: a year is a leap year if divisible by 400, OR divisible by 4 and NOT divisible by 100.",
    ],
    relatedIds: ["variables-and-calculator", "number-guessing-game"],
    resources: [
      { name: "JavaScript.info — Conditional Branching: if, '?'", url: "https://javascript.info/ifelse" },
    ],
  },
  {
    id: "number-guessing-game",
    title: "Write a number-guessing game with loops",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "30–45 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Loops", "Logic"],
    effort: 2,
    description:
      "Use a loop and conditions to check a sequence of guesses against a secret number and give 'Too high' or 'Too low' hints.",
    overview:
      "Instead of copying and pasting the same code ten times, a loop lets your program repeat an action until a goal is reached. A number-guessing game is the classic, fun way to combine variables, `if / else` hints, and `for` / `while` loops.",
    prerequisites:
      "Variables and `if / else` conditions (from 'Make decisions with if / else').",
    prerequisiteIds: ["conditions-grade-helper"],
    objectives: [
      "Repeat actions using a `for` loop and count how many attempts were taken.",
      "Stop a loop early with `break` as soon as the secret number is found.",
    ],
    conceptExplanation:
      "A `for` loop steps through a list or a range of numbers one by one. Inside the loop, we compare the current `guess` against the `secretNumber`: if the guess is smaller, we print `\"Too low\"`; if larger, `\"Too high\"`; and if equal, we celebrate and use `break` to stop looping.",
    workedExample: {
      code: `const secret = 7;
const guesses = [3, 9, 7, 10];

for (let i = 0; i < guesses.length; i++) {
  const guess = guesses[i];
  if (guess === secret) {
    console.log("Attempt " + (i + 1) + ": " + guess + " -> Correct!");
    break;
  } else if (guess < secret) {
    console.log("Attempt " + (i + 1) + ": " + guess + " -> Too low");
  } else {
    console.log("Attempt " + (i + 1) + ": " + guess + " -> Too high");
  }
}`,
      lineByLine: [
        "Lines 1–2 set the secret number (`7`) and a list of player guesses `[3, 9, 7, 10]`.",
        "Line 4 starts a loop where `i` counts `0, 1, 2, ...` up to the end of the list.",
        "Lines 6–8 check if `guess === secret`. On attempt 3 (`guess = 7`), it prints `Correct!` and `break` stops the loop so `10` is never checked.",
        "Lines 9–13 print `Too low` (for `3`) and `Too high` (for `9`).",
      ],
    },
    guidedActivity:
      "Run the example above and observe why `10` is never printed. Then change `secret` to `12` and see what happens when none of the guesses match!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "A loop repeats a check for each guess, and `break` exits the loop as soon as the player wins.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Run the 4-guess simulation and trace what `i` and `guess` equal on each turn.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Add a boolean variable `let won = false;` that becomes `true` when `guess === secret`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "After the loop finishes, check `if (!won)` and print `\"Game over! The secret number was 7.\"`.",
      },
    ],
    problemStatement:
      "Write a number-guessing game script (`guess.js`) that checks an array of guesses against a secret number between 1 and 20, prints `'Too low'`, `'Too high'`, or `'Correct in X attempts!'`, and prints a helpful game-over message if the player runs out of guesses.",
    constraints: [
      "Use `let` for variables that change (like `let won = false;` or loop counter `let i = 0;`) and `const` for values that stay fixed.",
      "Stop checking remaining guesses immediately after a correct guess.",
    ],
    expectedOutput: `Attempt 1: 10 -> Too low
Attempt 2: 18 -> Too high
Attempt 3: 14 -> Correct in 3 attempts!`,
    hints: [
      "Create `let won = false;` before the loop. Inside `if (guess === secret)`, set `won = true;` right before `break;`.",
      "Remember that array positions start at `0`, so attempt number is `i + 1`.",
    ],
    testCases: [
      {
        input: "secret = 14, guesses = [10, 18, 14, 15]",
        expected: "Prints Too low, Too high, then Correct in 3 attempts! (stops before 15)",
        note: "Winning mid-list with break",
      },
      {
        input: "secret = 14, guesses = [2, 5, 9]",
        expected: "Prints Too low for all 3, then 'Game over! The secret number was 14.'",
        note: "Out of attempts handling",
      },
    ],
    instructions: [
      "Create `guess.js` with `secret`, `guesses`, and `let won = false`.",
      "Loop through `guesses` and print the hint for each attempt.",
      "When `guess === secret`, set `won = true`, print the win message with `i + 1` attempts, and `break`.",
      "After the loop, print the game-over message if `!won`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working number-guessing game script with win detection, attempt counting, and game-over output.",
    solutionReference:
      "Tracking `let won = false` before the loop is a clean, readable pattern (a 'flag variable') to know after the loop whether the search succeeded.",
    furtherChallenges: [
      "Think about strategy: if the secret number is between 1 and 100 and you always guess the middle number (`50`, then `25` or `75`...), how many guesses do you need at most? (That's Binary Search!)",
    ],
    relatedIds: ["conditions-grade-helper", "functions-reusable-blocks", "binary-search-tests"],
    resources: [
      { name: "JavaScript.info — Loops: while and for", url: "https://javascript.info/while-for" },
    ],
  },
  {
    id: "functions-reusable-blocks",
    title: "Organise your code with reusable functions",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "30–40 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Functions"],
    effort: 1,
    description:
      "Learn how to package code into named functions that accept inputs (parameters) and return results.",
    overview:
      "Functions are the building blocks of every real program. Instead of writing the same calculation over and over, you give a block of code a name (like `calculateTotal` or `formatTask`), pass inputs into it, and get back an answer with `return`.",
    prerequisites:
      "Variables, conditions, and loops (from 'Write a number-guessing game').",
    prerequisiteIds: ["number-guessing-game"],
    objectives: [
      "Define a function with parameters and call it multiple times with different arguments.",
      "Understand the difference between `return` (sending a value back to the caller) and `console.log` (printing text to the screen).",
    ],
    conceptExplanation:
      "Think of a function like a kitchen blender: you put ingredients in through the top (the **parameters** inside `function makeSmoothie(fruit)`), the blender does its work, and it hands you back a finished drink (`return`). Once you `return` a value, you can store it in a variable, print it, or pass it into another function.",
    workedExample: {
      code: `function celsiusToFahrenheit(celsius) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}

const roomTemp = celsiusToFahrenheit(25);
const boiling = celsiusToFahrenheit(100);

console.log("25°C is " + roomTemp + "°F");
console.log("100°C is " + boiling + "°F");`,
      lineByLine: [
        "Line 1 defines a function named `celsiusToFahrenheit` that accepts one input parameter called `celsius`.",
        "Line 2 calculates the converted temperature.",
        "Line 3 uses `return` to hand the answer back to whoever called the function.",
        "Lines 6–7 call the function twice with different numbers (`25` and `100`) and store the returned answers.",
      ],
    },
    guidedActivity:
      "Run the temperature converter above, then call `celsiusToFahrenheit(0)` to check what freezing point (`0°C`) is in Fahrenheit.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Parameters are placeholders in the function definition; arguments are the real values you pass when calling it.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Trace how `25` flows into `celsius`, gets multiplied, and comes back out via `return`.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Write a second function `isFreezing(celsius)` that returns `true` if `celsius <= 0` and `false` otherwise.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Write three small helper functions (`formatGreeting`, `calculateDiscount`, and `maxOfTwo`) and test each one with two different inputs.",
      },
    ],
    problemStatement:
      "Write a script `functions.js` containing three functions: `greet(name)` (returns `\"Hello, <name>!\"`), `finalPrice(price, discountPercent)` (returns the price after subtracting the discount), and `maxOfTwo(a, b)` (returns whichever number is larger).",
    constraints: [
      "Each function must use `return` to give back its result rather than only calling `console.log` inside the function.",
      "Call each function at least twice at the bottom of your file and print the returned values.",
    ],
    expectedOutput: `Hello, Rohan!
Final price for 500 at 20% off: 400
Larger of 14 and 29: 29`,
    hints: [
      "A 20% discount on `price` is `price - (price * discountPercent) / 100`.",
      "If your `console.log(greet(\"Rohan\"))` prints `undefined`, check that you wrote `return` inside `greet`!",
    ],
    testCases: [
      {
        input: "finalPrice(500, 20) and finalPrice(100, 0)",
        expected: "Returns 400 and 100",
        note: "Percentage math return value",
      },
      {
        input: "maxOfTwo(14, 29) and maxOfTwo(50, 50)",
        expected: "Returns 29 and 50",
        note: "Comparison function",
      },
    ],
    instructions: [
      "Create `functions.js` and implement `greet(name)`, `finalPrice(price, discountPercent)`, and `maxOfTwo(a, b)`.",
      "Make sure every function ends by returning its result.",
      "At the bottom of the file, call each function with sample inputs and `console.log` the results.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A `functions.js` script defining and testing three reusable functions with `return` values.",
    solutionReference:
      "Functions that take inputs and `return` an output without changing outside variables are called 'pure functions' — they are the easiest functions to test and reuse!",
    furtherChallenges: [
      "Write `maxOfThree(a, b, c)` by calling your own `maxOfTwo(maxOfTwo(a, b), c)`!",
    ],
    relatedIds: ["number-guessing-game", "arrays-first-task-list", "cli-task-manager"],
    resources: [
      { name: "JavaScript.info — Functions", url: "https://javascript.info/function-basics" },
    ],
  },
  {
    id: "arrays-first-task-list",
    title: "Store and print a list of items with arrays",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "30–40 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Arrays"],
    effort: 1,
    description:
      "Learn how arrays store ordered lists of items, how to add new items with .push(), and how to print a numbered list.",
    overview:
      "If you have 10 tasks on a to-do list, creating `task1`, `task2`, ..., `task10` is messy and inflexible. An **array** lets you keep an entire ordered list inside a single variable, add new items whenever you want, and loop through all of them in 3 lines of code.",
    prerequisites:
      "Loops and functions (from 'Organise your code with reusable functions').",
    prerequisiteIds: ["functions-reusable-blocks"],
    objectives: [
      "Create an array `[...]`, read items by index (`tasks[0]`), and check its length (`tasks.length`).",
      "Add new items to the end of an array with `.push()` and loop through the list to print numbered lines.",
    ],
    conceptExplanation:
      "An array is written with square brackets: `const tasks = [\"Finish assignment\", \"Read a chapter\"];`. Computer lists start counting at position `0`, so `tasks[0]` is `\"Finish assignment\"` and `tasks[1]` is `\"Read a chapter\"`. Calling `tasks.push(\"Practice coding\")` adds a new item to the end of the list.",
    workedExample: {
      code: `const tasks = ["Study", "Exercise"];
tasks.push("Call home");

console.log("You have " + tasks.length + " tasks:");
for (let i = 0; i < tasks.length; i++) {
  console.log(i + 1 + ". " + tasks[i]);
}`,
      lineByLine: [
        "Line 1 creates an array called `tasks` holding 2 items.",
        "Line 2 adds `\"Call home\"` to the end of the array so it now holds 3 items.",
        "Line 4 prints `You have 3 tasks:` using `tasks.length`.",
        "Lines 5–7 loop through positions `0, 1, 2` and print `1. Study`, `2. Exercise`, `3. Call home`.",
      ],
    },
    guidedActivity:
      "Run the 7-line example above. Then add one more `tasks.push(...)` line with a task of your own and see `tasks.length` and the numbered list update automatically!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "An array groups multiple items in order inside `[...]`. Positions start at `0`, and `.length` tells you how many items are inside.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Start with `const tasks = [\"Study\", \"Exercise\"];` and print each item.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Use `tasks.push(...)` to add a new task and display the updated list.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Write a function `printTasks(list)` that prints `\"No tasks yet!\"` if the array is empty, or prints the numbered list if it has items.",
      },
    ],
    problemStatement:
      "Write a script `task-list.js` with a function `printTasks(list)` that prints a numbered list of tasks (or `\"No tasks yet!\"` when `list.length === 0`), and demonstrate adding items with `.push()`.",
    constraints: [
      "Display 1-based numbers (`1. ...`, `2. ...`) to the user even though array indices start at `0`.",
      "Handle an empty array `[]` cleanly.",
    ],
    expectedOutput: `No tasks yet!
You have 3 tasks:
1. Finish assignment
2. Read a chapter
3. Practice coding`,
    hints: [
      "Inside `printTasks(list)`, check `if (list.length === 0)` first and `return` after printing `\"No tasks yet!\"`.",
    ],
    testCases: [
      {
        input: "Call printTasks([]) on an empty array",
        expected: "Prints 'No tasks yet!'",
        note: "Empty list check",
      },
      {
        input: "Push 3 tasks and call printTasks(tasks)",
        expected: "Prints count 3 followed by 1., 2., and 3.",
        note: "Numbered list formatting",
      },
    ],
    instructions: [
      "Create `task-list.js` and start with an empty array `const tasks = [];`.",
      "Write `function printTasks(list)` that checks `list.length === 0` and otherwise loops through `list`.",
      "Call `printTasks(tasks)` once while empty, then `.push()` three tasks and call `printTasks(tasks)` again.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working `task-list.js` script that manages an array of tasks and prints formatted numbered output.",
    solutionReference:
      "This exercise is the exact foundation for 'Build a command-line task manager' — once you understand arrays and functions, you are ready to mark tasks complete!",
    furtherChallenges: [
      "Write a function `findTask(list, keyword)` that prints only the tasks whose text `.includes(keyword)`.",
    ],
    relatedIds: ["functions-reusable-blocks", "objects-student-card", "cli-task-manager"],
    resources: [
      { name: "JavaScript.info — Arrays", url: "https://javascript.info/array" },
    ],
  },
  {
    id: "objects-student-card",
    title: "Group related data together with objects",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "30–40 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Objects"],
    effort: 1,
    description:
      "Use JavaScript objects ({ title, done }) to store multiple named properties for each item in a list.",
    overview:
      "A simple string like `\"Study\"` tells you the name of a task, but what if you also need to know whether the task is completed (`true` or `false`)? An **object** lets you bundle named properties together inside curly braces: `{ title: \"Study\", done: false }`.",
    prerequisites:
      "Arrays and functions (from 'Store and print a list of items with arrays').",
    prerequisiteIds: ["arrays-first-task-list"],
    objectives: [
      "Create objects with named properties (`{ title: \"...\", done: false }`) and read/update them using dot notation (`task.done = true`).",
      "Combine arrays and objects (`const tasks = [{ title: \"...\", done: false }]`) to model real-world data.",
    ],
    conceptExplanation:
      "While an array uses numbered positions (`list[0]`), an object uses named labels called **keys** or **properties**: `const task = { title: \"Read chapter\", done: false };`. You read a property with a dot (`task.title`) and change it with `task.done = true;`.",
    workedExample: {
      code: `const tasks = [
  { title: "Finish assignment", done: true },
  { title: "Read a chapter", done: false },
];

for (let i = 0; i < tasks.length; i++) {
  const t = tasks[i];
  const box = t.done ? "[x]" : "[ ]";
  console.log(box + " " + (i + 1) + ". " + t.title);
}`,
      lineByLine: [
        "Lines 1–4 create an array of 2 task objects; the first has `done: true` and the second has `done: false`.",
        "Line 7 grabs the current task object `t`.",
        "Line 8 chooses `\"[x]\"` if `t.done` is true, or `\"[ ]\"` if `t.done` is false.",
        "Line 9 prints `[x] 1. Finish assignment` and `[ ] 2. Read a chapter`.",
      ],
    },
    guidedActivity:
      "Run the example above. Then add `tasks[1].done = true;` before the loop and re-run it to see the second checkbox turn into `[x]`!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Objects store named key-value pairs inside `{ ... }`. Arrays of objects are the most common data structure in web development.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Run the checkbox list example and see how `t.done` controls `[x]` vs `[ ]`.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Write a function `markDone(tasks, number)` that sets `tasks[number - 1].done = true`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Count and print how many tasks are completed vs still pending at the bottom of the list.",
      },
    ],
    problemStatement:
      "Write a script `objects.js` that stores a list of task objects (`{ title, done }`), provides a function `markDone(list, taskNumber)` to complete a task by its 1-based number, and prints the checklist along with a summary count (`\"2 of 3 completed\"`).",
    constraints: [
      "If `taskNumber` is less than 1 or greater than `list.length`, print `\"Task not found\"` instead of crashing.",
    ],
    expectedOutput: `[x] 1. Finish assignment
[x] 2. Read a chapter
[ ] 3. Practice coding
Summary: 2 of 3 completed`,
    hints: [
      "Since users count from `1` and arrays count from `0`, task number `2` lives at `list[2 - 1]`, which is `list[1]`.",
    ],
    testCases: [
      {
        input: "Call markDone(tasks, 2) on a 3-item list",
        expected: "Item 2 changes from [ ] to [x] and summary updates",
        note: "Property update by 1-based index",
      },
      {
        input: "Call markDone(tasks, 99)",
        expected: "Prints 'Task not found' without throwing a TypeError",
        note: "Out-of-bounds safety",
      },
    ],
    instructions: [
      "Create `objects.js` with an array of 3 task objects (`done: false`).",
      "Write `markDone(list, taskNumber)` checking that `taskNumber >= 1 && taskNumber <= list.length`.",
      "Write `printChecklist(list)` printing `[x]` or `[ ]` for each item plus the completed count.",
      "Mark two tasks done and print the checklist.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working `objects.js` script demonstrating arrays of objects, safe property updates, and summary counting.",
    solutionReference:
      "You now know every single concept needed to build a complete Task Manager! Head to 'Build a command-line task manager' or 'Build an interactive To-Do List webpage' next.",
    furtherChallenges: [
      "Add a `priority` property (`\"high\"` or `\"normal\"`) to each task object and display `[HIGH]` next to high-priority tasks.",
    ],
    relatedIds: ["arrays-first-task-list", "cli-task-manager", "todo-list-web"],
    resources: [
      { name: "JavaScript.info — Objects", url: "https://javascript.info/object" },
    ],
  },
  {
    id: "first-html-css-page",
    title: "Make your first personal webpage with HTML and CSS",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "35–45 minutes",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["HTML", "CSS"],
    effort: 2,
    description:
      "Create an HTML file, open it in your browser, and style it with clean fonts, colors, and spacing.",
    overview:
      "You don't need any servers or build tools to make a webpage. Every website on the internet is built from **HTML** (which gives the page its structure: headings, paragraphs, lists, links) and **CSS** (which controls colors, fonts, spacing, and layout).",
    prerequisites:
      "No prior web experience required — just a text editor and any web browser.",
    prerequisiteIds: [],
    objectives: [
      "Write a valid HTML5 document with `<h1>`, `<p>`, `<ul>`, `<li>`, and `<a href=\"...\">` tags.",
      "Connect a `<style>` block or `style.css` file to customize background colors, typography, and card padding.",
    ],
    conceptExplanation:
      "HTML uses tags wrapped in angle brackets: `<h1>My Name</h1>` creates a main heading, `<p>Hello!</p>` creates a paragraph, and `<ul><li>Item</li></ul>` creates a bulleted list. CSS rules pick a tag (like `body` or `.card`) and set visual properties like `background`, `color`, `padding`, and `border-radius`.",
    workedExample: {
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>About Me</title>
    <style>
      body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 16px; background: #f6f9f6; color: #1f392e; }
      .card { background: white; padding: 24px; border-radius: 10px; border: 1px solid #dce5dc; }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>Hi, I'm Meera!</h1>
      <p>I'm a first-year student learning web development.</p>
    </main>
  </body>
</html>`,
      lineByLine: [
        "Lines 1–5 tell the browser this is an HTML5 page with the tab title `About Me`.",
        "Lines 6–9 add CSS rules: centering the page content (`max-width: 600px; margin: 40px auto`) and styling `.card` with a white box and rounded corners.",
        "Lines 12–15 place a heading (`<h1>`) and a paragraph (`<p>`) inside `<main class=\"card\">`.",
      ],
    },
    guidedActivity:
      "Save the example above as `index.html` on your computer and double-click the file to open it in your browser. Then change the `<h1>` text and add a second `<p>` paragraph, save the file, and refresh your browser tab!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "HTML defines what is on the page (headings, text, links); CSS defines how it looks (colors, spacing, borders).",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Open the 17-line `index.html` file in your browser and inspect how `.card` creates a clean box.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Add a `<h2>What I'm Learning</h2>` subheading and a bulleted list `<ul><li>HTML & CSS</li><li>JavaScript</li></ul>`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Add a second card listing 2 links to your favourite learning websites using `<a href=\"https://...\">` and style links so they change color on hover.",
      },
    ],
    problemStatement:
      "Create a personal `index.html` webpage containing a header with your name, a short bio paragraph, a bulleted list of 3 skills you are learning, and a link to your GitHub profile or TDA repository, styled cleanly for both desktop and mobile screens.",
    constraints: [
      "Include `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />` in `<head>` so your page scales properly on phones.",
      "Use semantic tags (`<main>`, `<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`, `<a>`).",
    ],
    expectedOutput:
      "A clean, centered personal webpage in your browser displaying your name, bio, 3-item skill list, and a clickable link.",
    hints: [
      "Every opening tag like `<ul>` or `<p>` needs a matching closing tag `</ul>` or `</p>` with a forward slash.",
      "Add `padding: 0 16px;` on `body` so text never touches the left/right edges on a mobile screen.",
    ],
    testCases: [
      {
        input: "Open index.html in a web browser at desktop and 360px phone width",
        expected: "Renders heading, bio, 3 list items, and link cleanly without horizontal scrolling",
        note: "Browser rendering check",
      },
    ],
    instructions: [
      "Create `index.html` and paste the starter HTML5 structure with the viewport meta tag.",
      "Add your `<h1>` name, `<p>` bio, `<h2>` subheading, and `<ul>` list of 3 skills.",
      "Add CSS styles for `body`, `.card`, and `a:hover`.",
      "Open `index.html` in your browser and resize the window to verify it looks great at any width.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A complete `index.html` personal webpage styled with CSS that renders cleanly on desktop and mobile.",
    solutionReference:
      "`max-width: 640px; margin: 32px auto; padding: 0 16px;` is the classic 3-property CSS recipe that makes any article or card layout automatically responsive on both phones and wide monitors.",
    furtherChallenges: [
      "Move your CSS rules from `<style>` into a separate `style.css` file linked via `<link rel=\"stylesheet\" href=\"style.css\" />`.",
    ],
    relatedIds: ["dom-button-counter", "developer-profile", "css-grid-dashboard-layout"],
    resources: [
      { name: "MDN — Getting Started with HTML", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started" },
    ],
  },
  {
    id: "dom-button-counter",
    title: "Make a webpage button respond to clicks",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "30–40 minutes",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["HTML", "JavaScript"],
    effort: 1,
    description:
      "Connect JavaScript to an HTML button so clicking it updates a counter and message live on the page.",
    overview:
      "HTML and CSS create a static page, and **JavaScript in the browser (the DOM)** brings it to life! In this exercise you'll learn how JavaScript finds an HTML element on the page, listens for a button click, and updates the text on the screen immediately without reloading the page.",
    prerequisites:
      "Basic HTML tags and JavaScript variables/functions (from 'Make your first personal webpage' and 'Organise your code with functions').",
    prerequisiteIds: ["first-html-css-page", "functions-reusable-blocks"],
    objectives: [
      "Select HTML elements in JavaScript using `document.getElementById(...)`.",
      "Run a function whenever a user clicks a button using `.addEventListener(\"click\", ...)` and update `.textContent`.",
    ],
    conceptExplanation:
      "When a browser loads your HTML, it creates an object for every tag (called the **DOM** — Document Object Model). If your HTML has `<span id=\"count\">0</span>` and `<button id=\"add-btn\">+1</button>`, JavaScript can grab them by their `id` and update `countSpan.textContent` every time `addBtn` is clicked.",
    workedExample: {
      code: `<p>Clicks: <strong id="count">0</strong></p>
<button id="add-btn">Add 1</button>

<script>
  let count = 0;
  const countDisplay = document.getElementById("count");
  const addButton = document.getElementById("add-btn");

  addButton.addEventListener("click", () => {
    count = count + 1;
    countDisplay.textContent = String(count);
  });
</script>`,
      lineByLine: [
        "Lines 1–2 create a bold number with `id=\"count\"` and a button with `id=\"add-btn\"`.",
        "Line 5 starts a number variable `let count = 0;` in JavaScript.",
        "Lines 6–7 connect JavaScript variables to those two HTML elements using `document.getElementById`.",
        "Lines 9–12 run every time the button is clicked: increasing `count` by 1 and updating the text inside `<strong id=\"count\">`.",
      ],
    },
    guidedActivity:
      "Paste the snippet above into an `.html` file, open it in your browser, and click `Add 1` several times. Then add a second button `<button id=\"reset-btn\">Reset</button>` that sets `count = 0`!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "`document.getElementById` finds an element on the page; `addEventListener('click', ...)` runs code when clicked; `.textContent` changes the visible text.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Run the `Add 1` counter in your browser and see the number increment on each click.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Add a `Subtract 1` button and a `Reset` button.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Prevent the counter from going below `0` when clicking `Subtract 1`, and display a milestone message when `count` reaches `10`!",
      },
    ],
    problemStatement:
      "Build an interactive counter webpage (`counter.html`) with `+1`, `-1`, and `Reset` buttons. Keep the count at `0` or above (never negative) and display a congratulatory message when the user reaches `10`.",
    constraints: [
      "Clicking `-1` when the count is already `0` must keep the count at `0`.",
      "Always use `.textContent` (not `.innerHTML`) when setting plain text.",
    ],
    expectedOutput:
      "Interactive webpage where clicking `+1` increases the counter, `-1` decreases it (stopping at 0), `Reset` returns to 0, and reaching 10 shows a milestone message.",
    hints: [
      "Write a single helper function `updateScreen()` that sets `countDisplay.textContent = String(count)` and updates the status message, then call `updateScreen()` inside all three button click handlers!",
    ],
    testCases: [
      {
        input: "Click -1 while count is 0",
        expected: "Count stays at 0 (does not become -1)",
        note: "Lower bound guard",
      },
      {
        input: "Click +1 ten times, then click Reset",
        expected: "Shows milestone message at 10, then resets back to 0",
        note: "Interactive state update",
      },
    ],
    instructions: [
      "Create `counter.html` with `#count`, `#status`, and three buttons (`#inc`, `#dec`, `#reset`).",
      "Write a `let count = 0` variable and an `updateScreen()` helper function.",
      "Attach `click` event listeners to all three buttons.",
      "Open `counter.html` in your browser and test all three buttons.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An interactive `counter.html` webpage with `+1`, `-1`, and `Reset` controls and milestone feedback.",
    solutionReference:
      "Keeping the number in a JavaScript variable (`let count = 0`) and updating the screen through one `updateScreen()` function is the core idea behind modern frameworks like React!",
    furtherChallenges: [
      "Save `count` in `localStorage.setItem('count', String(count))` so refreshing the browser tab remembers your number!",
    ],
    relatedIds: ["first-html-css-page", "todo-list-web", "developer-profile"],
    resources: [
      { name: "MDN — Introduction to Events", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events" },
    ],
  },
  {
    id: "first-contribution",
    title: "Make your first pull request",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 1: Start from zero",
    durationLabel: "30–45 minutes",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["Git", "Markdown", "GitHub"],
    effort: 2,
    description:
      "Improve one confusing sentence in the project documentation.",
    overview:
      "What is Git? Think of Git as a 'save-game checkpoint system' for code and documentation. Instead of emailing files named `project_final_v2_REAL.zip`, developers create a branch, make a small improvement, save a checkpoint (a **commit**), and propose their change on GitHub (a **Pull Request**). Improving one confusing sentence in a README is the gentlest way to practice this workflow.",
    prerequisites:
      "No prior Git experience required. Install Git and create a free GitHub account.",
    prerequisiteIds: [],
    objectives: [
      "Download a copy of a repository (`git clone`), create a new branch (`git checkout -b`), and check what changed (`git status` and `git diff`).",
      "Save your change with a clear commit message (`git commit -m`) and understand how a Pull Request shares your improvement.",
    ],
    conceptExplanation:
      "When you edit a project, you don't edit the main version directly. Instead, you create a **branch** (your own safe workspace copy), edit a Markdown (`.md`) text file, run `git diff` to see the exact lines you changed (`-` for old text, `+` for new text), and save a **commit** with a short note explaining why.",
    workedExample: {
      code: `git clone https://github.com/ASingh2425/TDA_CnD_Planner.git
cd TDA_CnD_Planner
git checkout -b docs/improve-readme
# (Make a small improvement in README.md and save the file)
git diff
git add README.md
git commit -m "docs: clarify how to start the local server"`,
      lineByLine: [
        "Line 1 downloads the project folder onto your computer.",
        "Line 2 enters the project folder.",
        "Line 3 creates and switches to a new branch named `docs/improve-readme`.",
        "Line 5 (`git diff`) shows the exact sentence you edited before saving it.",
        "Lines 6–7 stage `README.md` and record a commit checkpoint with a clear summary message.",
      ],
    },
    guidedActivity:
      "Open any Markdown file (`README.md` or `docs/CONTRIBUTING.md`), fix a typo or make one setup instruction clearer, and run `git status` and `git diff` in your terminal to see how Git highlights your change.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "A repository is a project folder tracked by Git; a branch is your safe workspace; a commit is a saved checkpoint; a Pull Request asks to merge your branch.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Create a branch `docs/improve-readme` and inspect `git status` before and after editing a file.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Improve one confusing sentence or add a helpful tip in `README.md`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Stage only the file you intended to change (`git add README.md`), commit with a `docs: ...` message, and write a 2-sentence Pull Request description explaining what was unclear and how you improved it.",
      },
    ],
    problemStatement:
      "Find one sentence, command, or setup step in a project README or documentation file that could be clearer for a beginner. Improve the wording on a dedicated Git branch, verify that the project still builds/tests cleanly, and prepare a clean commit and pull request description.",
    constraints: [
      "Change only the documentation text you intended to improve (check `git diff` so no extra temporary files are included).",
      "Start your commit message with `docs: ` followed by a short description (e.g., `docs: explain how to open local URL`).",
    ],
    expectedOutput:
      "A clean `git log -n 1` and `git diff HEAD~1` showing your single focused documentation improvement.",
    hints: [
      "Always run `git status` before committing — it tells you in plain English which files have been modified and which are staged.",
      "If you accidentally staged the wrong file, `git restore --staged <filename>` unstages it without deleting your work.",
    ],
    testCases: [
      {
        input: "Follow the updated README instruction step-by-step",
        expected: "A newcomer can run the command without guessing missing steps",
        note: "Clarity check",
      },
      {
        input: "Run `git status` after committing",
        expected: "Shows 'nothing to commit, working tree clean' on your branch",
        note: "Clean commit check",
      },
    ],
    instructions: [
      "Clone the repository and create a new branch: `git checkout -b docs/clarify-readme`.",
      "Read `README.md` as a newcomer and edit one sentence or instruction to make it clearer.",
      "Run `git diff` to review your change and `npm test` to confirm everything still passes.",
      "Commit your change (`git add README.md` and `git commit -m \"docs: ...\"`) and push your branch to open a pull request.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A pull request explaining the original confusion and your improvement.",
    solutionReference:
      "The best first pull requests are small and easy to review: one branch, one clear improvement, verified by `git diff`.",
    furtherChallenges: [
      "Learn how `git log --oneline` shows the history of commits in the repository.",
    ],
    relatedIds: ["contributor-guide", "review-checklist", "cli-task-manager"],
    resources: [
      { name: "Pro Git Book (Ch 1–2 — Git Basics)", url: "https://git-scm.com/book/en/v2" },
      { name: "GitHub Pull Request Guide", url: "https://docs.github.com/en/pull-requests" },
    ],
  },

  // ============================================================================
  // LEVEL 2: PRACTISE BY BUILDING (For students who know the basics)
  // ============================================================================
  {
    id: "cli-task-manager",
    title: "Build a command-line task manager",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 2: Practise by building",
    durationLabel: "45–60 minutes for the first version",
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "Node.js", "Git"],
    effort: 3,
    description:
      "Practice variables, loops and functions by saving a list of tasks in a JSON file.",
    overview:
      "In Level 1 you learned how to store tasks in an array (`[\"Study\", \"Exercise\"]`) and group task details in objects (`{ title, done }`). Now let's turn that into a real command-line task manager step by step — starting with a tiny in-memory list and gradually adding functions and saving your tasks in a file so they are still there when you reopen the program!",
    prerequisites:
      "Arrays, objects, and functions (from 'Store and print a list of items with arrays' and 'Group related data together with objects').",
    prerequisiteIds: ["arrays-first-task-list", "objects-student-card"],
    objectives: [
      "Manage a list of tasks using simple functions (`addTask`, `listTasks`, `completeTask`).",
      "Save your tasks in a `tasks.json` file so they are still there when you reopen the program.",
    ],
    conceptExplanation:
      "When a normal script finishes running, variables in memory disappear. To remember your tasks next time, Node.js provides `fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2))` to save your array into a text file, and `JSON.parse(fs.readFileSync('tasks.json', 'utf8'))` to load it back when the program starts!",
    workedExample: {
      code: `// Step 1 & 2: Start with a tiny array of tasks and print each one
const tasks = [
  { title: "Finish assignment", done: false },
  { title: "Read a chapter", done: false },
];

function addTask(title) {
  tasks.push({ title: title, done: false });
}

function completeTask(number) {
  if (tasks[number - 1]) {
    tasks[number - 1].done = true;
  }
}

addTask("Practice coding");
completeTask(1);
console.log(tasks);`,
      lineByLine: [
        "Lines 2–5 start with a simple list of two task objects.",
        "Lines 7–9 define `addTask(title)`, which pushes a new task object onto the list.",
        "Lines 11–15 define `completeTask(number)`, which marks a task's `done` property as `true`.",
        "Lines 17–19 add a third task, mark task #1 complete, and print the updated list.",
      ],
    },
    guidedActivity:
      "Start by running the 19-line example above in `tasks.js` — no file saving or command-line arguments yet! Make sure you understand every line, then add a `listTasks()` function that prints `[x] 1. Finish assignment`.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Create a list of tasks such as 'Finish assignment' and 'Read a chapter.' See how an array of `{ title, done }` objects keeps track of your work.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Start with `const tasks = [\"Study\", \"Exercise\"];` and print each task. Make sure every line makes sense before adding anything new.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Write `addTask(title)` to add a new task to the list and display the updated list on the screen.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Write `listTasks()` so it prints `[ ] 1. Study` for pending tasks and `[x] 1. Study` for completed tasks.",
      },
      {
        title: "5. Build the next feature",
        detail:
          "Add `completeTask(number)` to mark a task as completed by its number (`1`, `2`, ...).",
      },
      {
        title: "6. Unlock the next challenge",
        detail:
          "Save your tasks in a `tasks.json` file using `fs.writeFileSync` and read commands from `process.argv` (`node tasks.js add \"Buy milk\"`, `node tasks.js list`, `node tasks.js done 1`).",
      },
    ],
    problemStatement:
      "Build a beginner-friendly command-line task manager (`tasks.js`) through the 6 progressive steps above: support adding tasks (`add`), listing tasks (`list`), and marking tasks complete (`done`), saving the list in `tasks.json` so your tasks stay saved between runs.",
    constraints: [
      "If `tasks.json` does not exist yet on the first run, start with an empty list `[]` instead of crashing.",
      "If someone runs `node tasks.js done 99` for a task number that doesn't exist, print a friendly message `'Task #99 not found'`. ",
    ],
    expectedOutput: `$ node tasks.js add "Finish assignment"
Added: Finish assignment

$ node tasks.js add "Read a chapter"
Added: Read a chapter

$ node tasks.js done 1
Completed task #1: Finish assignment

$ node tasks.js list
[x] 1. Finish assignment
[ ] 2. Read a chapter`,
    hints: [
      "Build Milestone 1 to 5 first using a normal array in memory! Only add `fs.readFileSync` and `fs.writeFileSync` in Milestone 6 once your functions already work.",
      "To read command-line words in Node.js: `const command = process.argv[2];` (like `'add'` or `'list'`) and `const argument = process.argv[3];` (like `'Finish assignment'` or `'1'`).",
      "To load `tasks.json` safely: `const tasks = fs.existsSync('tasks.json') ? JSON.parse(fs.readFileSync('tasks.json', 'utf8')) : [];`.",
    ],
    testCases: [
      {
        input: "node tasks.js list (before any tasks are added)",
        expected: "Prints 'No tasks yet! Add one with: node tasks.js add \"Your task\"'",
        note: "Friendly first-run message",
      },
      {
        input: "Add 2 tasks, mark task 1 done, then run list",
        expected: "Shows [x] for task 1 and [ ] for task 2, saved inside tasks.json",
        note: "Core add/done/list workflow",
      },
      {
        input: "node tasks.js done 99",
        expected: "Prints 'Task #99 not found.' without crashing",
        note: "Invalid task number check",
      },
    ],
    instructions: [
      "Complete Milestones 1–5 in `tasks.js` using an in-memory array and functions (`addTask`, `listTasks`, `completeTask`).",
      "Add a `loadTasks()` helper that reads `tasks.json` (or returns `[]` if the file doesn't exist yet) and a `saveTasks(tasks)` helper that writes `tasks.json`.",
      "Connect `process.argv[2]` (`add`, `list`, `done`) to your functions.",
      "Add a short `README.md` showing example commands and output.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A repository with add, list and complete commands, sample output and a README.",
    solutionReference:
      "By building the array functions first and adding file saving (`fs.readFileSync` / `fs.writeFileSync`) as the final wrapper step, each concept stays simple and easy to test.",
    furtherChallenges: [
      "Add a `remove <number>` command using `tasks.splice(number - 1, 1)`.",
      "Add a `clear-done` command that keeps only unfinished tasks using `tasks.filter(t => !t.done)`.",
    ],
    relatedIds: ["arrays-first-task-list", "objects-student-card", "todo-list-web"],
    resources: [
      { name: "JavaScript.info — JSON methods", url: "https://javascript.info/json" },
      { name: "Node.js File System Docs", url: "https://nodejs.org/api/fs.html" },
    ],
  },
  {
    id: "todo-list-web",
    title: "Build an interactive To-Do List webpage",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 2: Practise by building",
    durationLabel: "60–90 minutes",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["HTML", "CSS", "JavaScript"],
    effort: 3,
    description:
      "Bring your task manager into the browser with an input box, clickable checkboxes, and automatic saving in localStorage.",
    overview:
      "Now that you've built a task manager in the terminal and made a button respond to clicks in HTML, let's combine both! You'll build a webpage where you can type a task into an `<input>` box, click 'Add', check off completed tasks, and keep them saved in the browser's `localStorage`.",
    prerequisites:
      "HTML/CSS basics, DOM click events, and arrays of objects (`dom-button-counter` and `objects-student-card`).",
    prerequisiteIds: ["dom-button-counter", "objects-student-card"],
    objectives: [
      "Read text from an `<input>` box (`input.value.trim()`) when a form is submitted.",
      "Render an array of task objects into `<li>` elements on the page and save them in `localStorage`.",
    ],
    conceptExplanation:
      "Every time you add or toggle a task, you update your JavaScript `tasks` array and call a `render()` function that redraws the `<ul>` list on the page. Calling `localStorage.setItem('tasks', JSON.stringify(tasks))` inside `render()` saves the list inside your browser automatically!",
    workedExample: {
      code: `const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const listEl = document.getElementById("task-list");
const tasks = [];

function render() {
  listEl.textContent = "";
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.textContent = tasks[i];
    listEl.appendChild(li);
  }
}

addBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    tasks.push(input.value.trim());
    input.value = "";
    render();
  }
});`,
      lineByLine: [
        "Lines 1–4 grab the input box, button, and `<ul>` list element, and start an empty `tasks` array.",
        "Lines 6–13 clear the `<ul>` and create one `<li>` element for each item in `tasks`.",
        "Lines 15–21 run when `addBtn` is clicked: if the input isn't blank, it pushes the text into `tasks`, clears the input box, and calls `render()`.",
      ],
    },
    guidedActivity:
      "Create `todo.html` with `<input id=\"task-input\">`, `<button id=\"add-btn\">Add</button>`, and `<ul id=\"task-list\"></ul>`, paste the script above, and add 3 tasks in your browser!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Keep your tasks in a JavaScript array and redraw the `<ul>` list whenever the array changes.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Get the basic input + 'Add' button adding `<li>` items to the page.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Store task objects `{ title, done: false }` instead of plain strings, and toggle `done` when a user clicks an item.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Add a 'Delete' button next to each task and save `tasks` in `localStorage` so refreshing the page keeps your list.",
      },
    ],
    problemStatement:
      "Build a To-Do List webpage (`todo.html`) that lets users add tasks, toggle tasks between done and pending (with a line-through style when done), delete tasks, and persist the list in `localStorage`.",
    constraints: [
      "Ignore empty submissions when the user clicks 'Add' with a blank or whitespace-only input box.",
      "Show a counter such as `'2 tasks remaining'` that updates automatically.",
    ],
    expectedOutput:
      "An interactive To-Do List webpage where tasks can be added, checked off, deleted, and preserved across page refreshes.",
    hints: [
      "Load saved tasks on startup with: `const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');`.",
      "Add a CSS class `.done { text-decoration: line-through; opacity: 0.6; }` when `task.done` is `true`.",
    ],
    testCases: [
      {
        input: "Click Add with an empty input box",
        expected: "Does not add a blank bullet item to the list",
        note: "Empty input check",
      },
      {
        input: "Add 2 tasks, mark 1 done, and refresh the browser tab",
        expected: "Both tasks and their done state remain on the page after refresh",
        note: "localStorage persistence",
      },
    ],
    instructions: [
      "Build the HTML form (`<input>`, `<button>`) and `<ul id=\"task-list\"></ul>`.",
      "Write `render()` to create `<li>` elements with a checkbox/toggle and delete button for each task.",
      "Save `tasks` to `localStorage` whenever a task is added, toggled, or deleted.",
      "Test adding, completing, deleting, and refreshing the page.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A responsive To-Do List webpage with add, complete, delete, remaining counter, and localStorage persistence.",
    solutionReference:
      "Keeping a single `tasks` array as the source of truth and calling `render()` after every change keeps your UI and `localStorage` perfectly in sync.",
    furtherChallenges: [
      "Add filter buttons (`All`, `Active`, `Completed`) to view subsets of your tasks.",
    ],
    relatedIds: ["dom-button-counter", "cli-task-manager", "quiz-application"],
    resources: [
      { name: "MDN — Manipulating Documents (DOM)", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents" },
    ],
  },
  {
    id: "quiz-application",
    title: "Create an interactive multiple-choice quiz app",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 2: Practise by building",
    durationLabel: "60–90 minutes",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["HTML", "CSS", "JavaScript"],
    effort: 3,
    description:
      "Step through an array of questions one at a time, check the selected answer, track the player's score, and show a final summary.",
    overview:
      "Building a quiz app teaches you how to manage a multi-step screen using state variables (`currentQuestionIndex` and `score`). Each time the user picks an answer, you check if it matches the correct option, update the score, and advance to the next question until the quiz finishes.",
    prerequisites:
      "Arrays of objects, functions, and DOM click listeners (`todo-list-web`).",
    prerequisiteIds: ["objects-student-card", "dom-button-counter"],
    objectives: [
      "Store quiz questions, option arrays, and the correct answer index in a structured array of objects.",
      "Transition cleanly from question screens (`0 .. questions.length - 1`) to a final score summary screen with a 'Play Again' button.",
    ],
    conceptExplanation:
      "At any moment, the quiz only needs to know two numbers: `currentIndex` (which question we are on) and `score` (how many answers were right). When `currentIndex < questions.length`, we display `questions[currentIndex]`. When `currentIndex === questions.length`, the quiz is over and we display the final score!",
    workedExample: {
      code: `const questions = [
  {
    prompt: "Which keyword creates a variable that cannot be reassigned?",
    options: ["let", "const", "var"],
    answerIndex: 1,
  },
  {
    prompt: "What is the index of the first item in a JavaScript array?",
    options: ["0", "1", "-1"],
    answerIndex: 0,
  },
];

let currentIndex = 0;
let score = 0;`,
      lineByLine: [
        "Lines 1–12 store an array of question objects; each has a `prompt`, 3 `options`, and the `answerIndex` (`0`, `1`, or `2`).",
        "Line 14 tracks which question is currently shown on screen.",
        "Line 15 tracks how many questions the player has answered correctly so far.",
      ],
    },
    guidedActivity:
      "Write a `showQuestion()` function that displays `questions[currentIndex].prompt` and creates a button for each option in `questions[currentIndex].options`.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Model each question as `{ prompt, options, answerIndex }` and track `currentIndex` and `score`.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Render the first question and its option buttons on the page.",
      },
      {
        title: "3. Make one small change",
        detail:
          "When an option button is clicked, check `if (chosenIndex === q.answerIndex)` to increase `score`, then increment `currentIndex`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Add 5 questions, show `'Question 2 of 5'` progress text, and display the final score with a `'Restart Quiz'` button at the end.",
      },
    ],
    problemStatement:
      "Build an interactive 5-question coding quiz webpage (`quiz.html`) that shows one question at a time, gives immediate feedback (Correct / Incorrect), tracks the score, and displays a final result screen with a 'Restart Quiz' button.",
    constraints: [
      "Prevent double-clicking an answer on the same question from adding multiple points.",
      "Clicking 'Restart Quiz' must reset both `currentIndex = 0` and `score = 0` and show Question 1 again.",
    ],
    expectedOutput:
      "A 5-question interactive quiz displaying question progress (`Question 1 of 5`), option buttons, answer feedback, and a final score summary (`You scored 4 / 5!`).",
    hints: [
      "When `currentIndex === questions.length`, hide the question container and show the results container instead.",
    ],
    testCases: [
      {
        input: "Answer all 5 questions and reach the end screen",
        expected: "Displays exact score out of 5 and a working Restart Quiz button",
        note: "End-of-quiz transition",
      },
      {
        input: "Click Restart Quiz on the summary screen",
        expected: "Resets score to 0 and returns to Question 1 of 5",
        note: "State reset check",
      },
    ],
    instructions: [
      "Create `quiz.html` with a question card container and a results container.",
      "Define an array of 5 beginner programming questions.",
      "Write `renderQuiz()` to either display `questions[currentIndex]` or the final score screen when `currentIndex === questions.length`.",
      "Add a 'Restart Quiz' button that resets `score = 0` and `currentIndex = 0`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An interactive 5-question quiz webpage with progress indicator, score tracking, and restart functionality.",
    solutionReference:
      "Driving the entire screen from `(currentIndex, score)` is a state machine — the simplest and cleanest way to build multi-step wizards and games.",
    furtherChallenges: [
      "Keep a list of the player's chosen answers and show a review breakdown at the end explaining any missed questions.",
    ],
    relatedIds: ["todo-list-web", "weather-data-fetcher", "problem-bank-ui"],
    resources: [
      { name: "JavaScript.info — Array & Object Practice", url: "https://javascript.info/array-methods" },
    ],
  },
  {
    id: "weather-data-fetcher",
    title: "Fetch and display live weather data",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 2: Practise by building",
    durationLabel: "60–90 minutes",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["JavaScript", "HTML", "APIs"],
    effort: 3,
    description:
      "Learn how websites talk to external APIs using fetch() and async/await, including loading spinners and error messages.",
    overview:
      "How do apps show live weather, stock prices, or GitHub repositories? They ask a remote server (an **API**) for JSON data using `fetch()`. Because network requests take a moment to travel across the internet (and can fail if Wi-Fi drops), every good web developer always builds three states: **Loading**, **Success**, and **Error**.",
    prerequisites:
      "Objects, functions, and updating HTML elements (`dom-button-counter`).",
    prerequisiteIds: ["objects-student-card", "dom-button-counter"],
    objectives: [
      "Fetch live JSON data from a free, no-API-key-required endpoint (such as Open-Meteo) using `async / await` and `fetch()`.",
      "Display clear `'Loading weather...'` and `'Could not load weather. Try again.'` states so the user is never left staring at a blank page.",
    ],
    conceptExplanation:
      "`fetch(url)` sends an HTTP request to a server and waits for the reply. Using `async function loadWeather()` lets us write `const response = await fetch(url);` and `const data = await response.json();` to turn the server's JSON reply into a normal JavaScript object we can display on the page.",
    workedExample: {
      code: `async function loadWeather() {
  const statusEl = document.getElementById("status");
  statusEl.textContent = "Loading weather...";

  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=13.35&longitude=74.79&current_weather=true";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Server returned error");
    const data = await response.json();
    statusEl.textContent = "Temperature: " + data.current_weather.temperature + "°C";
  } catch (err) {
    statusEl.textContent = "Could not load weather. Please check your connection and try again.";
  }
}`,
      lineByLine: [
        "Lines 1–3 start an `async` function and immediately show `\"Loading weather...\"` so the user knows work is in progress.",
        "Lines 6–9 fetch current weather JSON for Manipal (`13.35, 74.79`) from the free Open-Meteo API.",
        "Line 10 reads `data.current_weather.temperature` from the returned JSON object and displays it.",
        "Lines 11–13 (`catch`) run automatically if the internet is disconnected or the server fails, showing a friendly error message.",
      ],
    },
    guidedActivity:
      "Put the `loadWeather()` function into an HTML file with `<p id=\"status\"></p>` and a button `<button onclick=\"loadWeather()\">Get Weather</button>`. Click it to see real live temperature data!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "`fetch()` requests JSON data over the network; `try / catch` protects your page if the network is offline.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Fetch and display the live temperature for one city using the Open-Meteo URL.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Also display the wind speed (`data.current_weather.windspeed`) alongside the temperature.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Add a `<select>` dropdown with 3–4 cities (e.g., Manipal, Bengaluru, Delhi, Mumbai) and a 'Retry' button when an error occurs.",
      },
    ],
    problemStatement:
      "Build a Weather Viewer webpage (`weather.html`) with a city selector dropdown that fetches live temperature and wind speed from Open-Meteo (or a local JSON fallback), showing explicit Loading, Success, and Error + Retry states.",
    constraints: [
      "No API keys or secret tokens required (Open-Meteo is free and open).",
      "Always wrap `await fetch(...)` in `try / catch` and check `if (!response.ok)`.",
    ],
    expectedOutput:
      "A webpage where selecting a city shows 'Loading...', then displays a card with Temperature (°C) and Wind Speed (km/h), or an error banner with a 'Try Again' button if offline.",
    hints: [
      "To test your error state easily, temporarily change the URL to `https://api.open-meteo.com/broken-url` and verify your error message and Retry button appear!",
    ],
    testCases: [
      {
        input: "Select a city while online",
        expected: "Shows 'Loading...', then displays current temperature and wind speed",
        note: "Live fetch flow",
      },
      {
        input: "Simulate offline mode in browser DevTools (Network -> Offline) and click Get Weather",
        expected: "Displays friendly error message and Retry button without uncaught console errors",
        note: "Offline error handling",
      },
    ],
    instructions: [
      "Create `weather.html` with a `<select>` of cities (storing `lat,lon` values), a status area, and a weather card.",
      "Write `async function fetchCityWeather(lat, lon)` using `try / catch`.",
      "Display the loading message before `await fetch`, the weather data on success, and the error + retry button in `catch`.",
      "Test both online and simulated offline states.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A Weather Viewer webpage demonstrating async/await fetch, city selection, loading states, and error recovery.",
    solutionReference:
      "Every network call in a real web app needs three visual states: `loading`, `data`, and `error`. Mastering this pattern makes your interfaces resilient.",
    furtherChallenges: [
      "Display a 3-day daily high/low forecast using `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`.",
    ],
    relatedIds: ["developer-profile", "todo-list-web", "quiz-application"],
    resources: [
      { name: "MDN — Fetching Data from the Server", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data" },
    ],
  },
  {
    id: "expense-tracker",
    title: "Build a small personal expense tracker",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 2: Practise by building",
    durationLabel: "60–90 minutes",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["JavaScript", "Arrays", "HTML"],
    effort: 4,
    description:
      "Combine arrays, objects, filtering, and number totals to track daily expenses by category.",
    overview:
      "An expense tracker brings together everything from Level 1 and Level 2: reading text and number inputs, storing `{ title, category, amount }` objects in an array, filtering by category (`Food`, `Transport`, `Books`), and calculating the total spent!",
    prerequisites:
      "Variables, calculator math, arrays of objects, and DOM events (`variables-and-calculator` and `todo-list-web`).",
    prerequisiteIds: ["variables-and-calculator", "todo-list-web"],
    objectives: [
      "Validate number inputs (`Number(amountInput.value) > 0`) before adding an expense.",
      "Filter an array by category and sum the total amount of visible expenses.",
    ],
    conceptExplanation:
      "To calculate the total of a list of expense objects, we start with `let total = 0;` and loop through the list adding `expense.amount` to `total` (or use `expenses.reduce((sum, e) => sum + e.amount, 0)`). If a category filter like `'Food'` is active, we filter the list first and sum only the matching items!",
    workedExample: {
      code: `const expenses = [
  { title: "Lunch", category: "Food", amount: 120 },
  { title: "Bus ticket", category: "Transport", amount: 40 },
  { title: "Coffee", category: "Food", amount: 60 },
];

function getTotalForCategory(list, category) {
  let total = 0;
  for (const item of list) {
    if (category === "All" || item.category === category) {
      total = total + item.amount;
    }
  }
  return total;
}

console.log("All expenses:", getTotalForCategory(expenses, "All")); // 220
console.log("Food only:", getTotalForCategory(expenses, "Food"));   // 180`,
      lineByLine: [
        "Lines 1–5 store three expense objects, each with a `title`, `category`, and numeric `amount`.",
        "Lines 7–15 loop through the expenses and add `item.amount` to `total` whenever `category` is `'All'` or matches `item.category`.",
        "Lines 17–18 print `220` for all expenses and `180` (`120 + 60`) for `'Food'`.",
      ],
    },
    guidedActivity:
      "Run the example above and add a fourth expense `{ title: \"Notebook\", category: \"Books\", amount: 85 }`. Check what `getTotalForCategory(expenses, \"All\")` and `getTotalForCategory(expenses, \"Books\")` return.",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Each expense is an object `{ title, category, amount }`. Filtering and summing work together on the same array.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Use a loop to sum all expenses and expenses for a single category.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Build an HTML form with Title, Category (`Food`, `Transport`, `Books`, `Other`), and Amount inputs that adds new expenses to the list.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Add a category filter dropdown, validate that `amount > 0`, and save expenses in `localStorage`.",
      },
    ],
    problemStatement:
      "Build a personal Expense Tracker (`expenses.html` or CLI script) that lets a student add expenses with a title, category, and positive amount, filter the list by category, see the running total for the selected category, and delete entries.",
    constraints: [
      "Convert the amount input with `Number(...)` so adding `120` and `60` gives `180`, not `'12060'`!",
      "Reject zero, negative, or `NaN` amounts with a clear validation message.",
    ],
    expectedOutput:
      "An interactive expense tracker showing the list of expenses, a category filter (`All`, `Food`, `Transport`, `Books`), and an accurate running total.",
    hints: [
      "Always convert `<input type=\"number\">` values using `const amount = Number(amountInput.value);` and check `if (!Number.isFinite(amount) || amount <= 0)`.",
    ],
    testCases: [
      {
        input: "Add Lunch (Food, 120) and Bus (Transport, 40), then filter by Food",
        expected: "Shows only Lunch and updates the displayed total from 160 to 120",
        note: "Filtered sum accuracy",
      },
      {
        input: "Attempt to add an expense with amount -50 or empty title",
        expected: "Shows validation message and does not add the invalid item",
        note: "Input validation check",
      },
    ],
    instructions: [
      "Create the form with Title, Category select, and Amount inputs.",
      "Validate inputs on submit and push `{ id: Date.now(), title, category, amount: Number(amount) }` into `expenses`.",
      "Filter `expenses` by the active category dropdown and render both the visible rows and their sum.",
      "Persist `expenses` in `localStorage`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working Expense Tracker with input validation, category filtering, live total calculation, and persistence.",
    solutionReference:
      "Storing `amount` as a number (`Number(val)`) at the moment the expense is created prevents string-concatenation bugs everywhere else in your app.",
    furtherChallenges: [
      "Show a breakdown summary of how much was spent in each category (`Food: ₹180 | Transport: ₹40`).",
    ],
    relatedIds: ["variables-and-calculator", "todo-list-web", "problem-bank-ui"],
    resources: [
      { name: "JavaScript.info — Array methods (filter, reduce)", url: "https://javascript.info/array-methods" },
    ],
  },
  {
    id: "developer-profile",
    title: "Build your developer profile",
    initiative_id: "junior-path",
    trackIndex: 0,
    level: "Level 2: Practise by building",
    durationLabel: "90–120 minutes",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["HTML", "CSS", "JavaScript"],
    effort: 5,
    description:
      "Create an accessible profile page that describes what you want to learn.",
    overview:
      "Combine your HTML/CSS webpage skills with `fetch()` to build a personal developer profile page! You'll create an 'About Me' header, a grid of project or learning cards loaded from a `.json` file (or the GitHub API), and make sure it looks great on both phones and laptops.",
    prerequisites:
      "HTML/CSS webpage basics and `fetch()` (from 'Make your first personal webpage' and 'Fetch and display live weather data').",
    prerequisiteIds: ["first-html-css-page", "weather-data-fetcher"],
    objectives: [
      "Structure a webpage with clear sections (`<header>`, `<main>`, `<footer>`) and responsive CSS Grid cards.",
      "Load your list of projects or learning goals using `fetch()` and show a friendly message if the file or network fails to load.",
    ],
    conceptExplanation:
      "Instead of hardcoding 10 project cards in HTML, you can store your projects in a simple `projects.json` file (or fetch your public GitHub repos) and use a loop in JavaScript to create a card for each project. Using CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`) automatically arranges your cards in 1 column on phones and 2–3 columns on laptops!",
    workedExample: {
      code: `.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}`,
      lineByLine: [
        "Line 2 turns `.project-grid` into a flexible CSS Grid container.",
        "Line 3 tells the browser: fit as many columns as possible where each card is at least `250px` wide, and share remaining space equally (`1fr`).",
        "Line 4 puts a clean `16px` gap between every card.",
      ],
    },
    guidedActivity:
      "Take your `index.html` from Level 1, add a `<div class=\"project-grid\"></div>` with 3 `.card` boxes inside it, and apply the 5-line `.project-grid` CSS rule above. Resize your browser window to watch the cards reflow automatically!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "Use semantic HTML for structure, CSS Grid for responsive cards, and `fetch()` to load your project list.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Create a responsive 3-card grid using `repeat(auto-fit, minmax(250px, 1fr))`.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Move your project data into a `projects.json` file and load it with `await fetch('./projects.json')`.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Add a loading message, an error state with a 'Try again' button if `fetch` fails, and check that `Tab` key navigation highlights every link clearly.",
      },
    ],
    problemStatement:
      "Create a responsive developer profile webpage that introduces who you are, what you are learning in TDA, and dynamically loads your projects or exercises using `fetch()` with loading and error states.",
    constraints: [
      "No horizontal scrollbar at any screen width from `320px` (small phone) to `1440px` (desktop).",
      "Must display a clear error message and retry button if the `fetch()` request fails.",
    ],
    expectedOutput:
      "A responsive personal profile page showing your bio, skill badges, and dynamically loaded project cards.",
    hints: [
      "Remember to serve your folder with a local server (like `npx serve` or Vite) when using `fetch('./projects.json')`, because browsers block `fetch()` on `file://` URLs.",
    ],
    testCases: [
      {
        input: "Simulate network failure on the projects fetch request",
        expected: "Displays a helpful error message with a working 'Try again' button",
        note: "Error state check",
      },
      {
        input: "View the page at 360px mobile width",
        expected: "Cards stack neatly in a single column with zero horizontal overflow",
        note: "Mobile layout check",
      },
    ],
    instructions: [
      "Create `index.html`, `style.css`, `app.js`, and `projects.json`.",
      "Build the header bio section and the `.project-grid` container.",
      "In `app.js`, fetch `projects.json` inside `try / catch`, rendering cards on success or an error banner on failure.",
      "Test on mobile and desktop widths and deploy to GitHub Pages or Vercel.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A deployed responsive page and source repository, including a fetch request with an error state.",
    solutionReference:
      "Combining semantic HTML landmarks (`header`, `main`, `footer`), `auto-fit` CSS Grid, and `try / catch` around `fetch()` gives you a solid template for any frontend project.",
    furtherChallenges: [
      "Add tag filter buttons (e.g., `All`, `JavaScript`, `HTML/CSS`) above your project grid.",
    ],
    relatedIds: ["first-html-css-page", "weather-data-fetcher", "problem-bank-ui"],
    resources: [
      { name: "MDN Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn" },
      { name: "W3C WAI Accessibility Tutorials", url: "https://www.w3.org/WAI/tutorials/" },
    ],
  },
  {
    id: "cp-pattern-notes",
    title: "Explain the two-pointer pattern",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    level: "Level 2: Practise by building",
    durationLabel: "45–60 minutes",
    category: "Data Structures & Algorithms",
    difficulty: "Beginner",
    skills: ["Arrays", "Complexity", "Two Pointers"],
    effort: 3,
    description:
      "Solve a canonical practice problem and explain why two pointers work.",
    overview:
      "Suppose you have a sorted list of prices `[2, 4, 7, 11, 15]` and want to find two items that add up to `11`. Checking every possible pair with two nested loops takes $N \\times N$ steps. The **Two-Pointer pattern** places one finger at the smallest number (`left = 0`) and one finger at the largest number (`right = last`) and walks them inward to find the answer in a single pass!",
    prerequisites:
      "Arrays, loops, and `if / else` conditions (from Level 1).",
    prerequisiteIds: ["arrays-first-task-list", "number-guessing-game"],
    objectives: [
      "Find two numbers in a sorted array that add up to a target sum using a `left` and `right` pointer.",
      "Explain in plain English why moving `left` up when the sum is too small (and `right` down when the sum is too big) never misses the answer.",
    ],
    conceptExplanation:
      "Because the array is sorted from smallest to largest:\n- If `nums[left] + nums[right]` is **smaller** than `target`, we need a bigger sum. Since `right` is already as big as possible, the only way to increase the sum is to move `left` one step right (`left++`).\n- If `nums[left] + nums[right]` is **larger** than `target`, we need a smaller sum, so we move `right` one step left (`right--`).",
    workedExample: {
      code: `function findPair(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [nums[left], nums[right]];
    } else if (sum < target) {
      left = left + 1;  // Need a larger sum
    } else {
      right = right - 1; // Need a smaller sum
    }
  }
  return null;
}

console.log(findPair([2, 4, 7, 11, 15], 11)); // [4, 7]`,
      lineByLine: [
        "Lines 2–3 start `left` at index `0` (value `2`) and `right` at the last index `4` (value `15`).",
        "Iteration 1: `2 + 15 = 17` (`> 11`, too big), so `right` moves left to value `11`.",
        "Iteration 2: `2 + 11 = 13` (`> 11`, too big), so `right` moves left to value `7`.",
        "Iteration 3: `2 + 7 = 9` (`< 11`, too small), so `left` moves right to value `4`.",
        "Iteration 4: `4 + 7 = 11` (Match! Returns `[4, 7]`).",
      ],
    },
    guidedActivity:
      "Open the **05. Competitive Programming** visualiser on this website, select `Two Pointers (Pair Sum)`, and click `Step forward` to watch `L` and `R` walk inward on the bar chart!",
    milestones: [
      {
        title: "1. Understand the idea",
        detail:
          "On a sorted list, `left++` always increases the pair sum and `right--` always decreases the pair sum.",
      },
      {
        title: "2. Follow a tiny example",
        detail:
          "Trace `findPair([2, 4, 7, 11, 15], 11)` by hand or in the visualiser.",
      },
      {
        title: "3. Make one small change",
        detail:
          "Modify `findPair` so it returns the indices `[left, right]` instead of the values.",
      },
      {
        title: "4. Try it independently",
        detail:
          "Solve 'Sum of Two Values' (where the input array isn't sorted yet, so you sort `(value, originalIndex)` pairs first) and write a short note explaining why it runs in $O(N \\log N)$ time instead of $O(N^2)$.",
      },
    ],
    problemStatement:
      "Implement the two-pointer pair-sum solution, test it on arrays with duplicates and missing targets, and write a short, beginner-friendly explanation of how the `left` and `right` pointers work.",
    constraints: [
      "Use a single `while (left < right)` loop rather than nested `for` loops.",
      "Never pair an element with itself (`left` must be strictly less than `right`).",
    ],
    expectedOutput:
      "Working two-pointer function + a short Markdown explanation tracing an example step by step.",
    hints: [
      "If the input array is unsorted and you need the original positions, create `const pairs = nums.map((val, idx) => ({ val, idx: idx + 1 }))` and sort `pairs` by `.val`.",
    ],
    testCases: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        expected: "Finds pair 2 + 7 = 9",
        note: "Basic match",
      },
      {
        input: "nums = [1, 2, 3, 4], target = 100",
        expected: "Returns null when pointers meet",
        note: "No matching pair",
      },
    ],
    instructions: [
      "Run and trace the `findPair` worked example on `[2, 4, 7, 11, 15]` with target `11`.",
      "Extend it to handle unsorted inputs by keeping track of each number's original 1-based position.",
      "Write a short explanation in your README showing a 4-step trace and comparing the number of steps against checking all pairs.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An original explanation, complexity analysis and a link to your accepted submission.",
    solutionReference:
      "Each step moves either `left` one step right or `right` one step left, so the loop runs at most `N` times!",
    furtherChallenges: [
      "Use two pointers (`left = 0`, `right = word.length - 1`) to check if a string is a palindrome (reads the same forwards and backwards).",
    ],
    relatedIds: ["number-guessing-game", "binary-search-tests", "sliding-window-rate-counter"],
    resources: [
      { name: "USACO Guide — Two Pointers", url: "https://usaco.guide/silver/two-pointers" },
      { name: "CSES 1640 — Sum of Two Values", url: "https://cses.fi/problemset/task/1640" },
    ],
  },
];
