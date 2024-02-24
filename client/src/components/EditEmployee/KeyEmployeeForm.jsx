import axios from "axios";
import { useEffect, useState } from "react"
import { POST_keyEmployee } from "../../apiroutes/routes";

export default function KeyEmployeeForm({ id, ceo, onClose }){
    const [formData, setFormData] = useState({
        id: id,
        ceo: ceo,
        image: null
    })

    useEffect(() => {
        const reloadData = {
            id: id,
            ceo: ceo,
            image: null
        }

        setFormData(reloadData)
    }, [id])

    const handleChange = (e) =>{
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const { id, ceo, image } = formData;
            const data = new FormData();


            data.append('id', id)
            data.append('ceo', ceo)
            data.append('image', image)

            const response = await axios.post(POST_keyEmployee, data, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            })

            console.log(response.data);
        } catch(e){
            console.log(e);
        }

        onClose();
    }

    useEffect(() => {
        console.log(id);
    }, [id])

    return (
        <form className='upload-form'>
            <h2>Add as Key Employee</h2>
            <label htmlFor="image" className="form-button-alt" id="form-button">Upload Image</label>
            <input type="file" name='image' id="image" accept='image/' onChange={handleChange} style={{display: "none"}}/>
            <button id="form-button" className="form-button-alt" style={{width: "70%"}} onClick={handleSubmit}>Add</button>
        </form>
    )
}