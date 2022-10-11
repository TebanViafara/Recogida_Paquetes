import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';

const baseUrl = 'http://localhost:3050/shippings/';
const cookies = new Cookies();

class Edit extends Component {

    state = {
        form: {
            id: '',
            date: '',
            time_zone: '',
            width: '',
            length: '',
            height: '',
            size: '',
            origin_address: '',
            origin_city: '',
            full_name_receiver: '',
            dni_receiver: '',
            destination_address: '',
            destination_city: '',
            status: ''
        },
        id: '',
        btn: null
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    save = async () => {
        this.setState({ btn: true });

        var dataBody = {
            dni: cookies.get('dni'),
            full_name: cookies.get('name'),
            date: this.state.form.date,
            time_zone: this.state.form.time_zone,
            width: this.state.form.width,
            length: this.state.form.length,
            height: this.state.form.height,
            size: this.state.form.size,
            origin_address: this.state.form.origin_address,
            origin_city: this.state.form.origin_city,
            full_name_receiver: this.state.form.full_name_receiver,
            dni_receiver: this.state.form.dni_receiver,
            destination_address: this.state.form.destination_address,
            destination_city: this.state.form.destination_city,
            status: this.state.form.status
        }

        await axios.put(baseUrl + `update/${this.state.id}`, dataBody)
            .then(response => {
                return response.data;
            })
            .then(response => {
                if (response.length > 0) {
                    window.location.href = '../menu';
                } else {
                    alert("Error al crear orden :(");
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ btn: false });
            });
    }

    componentDidMount() {
        if (!cookies.get('user')) {
            window.location.href = "./";
        }

        const { id } = this.props.params;

        const getShipping = () => {

            axios.get(baseUrl + id)
                .then(response => {
                    return response.data;
                })
                .then(response => {
                    this.setState({ form: response });
                    this.setState({ form: { date: response.date.split('T')[0] } });
                    this.setState({ id: response.id });
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getShipping();
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div className='card col-sm-5 mt-5'>
                    <div className="card-header">
                        Gestión de paquetes – Actualización de órdenes (Recogida)
                    </div>
                    <div className='card-body'>
                        <div className="form-group m-2">
                            <div className="row mt-3">
                                <div className="col">
                                    <label>Fecha</label>
                                    <input type="date" onChange={this.handleChange} className="form-control form-control-sm" name="date" value={this.state.form.date} />
                                </div>

                                <div className="col">
                                    <label>Hora</label>
                                    <input type="time" onChange={this.handleChange} className="form-control form-control-sm" name="time_zone" value={this.state.form.time_zone} />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <label>Estado</label>
                                    <select onChange={this.handleChange} className="form-control form-control-sm" name="status">
                                        <option value='Cancelado'>Cancelado</option>
                                        <option value='Cumplido'>Cumplido</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <label>Largo</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="length" value={this.state.form.length} />
                                </div>

                                <div className="col">
                                    <label>Ancho</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="width" value={this.state.form.width} />
                                </div>

                                <div className="col">
                                    <label>Alto</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="height" value={this.state.form.height} />
                                </div>

                                <div className="col">
                                    <label>Peso</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="size" value={this.state.form.size} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Dirección recogida</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="origin_address" value={this.state.form.origin_address} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Ciudad recogida</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="origin_city" value={this.state.form.origin_city} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Nombre destinatario</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="full_name_receiver" value={this.state.form.full_name_receiver} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Cédula/Nit destinatario</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="dni_receiver" value={this.state.form.dni_receiver} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Dirección entrega</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="destination_address" value={this.state.form.destination_address} />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Ciudad entrega</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="destination_city" value={this.state.form.destination_city} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                        {
                            !this.state.btn &&
                            <button onClick={() => this.save()} id='btn-login' className='btn btn-primary col-sm'>Actualizar órden</button>
                        }
                        {
                            this.state.btn &&
                            < button className='btn btn-primary' type="button" disabled>
                                <span className='spinner-grow spinner-grow-sm' role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

// export default Edit;
export default (props) => (
    <Edit
        {...props}
        params={useParams()}
    />
);
