//Drag and drop functions
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function getNextRank( rank ) {
  if( rank == "A" ) {
    return "2";
  }
  if( rank == "J" ) {
    return "Q";
  }
  if( rank == "K" ) {
    return "A";
  }
  if( rank == "1" ) { // we're only looking at the first character, this represents 10
    return "J";
  }
  return parseInt( rank ) + 1;
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  console.log( ev.target );
  console.log( document.getElementById(data) );
  var findmydiv = ev.target;
  while(findmydiv.nodeName == "IMG") {
    findmydiv = findmydiv.parentElement;
  }
  if (findmydiv.id == "waste") {
     return false;
  }

  console.log( findmydiv.id );
  if ( findmydiv.id.endsWith( "pile" ) ) {
    console.log(data); // the one we just dropped
    console.log(ev.target.id); // the one we just dropped it on
    droppedSplit = data.split("");
    targetSplit = ev.target.id.split("");
    targetRank = targetSplit[ 0 ];
    droppedRank = droppedSplit[ 0 ];
    console.log( "targetRank " + droppedRank );
    nextRank = getNextRank( droppedRank );
    if(ev.target.nodeName == "DIV" && droppedRank != "A"){
      console.log( droppedRank + " is not A");
      return false;
    }
    else if( droppedRank != nextRank) {
      console.log( "droppedrank is not " + nextRank );
      return false;
    }
 }


  card = document.getElementById(data);
  console.log( ev.target.offsetTop );
  card.style.top = 50 + ev.target.offsetTop + "px";
  card.style.left = "0px";
  findmydiv.appendChild(card);
}


//I created card as an object with arrays
var card = {
  suit: "",
  rank: ""
};

var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["C", "D", "H", "S"];
var deck = [];
    
console.log( ranks );
for( var i = 0; i < ranks.length; i++ ) {
  var rank = ranks[ i ];
  console.log( rank );
  
  for( var j = 0; j< suits.length; j++ ) {
    var suit = suits[ j ];
    console.log( suit );
    console.log( rank + suit );
    deck.push( rank + suit );
    }
}
console.log( deck );


//I used a Fisher-Yates shuffle

function shuffle (cardArray) {
  var i = 0
    , j = 0
    , temp = null

  for (i = cardArray.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = cardArray[i]
    cardArray[i] = cardArray[j]
    cardArray[j] = temp
  }
}
shuffle(deck);

//Declaring different arrays from my deck using slice method

var stackPile = deck.slice(29, 53);

var wastePile = [];

//Dinamically add images to a card

/*

var findPreviousImage = ev.target;
  while(findPreviousImage.nodeName == "IMG") {
    findPreviousImage = findPreviousImage.parentElement;
  }

  elem.style.top = 50 + ev.target.offsetTop + "px";
  elem.style.left = "0px";
  findPreviousImage.appendChild(elem);
 */

function createImages ( nameInFile, where, cssImage) {
  var elem = document.createElement("img");
  var fileName = "/Users/Carolina/Desktop/WD/Solitario/Images/JPEG/" + nameInFile + ".jpg";
    elem.setAttribute("src", fileName);
     elem.setAttribute("class", cssImage);
      elem.setAttribute("id", nameInFile);
       elem.setAttribute("width", "100%");
        elem.setAttribute("draggable", "true");
         elem.setAttribute("ondragstart", "drag(event)")
          elem.setAttribute("ondrop", "drop(event)");
           elem.setAttribute("ondragover", "allowDrop(event)");
    document.getElementById(where).appendChild(elem);
    return elem;
  }   


lastIndex = 0;
for( var pileCount = 1; pileCount <= 7; pileCount++ ) {
  var pile = deck.slice(lastIndex, lastIndex+pileCount);
  lastIndex = lastIndex+pileCount;
  for ( var i = 0; i < pile.length; i++ ) {
    elem = createImages( pile [ i ], "pile"+pileCount, "imgAbsolute");
    elem.style.top = i * 50 + "px";
  }
}

/*
var pile1 = deck.slice(1, 2);
createImages( pile1, "pile1");

var pile2 = deck.slice(2, 4);
for ( var i = 0; i < pile2.length; i++ ) {
  createImages( pile2 [ i ], "pile2", "imgAbsolute");
}

var pile3 = deck.slice(4, 7);
for ( var i = 0; i < pile3.length; i++ ) {
  createImages( pile3 [ i ], "pile3", "imgPiles");
}
  
var pile4 = deck.slice(7, 11);
for ( var i = 0; i < pile4.length; i++ ) {
  createImages( pile4 [ i ], "pile4", "imgPiles");
}

var pile5 = deck.slice(11, 16);
for ( var i = 0; i < pile5.length; i++ ) {
  createImages( pile5 [ i ], "pile5", "imgPiles");
}

var pile6 = deck.slice(16, 22);
for ( var i = 0; i < pile6.length; i++ ) {
  createImages( pile6 [ i ], "pile6", "imgPiles");
}

var pile7 = deck.slice(22, 29);
for ( var i = 0; i < pile7.length; i++ ) {
  createImages( pile7 [ i ], "pile7", "imgPiles");
}
*/

//Onclick event on back card image 

document.getElementById("backCard").onclick = function() {

  for ( var i = 0; i<3; i++ ) {

    if( stackPile.length == 0 ) {
      stackPile = wastePile;
      stackPile.reverse();
      wastePile = [];
    }

    card = stackPile.pop();
    elem = createImages( card,  "waste", "imgAbsolute" );
    elem.style.left = i * 50 + "px";
    wastePile.push( card );
}
}

//Spades pile array

var spadesPile = [];

//console.log( suits[0] );

var spades = suits[0];

//console.log(spades);

for ( i = 0; i < ranks.length; i++ ) {
  var rank = ranks[i];
  //console.log( rank + spades );
  spadesPile.push( rank + spades );
};

console.log( spadesPile );

var previous = [];
for (var i=0; i<spadesPile.length; i++) {
  var previousCard = spadesPile[i-1];
  previous.push(previousCard);
  }

console.log(previous);

  /*for( var i = 0; i < spadesPile.length; i++) {
    createImages( spadesPile[ i ], "spades pile", "imgAbsolute");
  };*/