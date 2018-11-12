import React, {Component} from 'react';
import power from '../assets/svgs/Power.svg';

const styles = {
    outerCard: {
        width: '100%',
        height: '100%',
        minHeight: '200px',
    },
    innerCard: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Varela Round',
        fontSize: 0,
        backgroundImage: "url("+power+")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: 'center',
    }
}

class Card extends Component {
    render() {
        return(
            <div style={styles.outerCard}>
                <div style={styles.innerCard}>
                    2
                </div>
            </div>
        );
    };
}

export default Card;