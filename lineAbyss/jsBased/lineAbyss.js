
// let elem = document.querySelector('#lastp')

addEventListener('scroll', lineAbyssScrollHandler)


function lineAbyssScrollHandler(){
  let currentScrollPosition = window.scrollY;
  var percentageDownPage = percentageOfPageScrolled();

  rotateLinesContainer(percentageDownPage, 60, 20, '-');
  moveLines(currentScrollPosition);
}




function rotateLinesContainer(currentScrollPercentage, targetAngle, doneByPercentage, intPositiveOrNegativeString = ''){
  const linesContainer = document.querySelector('#lineAbyss_linesContainer');
  let percentToComplete = ( currentScrollPercentage / doneByPercentage) ;
  let rotationDegrees = Math.min(percentToComplete * targetAngle, targetAngle);
  linesContainer.style.transform = 'rotate(' + intPositiveOrNegativeString + rotationDegrees + 'deg)';
}

// function moveLines(){
//   const lines = document.querySelectorAll('.lineAbyss_movingLine');
//   const scrollAmountToCompleteAnimation = 100; //px's
//   const percentThroughAnimation = window.scrollY % scrollAmountToCompleteAnimation / scrollAmountToCompleteAnimation; //as a decimal 0.52..
//   const exponent = 2;
//   const movementHighestExponentResult = lines.length * exponent;
//   console.log('percent through animation: ', percentThroughAnimation, movementHighestExponentResult);
//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     const invertedNumber = invertNumberInRange( i + 1, lines.length + 1); // make the number we use a count down rather than up. eg 20,19..
//     // console.log(invertedNumber);
//     const lineMovementLowerBound = invertedNumber * exponent; // creates an expoential curve
//     const lineMovementUpperBound = ( invertedNumber + 1 ) * exponent;
//     const lineMovement = ( lineMovementUpperBound - lineMovementLowerBound ) * percentThroughAnimation + lineMovementLowerBound;
//     const left = Math.min( lineMovement, 100);
//     line.style.left = left + '%';
//   }
// }

function moveLines(){
  const lines = document.querySelectorAll('.lineAbyss_movingLine');
  const scrollAmountToCompleteAnimation = 500; //px's
  const percentThroughAnimation = window.scrollY % scrollAmountToCompleteAnimation / scrollAmountToCompleteAnimation; //as a decimal
  const exponent = 4;
  const movementHighestExponentResult = Math.pow(lines.length, exponent);
  console.log('percent through animation: ', percentThroughAnimation, movementHighestExponentResult);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const invertedNumber = invertNumberInRange( i , lines.length ); // make the number we use a count down 
    const exponentPercentOfHighest = Math.pow(invertedNumber, exponent) / movementHighestExponentResult;
    // console.log('invertedNumber, exponentResult, exponentPercentOfHighest',invertedNumber, Math.pow(invertedNumber, exponent), exponentPercentOfHighest);
    const lineMovementLowerBound = exponentPercentOfHighest; // creates an expoential curve
    const lineMovementUpperBound = Math.pow(invertedNumber + 1, exponent) / movementHighestExponentResult;
    const lineMovement = ( lineMovementUpperBound - lineMovementLowerBound ) * percentThroughAnimation + lineMovementLowerBound;
    const left = Math.round(Math.min( lineMovement, 100) * 1000) * 0.1; //put into 1~100 format
    const width = lineMovement * 12;
    // console.log('left for ' + i + ' is: ', left);
    line.style.left = left + '%';
    line.style.width = width + 'vmax';
  }
}



function isElemOnScreen(elem){
  // console.log(elem.offsetTop + 10, '<', window.pageYOffset + window.innerHeight,'---', elem.offsetTop + elem.getBoundingClientRect().height, '>', window.pageYOffset)
  if( elem.offsetTop + 10 <= window.pageYOffset + window.innerHeight &&  elem.offsetTop + elem.getBoundingClientRect().height >= window.pageYOffset){
    console.log(elem, 'hit trigger');
    return true;
  }else{
    // console.log('failed trigger');
    return false
  }
}




function getTopScrollYOfElement(elem){
  const rect = elem.getBoundingClientRect();
  return rect.top + window.pageYOffset;
}

function invertNumberInRange( currentNumberInRange, highestNumberInRange){
  return Math.min( Math.abs(highestNumberInRange - currentNumberInRange ) , highestNumberInRange);
}

// ~~~~~~~
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
// ~~~
// http://www.javascriptkit.com/javatutors/detect-user-scroll-amount.shtml
// ~~~~~~~





function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}

function percentageOfPageScrolled(){
    var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    var docheight = getDocHeight()
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    return pctScrolled;
}

