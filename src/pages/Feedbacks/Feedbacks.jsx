import FiltersCard from '../../Components/FiltersCard/FiltersCard'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './feedbacks.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AddProductForm from '../../Components/AddProductForm/AddProductForm'
import upvote_svg from '../../assets/upvote_svg.png'
import comments_svg from '../../assets/comment_svg.png'
import commentBtnSvg from '../../assets/commentBtnSvg.png'

function Feedbacks() {

    // const handleUpvote = async (companyId) => {
    //     try {
    //         await axios.post(`http://localhost:3000/api/upvotes/${companyId}`);
    //         console.log('successfully updtaed COunt')
    //         // Upvote count successfully updated
    //     } catch (error) {
    //         console.error('Error updating upvote count:', error);
    //     }
    // };

    // const [upvoteCount, setUpvoteCount] = useState(0);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleEditProduct(...data) {
        // openModal();
        console.log(...data);
    }

    const [results, setResults] = useState([])
    let url = 'https://feedback-list-imnos.ondigitalocean.app/api/company/companies-list'

    const data = results;


    function getProducts() {
        axios.get(url)
            .then((response) => {
                setResults(response.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getProducts();
    }, [results])

    return (
        <div className={styles.feedbacksContainer}>
            <Navbar />

            <Header />

            {modalIsOpen && <>
                <div className={styles.modalWrapper} onClick={closeModal}>
                </div>
                <div className={styles.modal}> <AddProductForm />
                </div>
            </>}


            <div className={styles.allFeedbacks}>
                <FiltersCard data={data} />

                <div className={styles.rightSideFeedbacks}>

                    <div className={styles.feedbackHeader}>

                        <h4> 10 Suggestions </h4>
                        <p>Sort by: Upvotes </p>
                        <button onClick={openModal}> <span> + Add product </span></button>

                    </div>

                    <div className={styles.feedbackMainSection}>

                        {results.map((result, index) => {

                            return (

                                <div key={result._id} className={styles.feedbackCard}>

                                    <div className={styles.feedbackCardStart}>

                                        <div className={styles.feedbackCardLogo}>
                                            <img src={result.logo_url} alt="logo-img" />
                                        </div>

                                        <div className={styles.feedbackCardMainData}>
                                            <h3>{result.name}</h3>
                                            <p>{result.description}</p>
                                            <div className={styles.filterChips}>

                                                {
                                                    result.category.map((item, index) => {
                                                        return (<>
                                                            <div className={styles.singleFilterChip} key={index}> <span> {item}  </span> </div>
                                                        </>

                                                        )
                                                    })
                                                }

                                                <div className={styles.commentBtn}>
                                                    <img src={commentBtnSvg} alt="" />
                                                    <span> Comment </span>
                                                </div>


                                            </div>


                                        </div>

                                    </div>

                                    <div className={styles.feedbackCardEnd}>
                                        <div>
                                            <img src={upvote_svg} alt="upvote-img" />
                                            <span id={styles.upvoteCount}> 97 </span>
                                        </div>

                                        <div className={styles.commentsCount}>
                                            <button onClick={() => {
                                                handleEditProduct(result.name, result.description, result.category, result.logo_url)
                                            }}> <span> Edit </span> </button>
                                            <span> 4 </span>
                                            <img src={comments_svg} alt="comment-svg-img" />
                                        </div>
                                    </div>

                                </div>
                            )

                        })};



                    </div>
                </div>

            </div>
        </div>
    )
}

export default Feedbacks