import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faMoneyBillWave}/>

class Conversor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
        }

        this.converter = this.converter.bind(this);
    }

    //Example usage: 
    //https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=90cbaef9d0b4f53d187c

    converter() {
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=90cbaef9d0b4f53d187c`;

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(json => {
                let cotacao = json[de_para]
                let moedaB_valor = (parseFloat(this.state.moedaA_valor * cotacao)).toFixed(2);
                this.setState({ moedaB_valor })
            })
    }

    render() {
        return (
            <div className="conversor">
                <h1>{element}Conversor de Dólar para Real</h1>
                <input
                    type="number"
                    placeholder="Digite um valor..."
                    onChange={
                        (e) => {
                            this.setState({ moedaA_valor: e.target.value });
                        }
                    }
                />
                <button type="button" onClick={this.converter}>Converter</button>
                <p>Valor convertido: <span>R${this.state.moedaB_valor}</span></p>
            </div>
        );
    }
}

export default Conversor;
