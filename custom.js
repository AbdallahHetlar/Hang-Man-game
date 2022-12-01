// letters
let letters = "abcdefghijklmnopqrstuvwxyz";
// ger arry from letters
let lettersArray = Array.from(letters);
// /selct letters container
let lettersCont = document.querySelector(".letters");
// generate letters 
lettersArray.forEach(letter =>{
    // creat span
    let span = document.createElement("span");
    // creat letter text Node
    let theLetter = document.createTextNode(letter);
    // append theLetter to span
    span.appendChild(theLetter);
    // add class on span
    span.className = 'letter-box';
    // append span to the letter cont
    lettersCont.appendChild(span);
});
// obj of words + categories
let words = {
    programming: ["php","JavaScript","go", "python","mySql","c","Html css"],
    movies: ["hulk","prestige","xman end","Coco"],
    people: ["einstin", "Alxander","Stev jop", "Gin Bts"],
    countries: ["syria","palestine","yemen","Egypt","Qatar"]
};
// get random prop 
let allKeys = Object.keys(words);
let randomPropNum = Math.floor(Math.random()*allKeys.length);
let randomPropName = allKeys[randomPropNum];
let randomPropValue = words[randomPropName];
let randomValueNum = Math.floor(Math.random()*randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNum];
// set category info 
document.querySelector(".game-info .category span").innerHTML = randomPropName; //+ " " +randomValueValue; // to test
// selct letters guess elemnt
let lettersGuessCont = document.querySelector(".letter-guess");
// convert choser word to array
let lettersAndSpace = Array.from(randomValueValue);
// create spans depened on word
lettersAndSpace.forEach(letter => {
    //create Empty span
    let emtpySpan = document.createElement("span");
    // if letter is space
    if (letter === ' ') {
        emtpySpan.className ="with-space";
    }
    //append span to the letters guess cont
    lettersGuessCont.appendChild(emtpySpan);
});
// selct letters guss spans
let guessSpans = document.querySelectorAll(".letter-guess span");
// set wrong attempts -------------------------
let worngAttempts = 0;
// select the draw Element
let theDraw = document.querySelector('.hangman-draw');
// handle clicking on letters 
document.addEventListener("click",(e)=> {
    // set the chose status
    let theStatus = false;
    if(e.target.className === 'letter-box'){
        e.target.classList.add("clicked");
        // get clicked letter
        let clickedletter = e.target.innerHTML.toLowerCase(); //console.log(clickedletter)
        // the chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
            //console.log(lettersAndSpace);
        theChosenWord.forEach((wordLetter, wordindex) => {
            // if the clicked letter = one of the chosen word letter 
            if(clickedletter == wordLetter){
               // console.log(`found ${wordindex}`);
                // loop on all guess spans 
                guessSpans.forEach((span, spanindex) => {
                    if(wordindex === spanindex){
                        // set status to true
                        theStatus = true;
                        // print cliced letter in span
                        span.innerHTML = clickedletter;
                    }
                })
            }
        })
        //console.log(theStatus)   // Check
        // if letter is wrong ------------
        if (theStatus !== true) {
            worngAttempts++;
            // add class wrong to draw elm
            theDraw.classList.add(`wrong-${worngAttempts}`);
            //play fail sound
            document.getElementById("fail").play();
            if(worngAttempts === 8) {
                endGame();
                lettersCont.classList.add("finished");
            }
        } else {
            document.getElementById("don").play();
        }
    }
});
// function end game
function endGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The word is: ${randomValueValue} / حمااااااار` );
    let trayAgein = document.createElement("button");
    let btnText = document.createTextNode("Tray Agein")
    trayAgein.appendChild(btnText);
    // append text to div 
    div.appendChild(divText);
    div.appendChild(trayAgein)
    div.className = 'popup';
    // append div to the body
    document.body.appendChild(div);
    document.getElementById("fail-end").play();
    // create reload fun to btn -----
    trayAgein.onclick = function (){
        window.location.reload();
    }
}
