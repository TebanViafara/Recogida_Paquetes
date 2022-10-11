import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Navbar extends Component {

    destroySession = () => {
        cookies.remove('id', { path: '/' });
        cookies.remove('name', { path: '/' });
        cookies.remove('user', { path: '/' });
        cookies.remove('email', { path: '/' });

        window.location.href = './';
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <a href="#" className="navbar-brand">Envios</a>
                    <button onClick={() => this.destroySession()} className='btn btn-outline-success'>Cerrar session</button>
                </div>
            </nav>
        );
    }
}

export default Navbar;