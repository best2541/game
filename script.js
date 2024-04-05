let time = performance.now()
let score = 0;
let footballX = window.innerWidth / 2; // Initial X position
let footballY = window.innerHeight / 2; // Start at the bottom of the screen
let isBomb = false
let isBonus = 0
let dx = 0; // Initial horizontal velocity
let dy = 0; // Velocity for moving upwards
let moveUpTime = 7; // Duration of moving upwards (1 second)
let timeCounter = 0
let check = false
let defaultHardLevel = 0.5
let hardLevel = (Math.floor(score / 5) * 0.2) + defaultHardLevel
let isOver = false
const api = 'https://central-game-api'

function gameOver() {
  isOver = true
  $('#exampleModalCenter').modal('show')
  check = true
}

function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully");
    }, 700);
  });
}

function shareOnFacebook() {
  var url = encodeURIComponent('https://lin.ee/CPsZSyB'); // Replace with your URL
  var quote = encodeURIComponent('Check out this awesome website!'); // Replace with your quote

  var shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
  window.open(shareUrl, '_blank');
}

function getRandomNumber() {
  // Generate a random number between 0 and 1
  var randomNumberX = Math.random() * 4 - 2;
  var randomNumberY = Math.random() * 10 - 5;
  var randomBomb = Math.floor(Math.random() * 10) + 1;

  // Round the number to get integer values
  dx = randomNumberX
  dy = randomNumberY
  isBomb = randomBomb <= 3 ? true : false
}

function increaseLevel() {
  hardLevel++
  const level = document.getElementById('level')
  level.value = hardLevel
}
function decreaseLevel() {
  hardLevel--
  const level = document.getElementById('level')
  level.value = hardLevel
}

function submit(e) {
  // const name = document.getElementById('name')
  const phone = document.getElementById('phone')
  const btn = document.getElementById('submitBtn')
  e.preventDefault();
  axios.post(`${api}/game/save`, { name: '', phone: phone.value, score: score })
    .then(() => {
      btn.innerHTML = "บันทึกคะแนนเรียบร้อย"
      btn.className = "btn btn-success btn-block btn-lg border-curve-btn"
      btn.disabled = true
    }).catch((err) => {
      console.log(err)
      alert('การบันทึกไม่สำเร็จ กรุณาลองใหม่ภายหลัง')
    })
}

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
      } else {
        isBonus = 4
        bonus.style.display = 'block';
        bonus.style.width = 50 + percen + 'px'
        bonus.style.height = 'auto'
        footballX += dx * (hardLevel) // Update X position
        footballY += dy * (hardLevel)// Update Y position
      }
    }
  } else {
    if (check === false && isBomb === false) {

      gameOver()
    }
    football.style.display = 'none';
    bonus.style.display = 'none';
    bomb.style.display = 'none';
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
        check = false
        requestAnimationFrame(updateFootballPosition); // Update position in the next frame
      })
    }
  }
}
document.getElementById('form').addEventListener('submit', function (event) {
  submit(event)
})
document.getElementById('football').addEventListener('click', function () {
  score++
  isBonus++
  hardLevel = (Math.floor(score / 5) * 0.2) + defaultHardLevel
  document.getElementById('score-value').textContent = score;
  document.getElementById('score-sum').textContent = score;
  check = true
  this.style.top = Math.floor(window.innerWidth / 2) + 'px';
  this.style.left = Math.floor(window.innerWidth / 2) + 'px';
  const gotone = document.getElementById('gotone')
  const audio = new Audio("gotone.mp3");
  audio.play()
  gotone.style.display = 'block'
  setTimeout(() => {
    gotone.style.display = 'none'
  }, 200)
})

document.getElementById('bonus').addEventListener('click', function () {
  score += 2
  isBonus = 0
  hardLevel = (Math.floor(score / 5) * 0.2) + defaultHardLevel
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
  gameOver()
  this.style.top = Math.floor(window.innerWidth / 2) + 'px';
  this.style.left = Math.floor(window.innerWidth / 2) + 'px';
})

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('football').style.top = footballY + 'px';
  document.getElementById('football').style.left = footballX + 'px';
});

//นับ countdown หลังกดปุ่ม start
function countdown(element) {
  let count = 3;

  const interval = setInterval(function () {
    element.innerHTML = count - 2
    if (count === 0) {
      updateFootballPosition()
      clearInterval(interval);
    } else if (count === 1) {
      element.style.display = 'none'
      document.getElementById('startBtn').style.display = 'none'
    } else if (count === 2) {
      element.innerHTML = 'START!!'
    }
    count--;
  }, 1000);
}

document.getElementById('startBtn').addEventListener('click', (event) => {
  event.target.innerHTML = 2
  document.getElementById('startBtn').style.pointerEvents = 'none';
  countdown(event.target)
})

$('#start').modal('show') //แสดงปุ่ม start

//ปิดtab
window.addEventListener('beforeunload', function (event) {
  // Cancel the event
  event.preventDefault()
  time -= -this.performance.now()
  // Chrome requires returnValue to be set
  axios.post(`${api}/game/timerecord`, { time: Math.floor(time / 1000) })
    .then(() => {
    }).catch((err) => {
      console.log(err)
    })
});