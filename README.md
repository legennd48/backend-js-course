# Backend JS Course - Test Solutions Repository

This repository contains complete solutions for all function-based assignments in the Backend JavaScript course (Weeks 2-5). Use this to test the auto-grader system.

## Quick Setup

### 1. Push to GitHub

```bash
cd "/home/legennd/lessons/js lesson plans/test-solutions-repo"
git init
git add .
git commit -m "Add all course solutions"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/backend-js-course.git
git push -u origin main
```

### 2. Add as Student in Auto-Grader

1. Open the auto-grader at `http://localhost:3000`
2. Go to **Students** page
3. Add a new student with:
   - Name: Test Student
   - Email: test@example.com
   - GitHub Username: YOUR_USERNAME (same as repo owner)

### 3. Grade Assignments

1. Go to **Grade** page
2. Select "Test Student"
3. Select any assignment (Week 2-5)
4. Click "Grade Assignment"
5. All tests should pass with 100%!

## Structure

```
backend-js-course/
├── week-02/
│   ├── session-03/functions.js      # greetUser, calculateArea, isAdult, getFullName, convertToCelsius
│   └── session-04/control-flow.js   # getGrade, isEven, getAbsoluteValue, canVote, getDayType
├── week-03/
│   ├── session-05/loops.js          # sumNumbers, factorial, countVowels, reverseString, isPalindrome, fizzBuzz
│   └── session-06/arrays.js         # getFirst, getLast, sumArray, findMax, findMin, removeDuplicates, countOccurrences, flattenArray
├── week-04/
│   ├── session-07/objects.js        # createPerson, getProperty, hasProperty, countKeys, mergeObjects, getKeys, getValues, invertObject, filterByValue, deepClone
│   └── session-08/array-methods.js  # doubleNumbers, getNames, filterAdults, filterByProperty, findByName, findById, calculateTotal, groupBy, sortByProperty, pluck
└── week-05/
    └── session-09/error-handling.js # safeDivide, parseJSON, validateAge, validateEmail, validatePassword, getArrayElement, requireProperty, validateUser, trySafely
```

## Notes

- All functions use `module.exports = { ... }` format
- Function names match exactly with `assignment-specs.json`
- File names match the `filename` field in specs
- Path structure matches `week-XX/session-YY/` format
