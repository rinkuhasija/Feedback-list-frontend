import { useEffect, useState, useContext } from 'react'
import styles from './filtersCard.module.css'
import axios from 'axios';
import { DataContext } from '../../context/DataContext';

function FiltersCard({ dataFrom }) {

    const { data, setData } = useContext(DataContext);

    const handleFilter = async (category) => {
        try {
            const response = await axios.get('https://feedback-list-imnos.ondigitalocean.app/api/company/companies-list', {
                params: { category }
            });
            const filteredCompanies = response.data;
            setData(filteredCompanies);
        } catch (error) {
            console.error('Error retrieving filtered companies:', error);
        }
    };

    useEffect(() => {
        handleFilter()
    }, [setData])


    return (
        <div className={styles.filtersCardContainer}>

            <div className={styles.filterHeading}>
                <h3> Feedback </h3>
                <p>Apply Filter</p>
            </div>


            <div className={styles.filterButtonsCard}>

                <button onClick={()=> handleFilter()}> <span> All </span></button>

                {dataFrom.map((item, index) => {
                    return (<>

                        <button onClick={()=> handleFilter(item.category)} key={index}>

                            <span> {item.category[0]} </span>

                        </button>

                        {item.category[1] ? <button>  <span> {item.category[1]} </span> </button> : ""}

                    </>
                    )
                })}

            </div>
        </div>
    )
}

export default FiltersCard