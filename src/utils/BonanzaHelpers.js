import React from "react";

const powerCards = ['2', '3', '4', '5', '6'];
const arithmeticSymbols = ['+', '-', 'x', '÷'];
let addAndSubNumbers = []; //1 to 18
let multAndDivNumbers = []; //2 to 12
let allArithmeticValues = []; //it's in the name
let randomCards = []; //7 random cards from allArithmeticValues
let cardsCalculations = [];

class BonanzaHelpers extends React.Component {

	isInt = n => {
		return Number(n) === n && n % 1 === 0;
	};

	calculate = (array, show) => {
		let answer = Number(this.state.powerCardValue);
		for (let w = 0; w < array.length; w++) {
			switch (array[w].charAt(0)) {
				case "+":
					answer += Number(array[w].slice(1, 5));
					if (show) { alert("add: " + array[w]); }
					break;
				case "-":
					answer -= Number(array[w].slice(1, 5));
					if (show) { alert("substract: " + array[w]); }
					break;
				case "x":
					answer *= Number(array[w].slice(1, 5));
					if (show) { alert("multiply: " + array[w]); }
					break;
				case "÷":
					answer /= Number(array[w].slice(1, 5));
					if (show) { alert("divide: " + array[w]); }
					break;
				default:
					alert("I don't know that symbol: " + array[w].splice(0, 1));
			}
			if (show) { alert(answer); }
		}
		if (!show) { return answer; }
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
				return ("add");
			case "-":
				return ("substract");
			case "x":
				return ("multiply");
			case "÷":
				return ("divide");
			default:
				alert("I don't know that symbol: " + card.charAt(0));
		}
	}

	loadGame() {
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

	compute = () => {
		this.permuteHelper(randomCards, 0);
		this.findMinAndMax();
	};

}

export default BonanzaHelpers;