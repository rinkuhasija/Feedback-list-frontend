import { useEffect, useState } from 'react'
import styles from './filtersCard.module.css'
import axios from 'axios';

function FiltersCard({ data }) {

    // const [selectedCategory, setSelectedCategory] = useState('');

    const handleFilter = async (category) => {
        try {
            const response = await axios.get('https://feedback-list-imnos.ondigitalocean.app/api/company/companies-list', {
                params: { category }
            });
            const filteredCompanies = response.data;
            console.log(filteredCompanies)
            console.log('triggerred')
            // Process the filtered companies data
        } catch (error) {
            console.error('Error retrieving filtered companies:', error);
        }
    };

    // useEffect(() => {
    //     console.log(data)
    // }, [])

    // console.log(data)

    return (
        <div className={styles.filtersCardContainer}>

            <div className={styles.filterHeading}>
                <h3> Feedback </h3>
                <p>Apply Filter</p>
            </div>


            <div className={styles.filterButtonsCard}>


                {data.map((item, index) => {
                    return (<>

                        <button onClick={()=> handleFilter(item.category[0])} key={index}>

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