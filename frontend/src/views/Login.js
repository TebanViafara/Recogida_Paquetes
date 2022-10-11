import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = 'http://localhost:3050/login';
const cookies = new Cookies();

class Login extends Component {

    state = {
        form: {
            user: '',
            password: ''
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

    login = async () => {
        this.setState({ btn: true });

        var dataBody = {
            user: this.state.form.user,
            password: md5(this.state.form.password)
        }

        await axios.post(baseUrl, dataBody)
            .then(response => {
                return response.data;
            })
            .then(response => {
                if (response.length > 0) {
                    var data = response[0];
                    cookies.set('id', data.id, { path: '/' });
                    cookies.set('dni', data.dni, { path: '/' });
                    cookies.set('name', data.name, { path: '/' });
                    cookies.set('user', data.user, { path: '/' });
                    cookies.set('email', data.email, { path: '/' });

                    window.location.href = './menu';
                } else {
                    alert("Usario o contraseña incorrectos :(");
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
                        Gestión de paquetes – Login
                        <a href='./register' className='btn btn-success'>Registrarse</a>
                    </div>
                    <div className='card-body'>
                        <label>Usuario</label>
                        <input type='text' onChange={this.handleChange} className='form-control' name="user" />

                        <label>Contraseña</label>
                        <input type='password' onChange={this.handleChange} className='form-control' name="password" />
                    </div>
                    <div className="card-footer d-flex justify-content-center">
                        {
                            !this.state.btn &&
                            <button onClick={() => this.login()} id='btn-login' className='btn btn-primary col-sm-3'>Login</button>
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
            </div >
        );
    }
}

export default Login;
