import FiltersCard from '../../Components/FiltersCard/FiltersCard'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './feedbacks.module.css'
import { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
import AddProductForm from '../../Components/AddProductForm/AddProductForm'
import upvote_svg from '../../assets/upvote_svg.png'
import comments_svg from '../../assets/comment_svg.png'
import commentBtnSvg from '../../assets/commentBtnSvg.png'
import { DataContext } from '../../context/DataContext'
import { useNavigate } from 'react-router'
import AuthContext from '../../context/AuthContext'
import commentEnter from '../../assets/comment_enter.png'
import LoginForm from '../../Components/LoginForm/LoginForm'
import EditPrdouctForm from '../../Components/EditProductForm/EditProductForm'

function Feedbacks() {

    const { data, setData } = useContext(DataContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const [isVisible, setIsVisible] = useState(false);
    const [editData, setEditData] = useState([]);
    const navigate = useNavigate();
    const commentRef = useRef(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [commentsCalled, setCommentsCalled] = useState(false)
    const [commentContent, setCommentContent] = useState("")

    function displayCommentSection() {
        setIsVisible(!isVisible);
    }

    const handleUpvote = async (companyId) => {
        try {
            await axios.post(`https://feedback-list-imnos.ondigitalocean.app/api/upvotes/${companyId}`);
            console.log('successfully updtaed COunt');
            setUpvoteCount(companyId)
            // Upvote count successfully updated
        } catch (error) {
            console.error('Error updating upvote count:', error);
        }
    };

    const handleCommentPost = async (companyId) => {
        try {
            await axios.post(`http://localhost:3000/api/comments/${companyId}`, {
                content: commentContent
            });
            console.log('successfully added a Comment');
            setCommentContent("")
            // setUpvoteCount(companyId)
            // Upvote count successfully updated
        } catch (error) {
            console.error('Error updating upvote count:', error);
        }
    };

    const handleCommentGet = async (companyId) => {
        displayCommentSection();
        // 

        let whichCompany = companyId;
        setCommentsCalled(!commentsCalled)
        console.log(whichCompany);
        return whichCompany;
    }

    useEffect(() => {

        // console.log(whichCompany);
        async function apiCall() {
            try {
                const response = await axios.get(`http://localhost:3000/api/comments`);
                const commentsData = response.data;
                // console.log(commentsData);
                // setCountData(counts)

                // Update the data state with the upvote count values

                const updatedData = data.map(item => ({
                    ...item,
                    comments: commentsData[item._id],
                }));
                setData(updatedData);
                console.log(updatedData);
                // let mapping = updatedData[0].comments
                // console.log(mapping);
            } catch (error) {
                console.error('Error retrieving COMMENTS', error);
            }
        }
        apiCall()


    }, [commentsCalled])

    // console.log(data);



    const [results, setResults] = useState([])
    let url = 'https://feedback-list-imnos.ondigitalocean.app/api/company/companies-list'
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [countData, setCountData] = useState([])

    useEffect(() => {
        // console.log(companyId);
        const fetchUpvoteCount = async () => {
            // console.log("object");
            try {
                const response = await axios.get(`https://feedback-list-imnos.ondigitalocean.app/api/upvotes/`);
                const counts = response.data;
                setCountData(counts)

                // Update the data state with the upvote count values
                const updatedData = data.map(item => ({
                    ...item,
                    upvoteCount: counts[item._id]
                }));
                // console.log(updatedData);
                setData(updatedData);
                // console.log(counts);
            } catch (error) {
                console.error('Error retrieving upvote count:', error);
            }
        };

        fetchUpvoteCount();
    }, [upvoteCount, setResults, setData]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleEditProduct(...data) {
        setEditData(...data);
        setEditModal(true);
    }

    //persist Login state
    useEffect(() => {
        //check if user is logged in with localStorage state variable
        const loggedIn = window.localStorage.getItem("isLoggedIn");
        if (loggedIn === "true") {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])



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
    }, [setResults, setData])

    //gave this data to FilterCard component to display all Filter Chips
    const dataP = results;


    //when clicked on add product Button
    function handleAddProduct() {
        if (isLoggedIn === false) {
            navigate("/login")
        } else {
            openModal();
        }
    }

    function closeEditModal() {
        setEditModal(false);
    }

    useEffect(() => {

        if (modalIsOpen || editModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }

    }, [modalIsOpen, editModal])



    return (
        <div className={styles.feedbacksContainer}>
            <Navbar />

            <Header />

            {modalIsOpen && <>
                <div className={styles.modalWrapper} onClick={closeModal}>
                </div>
                <div className={styles.modal}>
                    <AddProductForm shareData={closeModal} getProduct={getProducts} />
                    {/* <LoginForm /> */}
                </div>
            </>}

            {editModal && <>
                <div className={styles.modalWrapper} onClick={closeEditModal}>
                </div>
                <div className={styles.modal}>
                    <EditPrdouctForm dataFromFeedback={closeEditModal} dataProducts={editData} />
                    {/* <LoginForm /> */}
                </div>
            </>}


            <div className={styles.allFeedbacks}>

                <div className={styles.FiltersCardContainer}>

                    <FiltersCard countData={countData} dataFrom={dataP} />
                </div>

                <div className={styles.rightSideFeedbacks}>

                    <div className={styles.feedbackHeader}>

                        <h4> 10 Suggestions </h4>
                        <p>Sort by: Upvotes </p>
                        <button onClick={handleAddProduct}> <span> + Add product </span></button>

                    </div>

                    <div className={styles.feedbackMainSection}>

                        {data.map((result, index) => {

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

                                                <div onClick={() => handleCommentGet(result._id)} className={styles.commentBtn}>
                                                    <img src={commentBtnSvg} alt="" />
                                                    <span> Comment </span>
                                                </div>


                                            </div>

                                            <div className={styles.commentsContainer}>


                                                {isVisible && <div ref={commentRef} className={styles.commentInput}>

                                                    <input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} type="text" name="comment" id="comment" placeholder='Add a comment....' />
                                                    <img onClick={() => handleCommentPost(result._id)} src={commentEnter} alt="comment_enter-img" />
                                                </div>}

                                                {isVisible && <div className={styles.allCommentsDisplay}>
                                                    {/* {data.comments.map((item) => {
                                                        return (
                                                            <p> {item.content} </p>
                                                        )
                                                    })} */}
                                                   <p> {result.comments}  </p>
                                                </div>}

                                            </div>


                                        </div>

                                    </div>

                                    <div className={styles.feedbackCardEnd}>
                                        <div onClick={() => {
                                            { handleUpvote(result._id) }
                                            { getProductId(result._id) }
                                        }
                                        }>
                                            <img src={upvote_svg} alt="upvote-img" />
                                            <span id={styles.upvoteCount}> {result.upvoteCount} </span>
                                        </div>

                                        <div className={styles.commentsCount}>

                                            {isLoggedIn && <button onClick={() => {
                                                handleEditProduct({ name: result.name, description: result.description, category: result.category, logo_url: result.logo_url, product_link: result.product_link, id: result._id })
                                            }}> <span> Edit </span> </button>}
                                            <div>
                                                <span> 4 </span>
                                                <img src={comments_svg} alt="comment-svg-img" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )

                        })}



                    </div>
                </div>

            </div>
        </div>
    )
}

export default Feedbacks