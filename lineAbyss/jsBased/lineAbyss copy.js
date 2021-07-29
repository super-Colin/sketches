

// let elem = document.querySelector('#lastp')
// document.querySelector('#lastp').getBoundingClientRect()
// elem.getBoundingClientRect('.lineAbyss_movingLine)

addEventListener('scroll', lineAbyssScrollHandler)


let previousScrollPosition = window.scrollY;

function lineAbyssScrollHandler(){
  let currentScrollPosition = window.scrollY;

  // let containeR = document.querySelector('#line');
  // var percentageDownPage = 100 * containeR.scrollTop / (containeR.scrollHeight - containeR.clientHeight);
  var percentageDownPage = amountScrolled();
  // console.log(percentageDownPage, ' percent of page scrolled');

  // hitScrollTriggerAtBottomOfScreen(document.querySelector('#lastp'));

  rotateLinesContainer(percentageDownPage, 60, 33, '-');
  moveLines(currentScrollPosition);
}




function rotateLinesContainer(currentScrollPercentage, targetAngle, doneByPercentage, intPositiveOrNegativeString = ''){
  const linesContainer = document.querySelector('#lineAbyss_linesContainer');
  let percentToComplete = ( currentScrollPercentage / doneByPercentage) ;
  let rotationDegrees = Math.min(percentToComplete * targetAngle, targetAngle);
  // console.log( percentToComplete + ' percentToComplete');
  // console.log(rotationDegrees + ' degrees');
  linesContainer.style.transform = 'rotate(' + intPositiveOrNegativeString + rotationDegrees + 'deg)';
}


function moveLines( currentScrollPercentage){
  const lines = document.querySelectorAll('.lineAbyss_movingLine');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const left = Math.min( Math.round( currentScrollPercentage * (i + 1) * 0.03 ), 100) + '%'; //i+1 to avoid 0%
    // console.log('lines updated', left)
    line.style.left = left;
    line.style.width = (currentScrollPercentage * (i + 1) * 0.02) + 'px';
  }
}




function hitScrollTriggerAtBottomOfScreen(elem){
  // console.log(elem, elem.offsetTop, window.pageYOffset + window.innerHeight);
  if(elem.offsetTop + 10 <= window.pageYOffset + window.innerHeight){
    // console.log('hit trigger');
    return true;
  }else{
    return false
  }
}




function getTopScrollYOfElement(elem){
  const rect = elem.getBoundingClientRect();
  return rect.top + window.pageYOffset;
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

function amountScrolled(){
    var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    var docheight = getDocHeight()
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    return pctScrolled;
    // console.log(pctScrolled + '% scrolled')
}

