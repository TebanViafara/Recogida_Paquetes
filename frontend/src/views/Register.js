import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = 'http://localhost:3050/users/add';
const cookies = new Cookies();

class Register extends Component {
    state = {
        form: {
            name: '',
            user: '',
            password: '',
            email: '',
            dni: ''
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

    register = async () => {
        this.setState({ btn: true });

        var dataBody = {
            name: this.state.form.name,
            user: this.state.form.user,
            password: md5(this.state.form.password),
            email: this.state.form.email,
            dni: this.state.form.dni,
        }

        await axios.post(baseUrl, dataBody)
            .then(response => {
                return response.data;
            })
            .then(response => {
                console.log(response);
                if (response.status == 1) {
                    window.location.href = './';
                } else {
                    alert("Error al registrar :(");
                    this.setState({ btn: false });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ btn: false });
            });
    }

    componentDidMount() {
        if (cookies.get('user')) {
            window.location.href = "./menu";
        }
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div className='card col-sm-4 mt-5'>
                    <div className="card-header">
                        Gestión de paquetes – Registro Usuarios
                    </div>
                    <div className='card-body'>
                        <label>Nombre</label>
                        <input type='text' onChange={this.handleChange} className='form-control' name="name" />

                        <label>Usuario</label>
                        <input type='text' onChange={this.handleChange} className='form-control' name="user" />

                        <label>Contraseña</label>
                        <input type='password' onChange={this.handleChange} className='form-control' name="password" />

                        <label>Correo</label>
                        <input type='email' onChange={this.handleChange} className='form-control' name="email" />

                        <label>Cédula</label>
                        <input type='number' onChange={this.handleChange} className='form-control' name="dni" />
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                        {
                            !this.state.btn &&
                            <button onClick={() => this.register()} id='btn-login' className='btn btn-primary col-sm-3'>Crear</button>
                        }
                        {
                            this.state.btn &&
                            < button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

export default Register;