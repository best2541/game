let score = 0;
let footballX = window.innerWidth / 2; // Initial X position
let footballY = window.innerHeight / 2; // Start at the bottom of the screen
let isBomb = false
let isBonus = 0
let dx = 0; // Initial horizontal velocity
let dy = -2; // Velocity for moving upwards
let moveUpTime = 7; // Duration of moving upwards (1 second)
let moveLeftDownTime = 2000; // Duration of moving left and downwards (2 seconds)
let timeCounter = 0
let check = false
let defaultHardLevel = 0.5
let hardLevel = 1
let isOver = false

function asyncFunction() {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      // Resolve the Promise after 1 second (simulating success)
      resolve("Data fetched successfully");

      // Alternatively, you can reject the Promise if there's an error
      // reject("Error occurred while fetching data");
    }, 500);
  });
}

function getRandomNumber() {
  // Generate a random number between 0 and 1
  var randomNumberX = Math.random() * 4 - 2;
  var randomNumberY = Math.random() * 10 - 5;
  var randomBomb = Math.floor(Math.random() * 10) + 1;

  // Round the number to get integer values
  // var roundedNumber = (scaledNumber);
  dx = randomNumberX
  dy = randomNumberY
  isBomb = randomBomb <= 3 ? true : false
  // console.log('y', scaledNumberY)
  // return roundedNumber;
}

// function updateFootballPosition() {
//   const football = document.getElementById('football');
//   footballX += dx; // Update X position
//   footballY += dy; // Update Y position

//   // Move upwards for 1 second
//   if (moveUpTime > 0) {
//     moveUpTime -= 16.7; // Decrease time by frame time (approximately 60 frames per second)
//   } else {
//     // Move left and downwards for 2 seconds
//     dx = -1; // Set horizontal velocity for moving left
//     dy = window.innerHeight / 1000; // Set vertical velocity for moving downwards
//     if (moveLeftDownTime > 0) {
//       moveLeftDownTime -= 16.7; // Decrease time by frame time (approximately 60 frames per second)
//     } else {
//       // Reset the movement pattern after 3 seconds (1 second upwards + 2 seconds left and downwards)
//       moveUpTime = 1000;
//       moveLeftDownTime = 2000;
//       footballX = window.innerWidth / 2; // Reset X position
//       footballY = window.innerHeight / 2; // Reset Y position
//       dx = 0; // Reset horizontal velocity
//       dy = -window.innerHeight / 1000; // Reset vertical velocity for moving upwards
//     }
//   }

//   football.style.left = footballX + 'px';
//   football.style.top = footballY + 'px';

//   requestAnimationFrame(updateFootballPosition); // Update position in the next frame
// }

