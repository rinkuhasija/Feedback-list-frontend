import styles from './addProductForm.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import AuthContext from '../../context/AuthContext';

function AddProductForm({ shareData, getProduct }) {

    const token = window.localStorage.getItem("token");
    const navigate = useNavigate()
    const [data, setData] = useState({ name: "", category: "", logo_url: "", product_link: "", description: "", token: token })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const handleCategoryChange = (event) => {
        const categoryValue = event.target.value;

        //split value by , array so as to make it an Array of different String 
        const categoriesArray = categoryValue.split(",").map((category) => category.trim());

        setData((prevData) => ({
            ...prevData,
            category: categoriesArray,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!data.name || !data.category || !data.logo_url || !data.product_link || !data.description || !data.token) {
            alert("Please fill in all fields.");
            return;
        }

        // Send the POST request
        try {

            const response = await fetch("https://feedback-list-imnos.ondigitalocean.app/api/company/companies-list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const responseData = await response.json();
            // console.log(responseData);

            shareData(); //close modal after data submitted
            getProduct(); //update the data to display new Product added at "/" page


        } catch (error) {
            alert("There was a problem with the request, please try again");
        }
    };


    return (
        <div className={styles.addProductForm}>

            <div className={styles.closeBtn}>
                <h2>Add your product </h2>
                <button onClick={() => shareData()}> <span> X </span>  </button>
            </div>


            <form >

                <input name="name" value={data.name} onChange={handleChange} type="text" placeholder='Name of the company' required />

                <input name="category" value={data.category} onChange={handleCategoryChange} type="text" placeholder='Category' required />

                <input name="logo_url" value={data.logo_url} onChange={handleChange} type="text" placeholder='Add logo url' required />

                <input name="product_link" value={data.product_link} onChange={handleChange} type="text" placeholder='Link of product' required />

                <input id={styles.descriptionInput} name="description" value={data.description} onChange={handleChange} type="text" placeholder='Description' required />

            </form>

            <button onClick={handleSubmit}> <span> + Add </span>  </button>

        </div>
    )
}

export default AddProductForm;
