import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function ProductList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    console.warn("result", data);

    async function deleteOperation(id) {
        if (window.confirm('Apa anda yakin?')) {
            let result = await fetch('http://localhost:8000/api/product/' + id, {
                method: 'DELETE'
            });
            result = await result.json();
            console.warn("result", result);
            getData();
            alert('Product Deleted Successfully');
        } else {
            getData();
        }



    }

    function getData() {

        async function fetchData() {
            const response = await fetch('http://localhost:8000/api/product');
            const json = await response.json();
            setData(json);
        };
        fetchData();

    }

    return (
        <div>
            <Header />
            <Card className="m-5 p-2">
                <h1 className="text-center">Product Lists</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Image</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td className="text-center">
                                        <img width={100} src={"http://localhost:8000/" + item.file_path}></img>
                                    </td>
                                    <td className="d-flex justify-content-center">
                                        <Button className="mx-1" variant="danger" onClick={() => deleteOperation(item.id)}>Delete</Button>
                                        <Link to={"update/"+ item.id}>
                                            <span className="mx-1 btn btn-warning">Update</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Card>
        </div>
    )

}

export default ProductList;