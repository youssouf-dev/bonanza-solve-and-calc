// import deckData from '../assets/deck.json';

const brainFunctions = {
  readCardValues() {
    // console.log(deckData);
  },

  saveCardValues() {
    const powerCards = ['2', '3', '4', '5', '6'];
    let plus = [],
      minus = [],
      div = [],
      mult = [];

    let arithmeticValues = this.createArithmeticVals();

    arithmeticValues.forEach((i) => {
      switch (i.charAt(0)) {
        case "+":
          plus.push(i);
          break;
        case "-":
          minus.push(i);
          break;
        case "x":
          mult.push(i);
          break;
        case "/":
          div.push(i);
          break;
        default:
          alert("I don't know that symbol: " + i.charAt(0));
      }
    })

    let deck = {
      "power": powerCards,
      "+": plus,
      "-": minus,
      "x": mult,
      "/": div
    }

    let jsonDeck = JSON.stringify(deck);

    return jsonDeck;
  },



  createArithmeticVals() {

    const arithmeticSymbols = ['+', '-', 'x', '/'];
    let addAndSubNumbers = []; //1 to 18
    let multAndDivNumbers = []; //2 to 12
    let allArithmeticValues = []; //it's in the name

    //populate the addAndSubNumbers array
    for (let i = 1; i <= 18; i++) {
      addAndSubNumbers.push(i);
    }

    //populate the multAndDivNumbers array
    for (let i = 2; i <= 12; i++) {
      multAndDivNumbers.push(i);
    }

    //populate the allArithmeticValues array
    for (let i = 0; i < arithmeticSymbols.length; i++) {

      //Appends the figures with either + or - symbols
      if (arithmeticSymbols[i] === "+" || arithmeticSymbols[i] === "-") {
        for (let j = 0; j < addAndSubNumbers.length; j++) {
          allArithmeticValues.push(arithmeticSymbols[i] + addAndSubNumbers[j]);
        }
      }

      //Appends the figures with either x or / symbols
      if (arithmeticSymbols[i] === "x" || arithmeticSymbols[i] === "/") {
        for (let j = 0; j < multAndDivNumbers.length; j++) {
          allArithmeticValues.push(arithmeticSymbols[i] + multAndDivNumbers[j]);
        }
      }
    }
    return allArithmeticValues
  },

  selectRandSeven(allArithmeticValues) {
    let randomCards = []; //7 random cards from allArithmeticValues

    //randomly selecting
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(
        Math.random() * allArithmeticValues.length
      );

      console.log("At random index " + randomIndex + ", the value is " + allArithmeticValues[randomIndex]);

      randomCards[i] = allArithmeticValues[randomIndex];
      allArithmeticValues.splice(randomIndex, 1);
    }
    return randomCards;
  }


}

export default brainFunctions;