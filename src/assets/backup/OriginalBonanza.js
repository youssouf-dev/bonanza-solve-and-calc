/**
 * Why I created this
 * 
 * Whenever I played, I could never be sure that my sunrise is the highest possible
 * And when the sunset wasn't 0, I wasn't sure 0 wasn't possible
 * 
 * Also, this is possibly a first step towards playing this online in a 1v1 battle.
 * 
 * -Youssouf da Silva
 */
import React, { Component } from 'react';

const styles = {
  textCenter: {
    textAlign: "center"
  },
  fiftyPercent: { width: "50%", backgroundColor: "", display: "inline-block" },
};

const powerCards=['2','3','4','5','6'];
const arithmeticSymbols=['+','-','x','÷'];
let addAndSubNumbers = []; //1 to 18
let multAndDivNumbers = []; //2 to 12
let allArithmeticValues = []; //it's in the name
let randomCards = []; //7 random cards from allArithmeticValues
let cardsCalculations = []; //all possible answers that are legitimate

class OriginalBonanza extends Component {
  constructor(props) {
    super(props);

    this.state = {
      powerCardValue: "",
      sunset: {},
      sunrise: {},
      showSunset: { result: false, cards: false },
      showSunrise: { result: false, cards: false }
    };
  }

  compute = () => {
    this.permuteHelper(randomCards, 0);
    this.findMinAndMax();
  };

  permuteHelper = (arr, index) => {
    if (index >= arr.length - 1) {
      //If we are at the last element - nothing left to permute
      let result = [];

      for (let i = 0; i < arr.length - 1; i++) {
        result.push(arr[i]);
      }
      if (arr.length > 0) {
        result.push(arr[arr.length - 1]);
      }

      const calculatedResult = this.calculate(result, false);

      if (calculatedResult >= 0) {
        if (this.isInt(calculatedResult)) {
          cardsCalculations.push({
            result: calculatedResult,
            cards: result
          });
          // console.log(calculatedResult);
        }
      }

      return;
    }

    for (let k = index; k < arr.length; k++) {
      //For each index in the sub array arr[index...end]

      //Swap the elements at indices index and i
      let t = arr[index];
      arr[index] = arr[k];
      arr[k] = t;

      //Recurse on the sub array arr[index+1...end]
      this.permuteHelper(arr, index + 1);

      //Swap the elements back
      t = arr[index];
      arr[index] = arr[k];
      arr[k] = t;
    }
  };

  componentWillMount() { //this is just a glorified 'loadGame' function
    //select power card
    const randomPowerCardIndex = Math.floor(Math.random() * powerCards.length);
    this.setState({ powerCardValue: powerCards[randomPowerCardIndex] });

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
      //check the symbol
      //for + and -, loop through the addAndSubNumbers array
      if (arithmeticSymbols[i] === "+" || arithmeticSymbols[i] === "-") {
        for (let j = 0; j < addAndSubNumbers.length; j++) {
          allArithmeticValues.push(arithmeticSymbols[i] + addAndSubNumbers[j]);
        }
      }

      //for x and ÷, loop through the multAndDivNumbers array
      if (arithmeticSymbols[i] === "x" || arithmeticSymbols[i] === "÷") {
        for (let j = 0; j < multAndDivNumbers.length; j++) {
          allArithmeticValues.push(arithmeticSymbols[i] + multAndDivNumbers[j]);
        }
      }
    }

