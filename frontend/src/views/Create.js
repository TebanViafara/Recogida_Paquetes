import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = 'http://localhost:3050/shippings/add';
const cookies = new Cookies();

class Create extends Component {

    state = {
        form: {
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
            destination_city: ''
        },
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
            destination_city: this.state.form.destination_city
        }

        await axios.post(baseUrl, dataBody)
            .then(response => {
                return response.data;
            })
            .then(response => {
                if (response.length > 0) {
                    window.location.href = './menu';
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
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div className='card col-sm-5 mt-5'>
                    <div className="card-header">
                        Gestión de paquetes – Registro órdenes (Recogida)
                    </div>
                    <div className='card-body'>
                        <div className="form-group m-2">
                            <div className="row mt-3">
                                <div className="col">
                                    <label>Fecha</label>
                                    <input type="date" onChange={this.handleChange} className="form-control form-control-sm" name="date" />
                                </div>

                                <div className="col">
                                    <label>Hora</label>
                                    <input type="time" onChange={this.handleChange} className="form-control form-control-sm" name="time_zone" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <label>Largo</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="length" />
                                </div>

                                <div className="col">
                                    <label>Ancho</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="width" />
                                </div>

                                <div className="col">
                                    <label>Alto</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="height" />
                                </div>

                                <div className="col">
                                    <label>Peso</label>
                                    <input type="number" onChange={this.handleChange} className="form-control form-control-sm" name="size" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Dirección recogida</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="origin_address" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Ciudad recogida</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="origin_city" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Nombre destinatario</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="full_name_receiver" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Cédula/Nit destinatario</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="dni_receiver" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Dirección entrega</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="destination_address" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">
                                    <label>Ciudad entrega</label>
                                </div>

                                <div className="col">
                                    <input type="text" onChange={this.handleChange} className="form-control form-control-sm" name="destination_city" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                        {
                            !this.state.btn &&
                            <button onClick={() => this.save()} id='btn-login' className='btn btn-primary col-sm'>Crear órden</button>
                        }
                        {
                            this.state.btn &&
                            < button class="btn btn-primary" type="button" disabled>
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;
