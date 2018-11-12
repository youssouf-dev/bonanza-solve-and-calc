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
import React, { Component } from "react";
// import Brain from "../api/brain";

const styles = {
  textCenter: {
    textAlign: "center"
  },
  fiftyPercent: { width: "50%", backgroundColor: "", display: "inline-block" },
  thirtyPercent: { width: "30%", backgroundColor: "", display: "inline-block" },
  seventyPercent: { width: "70%", backgroundColor: "", display: "inline-block" },
};

const powerCards = ["2", "3", "4", "5", "6"];
const arithmeticSymbols = ["+", "-", "x", "÷"];
let addAndSubNumbers = []; //1 to 18
let multAndDivNumbers = []; //2 to 12
let allArithmeticValues = []; //it's in the name
let randomCards = []; //7 random cards from allArithmeticValues
let cardsCalculations = []; //all possible answers that are legitimate

//findMinAndMax
let ansVariety = [];
let ansVarietyCards = [];
let ansFrequency = [];

class BonanzaSolver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      powerCardValue: "",
      sunset: {},
      sunrise: {},
      showSunset: { result: false, cards: false },
      showSunrise: { result: false, cards: false },
      playing: false,
      playerData: {},
      stats: {
        show: false,
        filter: "minFirst", //maxFirst, mostFrequentFirst
      }
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

  componentWillMount() {
    //this is just a glorified 'loadGame' function
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

      // console.log(
      //   "At random index " +
      //     randomIndex +
      //     ", the value is " +
      //     allArithmeticValues[randomIndex]
      // );

      randomCards[i] = allArithmeticValues[randomIndex];
      allArithmeticValues.splice(randomIndex, 1);
    }

    // console.log("===== allArithmeticValues =====", allArithmeticValues);
  }

  componentDidMount() {
    this.compute();
    // Brain.readCardValues();
  }

  swapUnsavedEquation = (currentIndex, targetValue) => {
    //Swap the elements at indices current and target
    let myUnSavedEquation = this.state.unsavedEquation;
    let t = myUnSavedEquation[currentIndex];
    let targetIndex = myUnSavedEquation.indexOf(targetValue);
    myUnSavedEquation[currentIndex] = myUnSavedEquation[targetIndex];
    myUnSavedEquation[targetIndex] = t;
    this.setState({ unsavedEquation: myUnSavedEquation });
  };

  render() {
    return (
      <div>

        <h2 style={styles.textCenter}>Card Selection</h2>

        <div style={styles.textCenter}>
          <h1 className="cardStyle power">{this.state.powerCardValue}</h1>

          {randomCards.map((card, i) => {
            const cardClass = "cardStyle " + this.determineClass(card);
            return (
              <h1 key={i} className={cardClass}>
                {card}
              </h1>
            );
          })}
        </div>

        <hr />

        <div style={styles.textCenter} className="hide">
          {!this.state.playing ? (
            <button
              onClick={() => {
                this.setState({ playing: true, unsavedEquation: randomCards });
              }}
            >
              Play
            </button>
          ) : (
            <div className="grid-container grid-x">
              <div className="medium-10 medium-offset-1 grid-x">
                <div className="medium-1">Save</div>
                <div className="medium-10 grid-x">
                  <div className="medium-3 grid-x">
                    <div className="medium-6">{this.state.powerCardValue}</div>
                    <div className="medium-6">
                      <select
                        onChange={event => {
                          if (event.target.value !== "_") {
                            this.swapUnsavedEquation(0, event.target.value);
                          }
                        }}
                      >
                        <option value="_">Select</option>
                        <option value={this.state.unsavedEquation[0]}>
                          {this.state.unsavedEquation[0]}
                        </option>
                        <option value={this.state.unsavedEquation[1]}>
                          {this.state.unsavedEquation[1]}
                        </option>
                        <option value={this.state.unsavedEquation[2]}>
                          {this.state.unsavedEquation[2]}
                        </option>
                        <option value={this.state.unsavedEquation[3]}>
                          {this.state.unsavedEquation[3]}
                        </option>
                        <option value={this.state.unsavedEquation[4]}>
                          {this.state.unsavedEquation[4]}
                        </option>
                        <option value={this.state.unsavedEquation[5]}>
                          {this.state.unsavedEquation[5]}
                        </option>
                        <option value={this.state.unsavedEquation[6]}>
                          {this.state.unsavedEquation[6]}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="medium-3 grid-x">
                    <div className="medium-6">
                      <select>
                        <option value="_">Select</option>
                        <option value={this.state.unsavedEquation[1]}>
                          {this.state.unsavedEquation[1]}
                        </option>
                        <option value={this.state.unsavedEquation[2]}>
                          {this.state.unsavedEquation[2]}
                        </option>
                        <option value={this.state.unsavedEquation[3]}>
                          {this.state.unsavedEquation[3]}
                        </option>
                        <option value={this.state.unsavedEquation[4]}>
                          {this.state.unsavedEquation[4]}
                        </option>
                        <option value={this.state.unsavedEquation[5]}>
                          {this.state.unsavedEquation[5]}
                        </option>
                        <option value={this.state.unsavedEquation[6]}>
                          {this.state.unsavedEquation[6]}
                        </option>
                      </select>
                    </div>
                    <div className="medium-6">num 3</div>
                  </div>
                  <div className="medium-3 grid-x">
                    <div className="medium-6">num 4</div>
                    <div className="medium-6">num 5</div>
                  </div>
                  <div className="medium-3 grid-x">
                    <div className="medium-6">num 6</div>
                    <div className="medium-6">num7</div>
                  </div>
                </div>
                <div className="medium-1">Answer</div>
              </div>
            </div>
          )}

          {/* Have a series of dropdown representing equations
        we need 8 items to form an equation
        the first is the power card
          the 7 after that will be dropdowns 
          the first dropdown will have the whole array as options
          the second with have a subarray from index 1 going... and so on
          we'll make sure you select something from the first dropdown before continuing
            when the user selects an item at index i, 
            we swap index i with 0 for the 1st dropdown
            and so on

        the we have 2 more things to add
          a way to see your current answer
          and a button to save your equation when you're done

        in the future we can add a timer
        
         */}
        </div>

        {this.state.sunset.result === undefined &&
        this.state.sunrise.result === undefined ? (
          <h2 style={styles.textCenter} className="add">
            No Valid Answer (Reload)
          </h2>
        ) : this.state.sunset === this.state.sunrise ? (
          <h2 style={styles.textCenter} className="add">
            Only One Valid Answer (Reload)
          </h2>
        ) : (
          <div>
            <h2 style={styles.textCenter}>
              Valid Answers ({cardsCalculations.length})
            </h2>
            <h6 style={styles.textCenter}>
              Unique Answers ( {ansVariety.length} / {cardsCalculations.length}) 
            </h6>
          </div>
          
        )
        // the higher the length the easier it is
        // when cardsCalculations.length = 5040, the game is super easy
        }

        <div style={styles.fiftyPercent}>
          <h3 style={styles.textCenter}>Sunset (Lowest)</h3>
          {this.state.showSunset.result ? (
            <h1 style={styles.textCenter}>{this.state.sunset.result}</h1>
          ) : (
            <div style={styles.textCenter}>
              <button
                onClick={() => {
                  this.setState({
                    showSunset: { result: true, cards: false }
                  });
                }}
              >
                Show Results
              </button>
            </div>
          )}

          {this.state.showSunset.cards ? (
            <div style={styles.textCenter}>
              <h1>{this.state.sunset.cards}</h1>
              <button
                onClick={() => {
                  this.setState({
                    showSunset: { result: true, cards: false }
                  });
                }}
              >
                Hide Cards
              </button>
              <button
                onClick={() => {
                  this.calculate(this.state.sunset.cards, true);
                }}
              >
                Show Me How
              </button>
            </div>
          ) : this.state.showSunset.result ? (
            <div style={styles.textCenter}>
              <button
                onClick={() => {
                  this.setState({
                    showSunset: { result: false, cards: false }
                  });
                }}
              >
                Hide Results
              </button>
              <button
                onClick={() => {
                  this.setState({
                    showSunset: { result: true, cards: true }
                  });
                }}
              >
                Show Cards
              </button>
            </div>
          ) : null}
        </div>
        <div style={styles.fiftyPercent}>
          <h3 style={styles.textCenter}>Sunrise (Highest)</h3>
          {this.state.showSunrise.result ? (
            <h1 style={styles.textCenter}>{this.state.sunrise.result}</h1>
          ) : (
            <div style={styles.textCenter}>
              <button
                onClick={() => {
                  this.setState({
                    showSunrise: { result: true, cards: false }
                  });
                }}
              >
                Show Results
              </button>
            </div>
          )}

          {this.state.showSunrise.cards ? (
            <div style={styles.textCenter}>
              <h1>{this.state.sunrise.cards}</h1>
              <button
                onClick={() => {
                  this.setState({
                    showSunrise: { result: true, cards: false }
                  });
                }}
              >
                Hide Cards
              </button>
              <button
                onClick={() => {
                  this.calculate(this.state.sunrise.cards, true);
                }}
              >
                Show Me How
              </button>
            </div>
          ) : this.state.showSunrise.result ? (
            <div style={styles.textCenter}>
              <button
                onClick={() => {
                  this.setState({
                    showSunrise: {
                      result: false,
                      cards: false
                    }
                  });
                }}
              >
                Hide Results
              </button>
              <button
                onClick={() => {
                  this.setState({
                    showSunrise: {
                      result: true,
                      cards: true
                    }
                  });
                }}
              >
                Show Cards
              </button>
            </div>
          ) : null}
        </div>

        <hr />

        <div style={styles.textCenter}>
          <button
            style={{ padding: "10px" }}
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Reload Game
          </button>
        </div>

        <hr />

        {
          !this.state.stats.show ?
          <div style={styles.textCenter}>
            <button
              style={{ padding: "10px" }}
              onClick={() => {
                this.setState({stats: { show: true, filter: "minFirst" }})
              }}
            >
              Show Stats
            </button>
          </div> :
          <div>
            <h3 style={styles.textCenter}>Filter</h3>
            <div style={{width: "30%", backgroundColor: "", display: "inline-block", marginLeft: '35%'}}>
              <select onChange={(event) => this.setState({stats: { show: true, filter: event.target.value }})}>
                <option value='minFirst'>Min First</option>
                <option value='maxFirst'>Max First</option>
                <option value='freqFirst'>Most Frequent First</option>
              </select>
            </div>
            <div style={styles.textCenter}>
              
            </div>
            <div style={styles.textCenter}>
              <button
                style={{ padding: "10px" }}
                onClick={() => {
                  this.setState({stats: {show: false, filter: "minFirst"}})
                }}
              >
                Hide Stats
              </button>
            </div>
            
          </div>
        }

        

        
      </div>
    );
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
          if (show) {
            alert("add: " + array[w]);
          }
          break;
        case "-":
          answer -= Number(array[w].slice(1, 5));
          if (show) {
            alert("substract: " + array[w]);
          }
          break;
        case "x":
          answer *= Number(array[w].slice(1, 5));
          if (show) {
            alert("multiply: " + array[w]);
          }
          break;
        case "÷":
          answer /= Number(array[w].slice(1, 5));
          if (show) {
            alert("divide: " + array[w]);
          }
          break;
        default:
          alert("I don't know that symbol: " + array[w].splice(0, 1));
      }
      if (show) {
        alert(answer);
      }
    }
    if (!show) {
      return answer;
    }
  };

  findMinAndMax = () => {
    cardsCalculations.sort(this.compare);

    let min = cardsCalculations[0];
    let max = cardsCalculations[0];

    this.setState({
      sunset: min,
      sunrise: max
    });

    for (let q = 0; q < cardsCalculations.length; q++) {
      if (cardsCalculations[q].result < min.result) {
        min = cardsCalculations[q];
      }

      if (cardsCalculations[q].result > max.result) {
        max = cardsCalculations[q];
      }

      if (ansVariety.indexOf(cardsCalculations[q].result) === -1){
        // if this result is not in the ansVariety array, then push it in
        ansVariety.push(cardsCalculations[q].result);
        ansVarietyCards.push(cardsCalculations[q].cards);
        ansFrequency.push(1);

      } else {
        ansFrequency[ansVariety.indexOf(cardsCalculations[q].result)] += 1
      }
      
    }

    this.setState({
      sunset: min,
      sunrise: max
    });

    console.log("===ansVariety===", ansVariety);
    console.log("==ansFrequency==", ansFrequency);
    console.log("=ansVarietyCards=", ansVarietyCards);

  };

  determineClass = card => {
    switch (card.charAt(0)) {
      case "+":
        return "add";
      case "-":
        return "substract";
      case "x":
        return "multiply";
      case "÷":
        return "divide";
      default:
        alert("I don't know that symbol: " + card.charAt(0));
    }
  };

  compare = (a,b) => {
    if (a.result < b.result)
      return -1;
    if (a.result > b.result)
      return 1;
    return 0;
  };
}

export default BonanzaSolver;
