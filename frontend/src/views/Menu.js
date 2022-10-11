import React, { Fragment, useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Table from '../components/Table';

function Menu() {
    const [shippings, setShippings] = useState([]);

    useEffect(() => {
        const getShippings = () => {
            fetch('http://localhost:3050/shippings')
                .then(res => res.json())
                .then(res => setShippings(res))
        }
        getShippings()
    }, [])

    return (
        <Fragment>
            <Navbar />
            <div className='d-flex justify-content-center'>
                <div className='card mt-5 col-10'>
                    <div className='card-header'>
                        <div className="d-flex align-items-center justify-content-between">
                            <h1 className="h3 font-weigth-bold">Envios</h1>
                            <a href='./create' className="btn btn-sm btn-primary">Crear Órden</a>
                        </div>
                    </div>

                    <div className='card-body'>
                        <Table shippings={shippings} />
                    </div>
                </div>
            </div>

        </Fragment >
    );
}

export default Menu;