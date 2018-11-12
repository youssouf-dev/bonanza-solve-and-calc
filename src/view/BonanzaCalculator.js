import React, { Component } from 'react';

const styles = {
  textCenter: {
	textAlign: "center"
  },
  fiftyPercent: { width: "50%", backgroundColor: "", display: "inline-block" },
  hide: {display: 'none'}
};

// const powerCards=['2','3','4','5','6'];
// const arithmeticSymbols=['+','-','x','÷'];
// let addAndSubNumbers = []; //1 to 18
// let multAndDivNumbers = []; //2 to 12
// let allArithmeticValues = []; //it's in the name
// let randomCards = []; //7 random cards from allArithmeticValues
let cardsCalculations = []; //all possible answers that are legitimate

// const inputArray = [];//new

class BonanzaCalculator extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      powerCardValue: "",
      numOfArithCards: 3,
      hand: undefined,
      showInput: true,
      sunset: {},
      sunrise: {},
    };

    
  }

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

  render() {
	return (
    <div>
      <div style={this.state.showInput ? null : styles.hide}>

        <h2 style={styles.textCenter}>Card Selection</h2>

        <div style={{width: "30%", backgroundColor: "", display: "inline-block", marginLeft: '35%'}}>
          <select onChange={(event) => this.setState({numOfArithCards: event.target.value})}>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
            <option value={6}>Six</option>
            <option value={7}>Seven</option>
          </select>
        </div>

        <div style={styles.textCenter}>
          <h1 className="cardStyle power">
            <input id='thePowerCard' placeholder='' type="text"/>
          </h1>

          <h1 className="cardStyle">
            <input id='theFirst' placeholder='' type="text"/>
          </h1>

          <h1 className="cardStyle">
            <input id='theSecond' placeholder='' type="text"/>
          </h1>

          <h1 className="cardStyle">
            <input id='theThird' placeholder='' type="text"/>
          </h1>

          <h1 className="cardStyle" style={this.state.numOfArithCards > 3 ? null : styles.hide}>
              <input id='theFourth' placeholder={this.state.numOfArithCards > 3 ? "" : "#"} type="text"/>
          </h1>

          <h1 className="cardStyle" style={this.state.numOfArithCards > 4 ? null : styles.hide}>
              <input id='theFifth' placeholder={this.state.numOfArithCards > 4 ? "" : "#"} type="text"/>
          </h1>

          <h1 className="cardStyle" style={this.state.numOfArithCards > 5 ? null : styles.hide}>
              <input id='theSixth' placeholder={this.state.numOfArithCards > 5 ? "" : "#"} type="text"/>
          </h1>
          <h1 className="cardStyle" style={this.state.numOfArithCards > 6 ? null : styles.hide}>
              <input id='theSeventh' placeholder={this.state.numOfArithCards > 6 ? "" : "#"} type="text"/>
          </h1>

        </div>
      <div style={{height: '20px'}}/>

      <div style={styles.textCenter}>
        <button style={{ padding: "10px" }} onClick={() => this.solve()}>
          Solve
        </button>
      </div>
      <hr />
      </div>
      <div style={this.state.showInput ? styles.hide : null}>
        <h1 style={styles.textCenter}>Calculations Complete</h1>
        <div style={styles.textCenter}>
        {
          this.state.hand === undefined ? null :
          this.state.hand.map((card, i) => {
            if (i === 0) {
              return (
                <h1 key={i} className="cardStyle power">
                  {card}
                </h1>
              );
            } else {
              const cardClass = "cardStyle " + this.determineClass(card);
              return (
                <h1 key={i} className={cardClass}>
                  {card}
                </h1>
              );
            }
            
          })
        }
        </div>
      </div>
    </div>
  )};

  solve = () => {
    this.inputArray = this.validateInput();
    // this.setState({hand: this.inputArray});
    this.permuteHelper(this.inputArray.slice(1,8), 0); //stores everything in cardsCalculations

    const findMinAndMax = this.findMinAndMax(); // after this, card calculation is sorted too
    // findMinAndMax={ ansVariety: ansVariety, ansVarietyCards: ansVarietyCards, ansFrequency: ansFrequency }

    this.setState({
      hand: this.inputArray, 
      sunset: {
        result: findMinAndMax.ansVariety[0],
        cards: findMinAndMax.ansVarietyCards[0]
      }, 
      sunrise: {
        result: findMinAndMax.ansVariety[findMinAndMax.ansVariety.length-1],
        cards: findMinAndMax.ansVarietyCards[findMinAndMax.ansVariety.length-1]
      } 
    });
    console.log("MIN", this.state.sunset);
    console.log("MAX", this.state.sunrise);
  };

  validateInput = () => {
    let tempError = false;
    let tempArray = [];

    tempArray.push(document.getElementById('thePowerCard').value);
    tempArray.push(document.getElementById('theFirst').value);
    tempArray.push(document.getElementById('theSecond').value);
    tempArray.push(document.getElementById('theThird').value);

    if (document.getElementById('theFourth').placeholder !== "#") {
      tempArray.push(document.getElementById('theFourth').value);
    }

    if (document.getElementById('theFifth').placeholder !== "#") {
      tempArray.push(document.getElementById('theFifth').value);
    }

    if (document.getElementById('theSixth').placeholder !== "#") {
      tempArray.push(document.getElementById('theSixth').value);
    }

    if (document.getElementById('theSeventh').placeholder !== "#") {
      tempArray.push(document.getElementById('theSeventh').value);
    }

    console.log("TEMP ARRAY", tempArray);

    if (tempArray.indexOf("#") !== -1) {
      tempArray = tempArray.slice(0, tempArray.indexOf("#"))
    }

    console.log("NEW TEMP ARRAY", tempArray);

    for (let i = 0; i < tempArray.length; i++) {
      if(tempArray[i] === "") {
        alert("Slot " + i + " is empty")
        tempError = true;
        return;
      }
    }

    for (let i = 0; i < tempArray.length; i++) {

      if (i > 0) {
        if(tempArray[i][0] ==="+" || tempArray[i][0] ==="-" || tempArray[i][0] ==="*" || tempArray[i][0] ==="/") {
          console.log("Symbol @ " + i + " => " + tempArray[i][0])
        } else {
          alert("symbol '"+tempArray[i][0]+"' is WRONG at index "+ i + ". it should be +, -, * or /");
          tempError = true;
          return;
        }

        // if (!this.isInt(parseInt(tempArray[i].slice(1, 5))) || tempArray[i].slice(1, 5).match(/^[0-9]+$/) ){
        if ( !/^\d+$/.test(tempArray[i].slice(1, 5)) ){
          alert("'"+tempArray[i].slice(1, 5)+"' at index "+ i + " is NOT int")
          tempError = true;
          return;
        } else if (tempArray[i][0] ==="+" || tempArray[i][0] ==="-") {
          if (parseInt(tempArray[i].slice(1, 5), 10) < 1 || parseInt(tempArray[i].slice(1, 5), 10) > 18) {
            // ≼ ≽ 
            alert('RANGE ERROR @ ' + i + '! \n(+) and (-) Cards should be 1 ≼ x ≼ 18 (but it should be 10)')
          }
        } else if (tempArray[i][0] ==="*" || tempArray[i][0] ==="/") {
          if (parseInt(tempArray[i].slice(1, 5), 10) < 2 || parseInt(tempArray[i].slice(1, 5), 10) > 12) {
            // ≼ ≽ 
            alert('RANGE ERROR @ ' + i + '! \n(*) and (/) Card should be 2 ≼ x ≼ 12 (but it should be 10)')
          }
        }
      } else {
        if(this.isInt(parseInt(tempArray[i], 10)) === false) {
          alert('power card "'+ tempArray[i] + '" is NOT int');
          tempError = true;
          return;
        } else {
          if (parseInt(tempArray[i], 10) < 2 || parseInt(tempArray[i], 10) > 7) {
            // ≼ ≽ 
            alert('RANGE ERROR! \nPower Card should be 2 ≼ x ≼ 7');
            tempError = true;
          }
        }
      }
    }

    let unique = [...new Set(tempArray)];

    if (unique.length !== tempArray.length) {
      alert("WE GOT A PROBLEM! \nDuplicate Values Detected!!");
    } else if (!tempError) {
      // alert("hiding input");
      this.setState({showInput: false});
      return tempArray;
    }

    

  };

  isInt = n => {
	return Number(n) === n && n % 1 === 0;
  };

	calculate = (array, show) => {
		// let answer = Number(parseInt( this.state.hand[0] ));
		let answer = Number(parseInt( this.inputArray[0], 10 ));
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
        case "*":
          answer *= Number(array[w].slice(1, 5));
          if (show) { alert("multiply: " + array[w]);}
          break;
        case "÷":
          answer /= Number(array[w].slice(1, 5));
          if (show) { alert("divide: " + array[w]);}
          break;
        case "/":
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
    cardsCalculations.sort(this.compare);
    console.log("++SORTED cardsCalculations++", cardsCalculations);

		// let min = cardsCalculations[0];
    // let max = cardsCalculations[cardsCalculations.length-1];
    let ansVariety = [];
    let ansVarietyCards = [];
    let ansFrequency = [];

    
    
		for (let q = 0; q < cardsCalculations.length; q++) {

      // if (cardsCalculations[q].result < min.result) {
      //   min = cardsCalculations[q];
      // }
      // if (cardsCalculations[q].result > max.result) {
      //   max = cardsCalculations[q];
      // }

      if (ansVariety.indexOf(cardsCalculations[q].result) === -1){
        // if this result is not in the ansVariety array, then push it in
        ansVariety.push(cardsCalculations[q].result);
        ansVarietyCards.push(cardsCalculations[q].cards);
        ansFrequency.push(1);

      } else {
        ansFrequency[ansVariety.indexOf(cardsCalculations[q].result)] += 1
      }
    }

    console.log("===ansVariety===", ansVariety);
    console.log("==ansFrequency==", ansFrequency);

    // this.setState({
    //   sunset: min,
    //   sunrise: max
    // });

    this.setState({
      sunset: cardsCalculations[0],
      sunrise: cardsCalculations[cardsCalculations.length-1]
    });

    return { ansVariety: ansVariety, ansVarietyCards: ansVarietyCards, ansFrequency: ansFrequency };
  };

  compare = (a,b) => {
    if (a.result < b.result)
      return -1;
    if (a.result > b.result)
      return 1;
    return 0;
  };

	determineClass = card => {
		switch (card.charAt(0)) {
			case "+":
				return("add");
			case "-":
				return("substract");
			case "x":
        return("multiply");
      case "*":
				return("multiply");
			case "÷":
        return("divide");
      case "/":
				return("divide");
			default:
				alert("I don't know that symbol: " + card.charAt(0));
		}
  };

}

export default BonanzaCalculator;