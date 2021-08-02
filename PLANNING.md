# PLANNING

## Steps to Complete

- As a PLAYER I want to see the game title
  - set up HTML doc
  - add an element for the page header
  - add an element for the page title in the header
- As a PLAYER I want to know where to find the score
  - add an element for the game score in the header
- As a PLAYER I want to know how to play the game
  - add an element for the page footer
  - add an element to the footer with game directions
- As a PLAYER I want to see a game board
  - add a canvas element
  - draw the board on page load
- As a PLAYER I want to see a snake's head on the board
  - draw a shape to represent the snake's head
- As a PLAYER I want to be able to move the snake's head
  - head moves ONLY up, down, left, or right
  - head does NOT move diagonally
    - move the head left with left arrow
    - move the head right with right arrow
    - move the head up with up arrow
    - move the head down with down arrow
- As a PLAYER I want the snake to have more than just a head
  - give the snake a default length of 5 units
- As a PLAYER I want the snake's body to follow the head around turns
  - each body segment should take the head's position in turn
- As a PLAYER I want the snake to stay within the board
  - if the snake touches a boundary the game should stop
  - tell the user the game is over
- As a PLAYER I do NOT want the snake to be able to back up over itself
  - if the snake is going UP, the DOWN arrow should not work
  - if the snake is going DOWN, the UP arrow should not work
  - if the snake is going RIGHT, the LEFT arrow should not work
  - if the snake is going LEFT, the RIGHT arrow should not work
- As a PLAYER I want to see an apple on the board
  - draw a shape to represent an apple
- As a PLAYER I want to see the snake get longer when it eats the apple
  - add a new segment to the snake head when it touches the apples
- As a PLAYER I want to know my score
  - add a score property to the game class
  - increment when the apple is eaten
  - display in scoreboard
- As a PLAYER I expect the game to end if the snake touches itself

## Things I Did NOT Plan For Or Know About

- Trying to get the snake to always be the same width/length no matter which direction it's going
- knowing when shape areas overlap so I can count scores.

## Googled

- `deep copy an object javascript`

  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

- `deep copy a linked list javascript`

  - https://medium.com/spotthedifference/deep-copy-a-linked-list-b90d8376223f

- `javascript get value without reference`

  - https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0

- `html canvas consistent rectangle size`
  - https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
