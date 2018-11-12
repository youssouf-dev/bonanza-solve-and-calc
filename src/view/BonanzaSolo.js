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
import BonanzaHelpers from './../utils/BonanzaHelpers';

const styles = {
  textCenter: {
    textAlign: "center"
  },
  fiftyPercent: { width: "50%", backgroundColor: "", display: "inline-block" },
};

let randomCards = []; //7 random cards from allArithmeticValues
let cardsCalculations = []; //all possible answers that are legitimate

let helpMe;
class BonanzaSolo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      powerCardValue: "",
      sunset: {},
      sunrise: {},
      showSunset: { result: false, cards: false },
      showSunrise: { result: false, cards: false }
    };

    helpMe = new BonanzaHelpers();
    helpMe.loadGame();
  }

  componentDidMount() {
    helpMe.compute();
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
}

export default BonanzaSolo;