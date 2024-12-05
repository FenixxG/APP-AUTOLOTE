import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";

const FacturasCrear = () => {
    const [factura, setFactura] = useState({
        customerName: '',
        invoiceNumber: '',
        dueDate: '',
        message: '',
        discount: '0',
    });

    const [items, setItems] = useState([
        {
            product: '',
            quantity: '',
            unit: '',
            price: '',
            vat: '',
            amount: '',
        }
    ]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFactura(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addNewRow = () => {
        setItems([...items, {
            product: '',
            quantity: '',
            unit: '',
            price: '',
            vat: '',
            amount: '',
        }]);
    };

    const removeRow = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <div className="app-body">
            <div className="container">
                {/* Breadcrumb */}
                <div className="row gx-3">
                    <div className="col-12 col-xl-6">
                        <ol className="breadcrumb mb-3">
                            <li className="breadcrumb-item">
                                <FiHome className="lh-1" />
                                <Link to="/app/home" className="text-decoration-none">Inicio</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">
                                <Link to="/app/facturas" className="text-decoration-none">Facturas</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Crear Factura</li>
                        </ol>
                    </div>
                </div>

                {/* Formulario principal */}
                <div className="row gx-3">
                    <div className="col-xl-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="create-invoice-wrapper">
                                    <div className="row gx-3">
                                        <div className="col-sm-6 col-12">
                                            <div className="row gx-3">
                                                {/* Campos del formulario */}
                                                <div className="col-sm-12 col-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="customerName" className="form-label">Customer Name</label>
                                                        <input
                                                            type="text"
                                                            id="customerName"
                                                            className="form-control"
                                                            value={factura.customerName}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter Customer Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                                                        <input
                                                            type="text"
                                                            id="invoiceNumber"
                                                            className="form-control"
                                                            value={factura.invoiceNumber}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter Invoice Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control datepicker-opens-left"
                                                                id="dueDate"
                                                                value={factura.dueDate}
                                                                onChange={handleInputChange}
                                                                placeholder="DD/MM/YYYY"
                                                            />
                                                            <span className="input-group-text">
                                                                <i className="icon-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-12">
                                                    <div className="mb-2">
                                                        <label htmlFor="message" className="form-label">Message</label>
                                                        <textarea
                                                            rows="3"
                                                            id="message"
                                                            className="form-control"
                                                            value={factura.message}
                                                            onChange={handleInputChange}
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabla de items */}
                                <div className="row gx-3">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th colspan="7" className="pt-3 pb-3">
                                                            Items/Products
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Quantity</th>
                                                        <th>Unit</th>
                                                        <th>Price</th>
                                                        <th>VAT</th>
                                                        <th>Amount (Net)</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <select
                                                                    className="form-select"
                                                                    value={item.product}
                                                                    onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                                                                >
                                                                    <option value="">Select Product</option>
                                                                    <option value="Mobiles">Mobiles</option>
                                                                    <option value="Books">Books</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                                    placeholder="Qty"
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={item.unit}
                                                                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={item.price}
                                                                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                                                    />
                                                                    <span className="input-group-text">
                                                                        <i className="icon-dollar-sign"></i>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={item.vat}
                                                                        onChange={(e) => handleItemChange(index, 'vat', e.target.value)}
                                                                    />
                                                                    <span className="input-group-text">%</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="input-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={item.amount}
                                                                        onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                                                    />
                                                                    <span className="input-group-text">
                                                                        <i className="icon-dollar-sign"></i>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-inline-flex gap-3">
                                                                    <button
                                                                        className="btn btn-outline-danger"
                                                                        onClick={() => removeRow(index)}
                                                                    >
                                                                        <i className="icon-trash"></i>
                                                                    </button>
                                                                    <button className="btn btn-outline-success">
                                                                        <i className="icon-edit"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-primary text-nowrap"
                                                                onClick={addNewRow}
                                                            >
                                                                Add New Row
                                                            </button>
                                                        </td>
                                                        <td colspan="6">
                                                            <div className="row justify-content-end">
                                                                <div className="col-auto">
                                                                    <label className="col-form-label">Discount % of Total Amount</label>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={factura.discount}
                                                                        onChange={handleInputChange}
                                                                        placeholder="0%"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="5">&nbsp;</td>
                                                        <td>
                                                            <p className="m-0">Subtotal</p>
                                                            <p className="m-0">Discount</p>
                                                            <p className="m-0">VAT</p>
                                                            <h5 className="mt-2 text-primary">Total USD</h5>
                                                        </td>
                                                        <td>
                                                            <p className="m-0">$0.00</p>
                                                            <p className="m-0">$0.00</p>
                                                            <p className="m-0">$0.00</p>
                                                            <h5 className="mt-2 text-primary">$0.00</h5>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="col-12">
                                    <div className="text-end">
                                        <button className="btn btn-outline-primary">
                                            Save as Draft
                                        </button>
                                        <Link to="/invoice-list" className="btn btn-primary ms-1">
                                            Create Invoice
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacturasCrear;