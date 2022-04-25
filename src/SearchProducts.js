import Header from "./Header";
import React, {useState } from 'react';
import { Card, Form, Table} from 'react-bootstrap';

function SearchProducts() {
    const [data, setData] = useState([]);



    async function search(key) {
        let result = await fetch(`http://localhost:8000/api/search/${key}`);
        result = await result.json();
        setData(result);
    }

    return(
        <>
         <Header />
         <div className="col-sm-6 offset-sm-3">
                <h1 className='text-center'>Search Product</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className='text-left'>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Search product by name...."  onChange={(e) => search(e.target.value)} />
                    </Form.Group>
                    

                </Form>

                <Card className="p-2">
                <h1 className="text-center">Product Lists</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image</th>
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
                                    <td>
                                        <img style={{ width: 100 }} src={"http://localhost:8000/" + item.file_path}></img>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Card>
            </div>
        </>
        
    )
}

export default SearchProducts;