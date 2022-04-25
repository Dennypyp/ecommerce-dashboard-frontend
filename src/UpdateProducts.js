import Header from "./Header";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";

function UpdateProducts() {
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [data, setData] = useState([]);
    const nav = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            let result = await fetch("http://localhost:8000/api/product/" + id);
            result = await result.json();
            setData(result);
            setName(result.name);
            setDesc(result.description);
            setPrice(result.price);
            setFile(result.file_path);
        }
        fetchData();
    }, []);

    async function editProduct(id){
        const formData = new FormData;
        formData.append('name', name);
        formData.append('file', file);
        formData.append('description', desc);
        formData.append('price', price);
        await fetch('http://localhost:8000/api/product/'+id+'?_method=PUT', {
            method: 'POST',
            body: formData
        });
        nav('/');
        alert('Product has been updated!');
    }
    return (
        <>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h1 className='text-center'>Update Product</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className='text-left'>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" defaultValue={data.name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupFile">
                        <Form.Label className='text-left'>File</Form.Label>
                        <Form.Control type="file" placeholder="Enter thumbnail" onChange={(e) => setFile(e.target.files[0])}/>
                        <img width={150} src={"http://localhost:8000/" + data.file_path} className="mt-3"></img>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDesc">
                        <Form.Label className='text-left'>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" defaultValue={data.description} onChange={(e) => setDesc(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPrice">
                        <Form.Label className='text-left'>Price</Form.Label>
                        <Form.Control type="text" placeholder="Set price" defaultValue={data.price} onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="warning" onClick={()=>editProduct(data.id)}>Edit Product</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default UpdateProducts;