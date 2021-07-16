import React, { Component } from 'react'


class PrecioMoneda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.handleChangeValor = this.handleChangeValor.bind(this);
    }

    handleChangeValor(event) {
        // const nombreEtiqueta = event.target.value;
        // console.log(nombreEtiqueta);
        // const valores = nombreEtiqueta.split('|')
        // const valorMoneda = valores[1]
        // console.log(valorMoneda);
        // this.setNumeros({ value: valorMoneda });
    }

    componentDidMount() {
        fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Nota: es importante manejar errores aquí y no en 
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Cargando...</div>;
        } else {
            return (
                <div className="col-5">
                    <select className="form-select form-select-sm" onChange={this.handleChangeValor} disabled>
                        {items.map(item => (
                            <option value={item.casa.nombre + "|" + item.casa.venta} key={item.casa.nombre + "|" + item.casa.venta}>{item.casa.nombre}</option>
                        ))}
                    </select>
                </div>
            );
        }
    }
}

export default PrecioMoneda
