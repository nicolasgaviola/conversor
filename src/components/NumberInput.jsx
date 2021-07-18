import React, { useState } from 'react'
import Resultado from './Resultado'
import PropTypes from 'prop-types'
import PrecioMoneda from './PrecioMoneda'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' // Se agrega fontawesome
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons' // Se agrega iconos fontawesome

const NumberInput = ({ valor }) => {

    const valorDolar = 101.65;

    const [numeros, setNumeros] = useState(0);

    const handleChange = (e) => {
        const valorCalcular = e.target.value;
        if (valorCalcular > 0) {
            setNumeros(parseFloat(e.target.value));
        } else {
            setNumeros(parseFloat(0));
        }
    };

    const calcular = () => numeros * valorDolar;
    const calcular_pais = () => 30 / 100 * calcular();
    const calculo_retenciones = () => 35 / 100 * calcular();
    const calculo_total = () => calcular() + calcular_pais() + calculo_retenciones();

    return (
        <>
            <div className="row">
                <div className="col-5">
                    <select className="form-select form-select-sm" aria-label="Peso Argentino" disabled>
                        <option>Peso Argentino</option>
                    </select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-light btn-sm"><i><FontAwesomeIcon icon={faExchangeAlt}/></i></button>
                </div>
                <PrecioMoneda />
            </div>
            <hr />
            <div className="form-floating mb-3">
                <input type="number" onChange={handleChange} value={numeros} className="form-control" id="floatingInput" aria-placeholder="" />
                <label htmlFor="floatingInput">Ingrese el valor a calcular</label>
            </div>
            <hr />
            <Resultado operacion="Costo en pesos (Dólar Oficial)" calculo={calcular()} />
            <Resultado operacion="Impuesto País del 30%" calculo={calcular_pais()} />
            <Resultado operacion="Retencion del 35%" calculo={calculo_retenciones()} />
            <Resultado operacion="Total en pesos con impuesto al dólar" calculo={calculo_total()} />
        </>
    )
}

NumberInput.propTypes = {
    valor: PropTypes.number,
}

export default NumberInput
