let randomizeArray = document.getElementById('randomize-array-btn');
let sortBtn = document.getElementById('sort-btn');
let barsContainer = document.getElementById('bars-container');
let minRange = 1;
let maxRange = 100;
let numOfBars = 40;
let heightFactor = 5.5;
let unsortedArray = new Array(numOfBars);

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomArray() {
  for (let i = 0; i < numOfBars; i++) {
    unsortedArray[i] = randomNum(minRange, maxRange);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  createRandomArray();
  renderBars(unsortedArray);
});

function renderBars(array) {
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = array[i] * heightFactor + 'px';
    barsContainer.appendChild(bar);
  }
}

randomizeArray.addEventListener('click', function() {
  createRandomArray();
  barsContainer.innerHTML = '';
  renderBars(unsortedArray);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = 'powderblue';
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + 'px';
        bars[j].style.backgroundColor = 'royalblue';
        bars[j + 1].style.height = array[j + 1] * heightFactor + 'px';
        bars[j + 1].style.backgroundColor = 'royalblue';
        await sleep(25);
      }
    }
    await sleep(25);
  }

  return array;
}

sortBtn.addEventListener('click', function() {
  let sortedArray = bubbleSort(unsortedArray);
  console.log(sortedArray);
});