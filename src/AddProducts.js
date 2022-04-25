import Header from "./Header";
import React, {useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function AddProducts() {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const nav = useNavigate();

    async function addProduct() {
        const formData = new FormData;
        formData.append('name', name);
        formData.append('file', file);
        formData.append('description', desc);
        formData.append('price', price);
        await fetch('http://localhost:8000/api/product', {
            method: 'POST',
            body: formData
        });
        nav('/');
        alert('Product added!');
    }

    return(
        <>
         <Header />
         <div className="col-sm-6 offset-sm-3">
                <h1 className='text-center'>Add Product</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className='text-left'>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupFile">
                        <Form.Label className='text-left'>File</Form.Label>
                        <Form.Control type="file" placeholder="Enter thumbnail"  onChange={(e) => setFile(e.target.files[0])} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDesc">
                        <Form.Label className='text-left'>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className='text-left'>Price</Form.Label>
                        <Form.Control type="text" placeholder="Set price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={addProduct}>Add Product</Button>
                    </div>
                </Form>
            </div>
        </>
        
    )
}

export default AddProducts;