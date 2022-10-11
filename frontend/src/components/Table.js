import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ shippings }) => {

    return (
        <table className='table table-sm table-striped table-bordered'>
            <thead>
                <tr>
                    <th># Servicio</th>
                    <th>Fecha</th>
                    <th>Ciudad Entrega</th>
                    <th>Dirección Entrega</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {shippings.map(shipping => (
                    <tr key={shipping.id}>
                        <td>
                            <Link to={`/edit/${shipping.id}`}>
                                {shipping.id}
                            </Link>
                        </td>
                        <td>{shipping.date.split('T')[0]}</td>
                        <td>{shipping.destination_city}</td>
                        <td>{shipping.destination_address}</td>
                        <td>{shipping.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;