async function updateFootballPosition() {
  const football = document.getElementById('football')
  const bonus = document.getElementById('bonus')
  const bomb = document.getElementById('bomb')
  timeCounter += 16.7
  const percen = timeCounter / (moveUpTime / hardLevel)

  // footballY -= 2
  if (percen < 100 && !check) {
    if (isBomb) {
      bomb.style.display = 'block';
      bomb.style.width = 50 + percen + 'px'
      bomb.style.height = 50 + percen + 'px'
      footballX += dx * (hardLevel) // Update X position
      footballY += dy * (hardLevel) // Update Y position
    } else {
      if (isBonus >= 0 && isBonus < 3) {
        football.style.display = 'block';
        football.style.width = 50 + percen + 'px'
        football.style.height = 50 + percen + 'px'
        footballX += dx * (hardLevel)// Update X position
        footballY += dy * (hardLevel)// Update Y position
        // footballY = Math.floor((highTarget * percen) / 100) // Update Y position
      } else {
        isBonus = 4
        bonus.style.display = 'block';
        bonus.style.width = 50 + percen + 'px'
        bonus.style.height = 'auto'
        footballX += dx * (hardLevel) // Update X position
        footballY += dy * (hardLevel)// Update Y position
        // footballY = Math.floor((highTarget * percen) / 100) // Update Y position
      }
    }
  } else {
    football.style.display = 'none';
    bonus.style.display = 'none';
    bomb.style.display = 'none';
    check = false
    timeCounter = 0
    football.style.width = 50 + 'px'
    football.style.height = 50 + 'px'
    bonus.style.width = 50 + 'px'
    bonus.style.height = 50 + 'px'
    bomb.style.width = 50 + 'px'
    bomb.style.height = 50 + 'px'
    footballX = window.innerWidth / 2 // Reset X position
    footballY = window.innerHeight / 2 // Reset Y position
    getRandomNumber()
    if (isBonus === 4) {
      isBonus = 0
    }
    // dx = 0; // Reset horizontal velocity
    // dy = -window.innerHeight / 1000; // Reset vertical velocity for moving upwards
  }


  football.style.left = footballX + 'px';
  football.style.top = footballY + 'px';
  bonus.style.left = footballX + 'px';
  bonus.style.top = footballY + 'px';
  bomb.style.left = footballX + 'px';
  bomb.style.top = footballY + 'px';
  if (!isOver) {
    if (percen < 100 && !check) {
      requestAnimationFrame(updateFootballPosition); // Update position in the next frame
    } else {
      asyncFunction().then(() => {
        requestAnimationFrame(updateFootballPosition); // Update position in the next frame
      })
    }
  }
}

document.getElementById('football').addEventListener('click', function () {
  score++
  isBonus++
  hardLevel = Math.floor(score /5)* 0.5 + defaultHardLevel
  document.getElementById('score-value').textContent = score;
  document.getElementById('score-sum').textContent = score;
  // this.style.display = 'none';
  check = true
  // this.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
  this.style.top = Math.floor(window.innerWidth / 2) + 'px';
  this.style.left = Math.floor(window.innerWidth / 2) + 'px';
  const gotone = document.getElementById('gotone')
  const audio = new Audio("gotone.mp3");
  audio.play()
  gotone.style.display = 'block'
  setTimeout(() => {
    gotone.style.display = 'none'
  }, 200)
  // setTimeout(() => {
  //   timeCounter = 0
  //   // this.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
  //   this.style.top = 0 + 'px';
  //   this.style.left = Math.floor(window.innerWidth / 2) + 'px';
  //   this.style.display = 'block';
  // }, 1000);
})

document.getElementById('bonus').addEventListener('click', function () {
  score += 2
  isBonus = 0
  hardLevel = Math.floor(score /5)* 0.5 + defaultHardLevel
  document.getElementById('score-value').textContent = score;
  document.getElementById('score-sum').textContent = score;
  check = true
  this.style.top = Math.floor(window.innerWidth / 2) + 'px';
  this.style.left = Math.floor(window.innerWidth / 2) + 'px';
  const gotone = document.getElementById('gottwo')
  const audio = new Audio("gottwo.mp3");
  audio.play()
  gotone.style.display = 'block'
  setTimeout(() => {
    gotone.style.display = 'none'
  }, 200)
})

document.getElementById('bomb').addEventListener('click', function () {
  const audio = new Audio("bomb.mp3");
  audio.play()
  isOver = true
  $('#exampleModalCenter').modal('show')
  check = true
  this.style.top = Math.floor(window.innerWidth / 2) + 'px';
  this.style.left = Math.floor(window.innerWidth / 2) + 'px';
})
updateFootballPosition(); // Start updating football position

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('football').style.top = footballY + 'px';
  document.getElementById('football').style.left = footballX + 'px';
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the cursor image element
  var cursorImage = document.getElementById("cursorImage");

  // Function to update the position of the cursor image
  function updateCursorPosition(event) {
    cursorImage.style.display = "block"; // Show the image
    // Set the position of the image to follow the cursor
    cursorImage.style.left = event.clientX + "px";
    cursorImage.style.top = event.clientY + "px";
  }

  // Add event listener to track mouse movement
  document.addEventListener("mousemove", updateCursorPosition);
});