    //randomly selecting
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(
        Math.random() * allArithmeticValues.length
      );
      randomCards[i] = allArithmeticValues[randomIndex];
      allArithmeticValues.splice(randomIndex, 1);
    }
  }

  componentDidMount() {
    this.compute();
  }

  render() {
    return <div>
        <h1 style={styles.textCenter}>Welcome to Bonanza</h1>
        <h6 style={styles.textCenter}>Rules | Calculator</h6>
        <hr />

        <h2 style={styles.textCenter}>Card Selection</h2>

        <div style={styles.textCenter}>
          <h1 className="cardStyle power">{this.state.powerCardValue}</h1>

          {randomCards.map((card, i) => {
            const cardClass = "cardStyle " + this.determineClass(card);
            return <h1 key={i} className={cardClass}>
                {card}
              </h1>;
          })}
        </div>

        <hr />

        {
          this.state.sunset.result === undefined && this.state.sunrise.result === undefined
          ? <h2 style={styles.textCenter} className="add">No Valid Answer (Reload)</h2>
          : this.state.sunset === this.state.sunrise
            ? <h2 style={styles.textCenter} className="add">Only One Valid Answer (Reload)</h2>
            : <h2 style={styles.textCenter}>Valid Answers ({cardsCalculations.length})</h2>
            // the higher the length the easier it is
            // when cardsCalculations.length = 5040, the game is super easy
        }
        
        <div style={styles.fiftyPercent}>
          <h3 style={styles.textCenter}>Sunset (Lowest)</h3>
          {this.state.showSunset.result ? <h1 style={styles.textCenter}>
              {this.state.sunset.result}
            </h1> : <div style={styles.textCenter}>
              <button onClick={() => {
                  this.setState({
                    showSunset: { result: true, cards: false }
                  });
                }}>
                Show Results
              </button>
            </div>}

          {this.state.showSunset.cards ? <div style={styles.textCenter}>
              <h1>{this.state.sunset.cards}</h1>
              <button onClick={() => {
                  this.setState({
                    showSunset: { result: true, cards: false }
                  });
                }}>
                Hide Cards
              </button>
              <button onClick={() => {
                  this.calculate(this.state.sunset.cards, true);
                }}>
                Show Me How
              </button>
            </div> : this.state.showSunset.result ? <div style={styles.textCenter}>
              <button onClick={() => {
                  this.setState({
                    showSunset: { result: false, cards: false }
                  });
                }}>
                Hide Results
              </button>
              <button onClick={() => {
                  this.setState({
                    showSunset: { result: true, cards: true }
                  });
                }}>
                Show Cards
              </button>
            </div> : null}
        </div>
        <div style={styles.fiftyPercent}>
          <h3 style={styles.textCenter}>Sunrise (Highest)</h3>
          {this.state.showSunrise.result ? <h1 style={styles.textCenter}>
              {this.state.sunrise.result}
            </h1> : <div style={styles.textCenter}>
              <button onClick={() => {
                  this.setState({
                    showSunrise: { result: true, cards: false }
                  });
                }}>
                Show Results
              </button>
            </div>}

          {this.state.showSunrise.cards ? <div style={styles.textCenter}>
              <h1>{this.state.sunrise.cards}</h1>
              <button onClick={() => {
                  this.setState({
                    showSunrise: { result: true, cards: false }
                  });
                }}>
                Hide Cards
              </button>
              <button onClick={() => {
                  this.calculate(this.state.sunrise.cards, true);
                }}>
                Show Me How
              </button>
            </div> : this.state.showSunrise.result ? <div style={styles.textCenter}>
              <button onClick={() => {
                  this.setState({
                    showSunrise: {
                      result: false,
                      cards: false
                    }
                  });
                }}>
                Hide Results
              </button>
              <button onClick={() => {
                  this.setState({
                    showSunrise: {
                      result: true,
                      cards: true
                    }
                  });
                }}>
                Show Cards
              </button>
            </div> : null}
        </div>

        <hr />

      <div style={styles.textCenter}>
          <button style={{padding: '10px'}} onClick={() => {window.location.reload(true)}}>Reload Game</button>
        </div>

        <hr />
      </div>;
  }

  isInt = n => {
    return Number(n) === n && n % 1 === 0;
  };

  calculate = (array, show) => {
    let answer = Number(this.state.powerCardValue);
    for (let w = 0; w < array.length; w++) {
      switch (array[w].charAt(0)) {
        case "+":
          answer += Number(array[w].slice(1, 5));
          if (show) { alert("add: " + array[w]);}
          break;
        case "-":
          answer -= Number(array[w].slice(1, 5));
          if (show) { alert("substract: " + array[w]);}
          break;
        case "x":
          answer *= Number(array[w].slice(1, 5));
          if (show) { alert("multiply: " + array[w]);}
          break;
        case "÷":
          answer /= Number(array[w].slice(1, 5));
          if (show) { alert("divide: " + array[w]);}
          break;
        default:
          alert("I don't know that symbol: " + array[w].splice(0, 1));
      }
      if (show) { alert(answer);}
    }
    if (!show) { return answer;}
  };

  findMinAndMax = () => {
    let min = cardsCalculations[0];
    let max = cardsCalculations[0];

    for (let q = 0; q < cardsCalculations.length; q++) {
      if (cardsCalculations[q].result < min.result) {
        min = cardsCalculations[q];
      }

      if (cardsCalculations[q].result > max.result) {
        max = cardsCalculations[q];
      }

      this.setState({
        sunset: min,
        sunrise: max
      });
    }
  };

  determineClass = card => {
    switch (card.charAt(0)) {
      case "+":
        return("add");
      case "-":
        return("substract");
      case "x":
        return("multiply");
      case "÷":
        return("divide");
      default:
        alert("I don't know that symbol: " + card.charAt(0));
    }
  }
}

export default OriginalBonanza;