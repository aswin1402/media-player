import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import VideoCard from "./Videocard";
import { addCategoryAPI, deleteCategoryAPI, getCategoryAPI, getVideoAPI, updateCategoryAPI } from "../../services/allAPI";
import { Col, Row } from "react-bootstrap";

function Category(dropVideoResponse) {
  const [CategoryName, setCategoryName] = useState("");
  const [allCategories,setAllCategories] = useState([]);
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd =async ()=>{
    if (CategoryName){
      const result = await addCategoryAPI({CategoryName,allVideos:[]})
      console.log(result);
      if(result.status>=200 && result.status<300){
        handleClose()
        setCategoryName("")
        getCategories()
      }else{
        alert(result.message)
      }
      
    }else{
      alert("Please enter category name")
    }
  }
  const getCategories=async()=>{
    const {data}=await getCategoryAPI()
    setAllCategories(data)
  }
  useEffect(()=>{
    getCategories()
  },[dropVideoResponse])
  // console.log(allCategories);
  const removeCategory=async(id)=>{
    await deleteCategoryAPI(id)
    getCategories()
  }
  const dragOver=(e)=>{
    console.log("videocard dragged over the category");
    
    e.preventDefault()
  }
  const VideoDropped=async(e,categoryId)=>{
    const VideoId = e.dataTransfer.getData("VideoId")
    console.log("Video Id:"+ VideoId +"video dropped category id" +categoryId)
    const{data}= await getVideoAPI(VideoId)
    // console.log(data);
    const selectCatedgory= allCategories.find(item=>item.id===categoryId)
    selectCatedgory.allVideos.push(data)
    // console.log(selectCatedgory);
    await updateCategoryAPI(categoryId,selectCatedgory)
    getCategories();
    
  }
   const videoDragStarted=(e,VideoId,categoryId)=>{
   let datashare ={VideoId,categoryId}
   e.dataTransfer.setData('data',JSON.stringify(datashare))
   }
   

  return (
    <>
      <div className="d-grid">
        <button className="btn btn-warning" onClick={handleShow}>
          Add Category
        </button>
      </div>
    {
      allCategories?.length>0?allCategories.map(category=>(
        <div className="border rounded mt-5" droppaable="true" onDragOver={(e)=>dragOver(e)} onDrop={e=>VideoDropped(e,category.id)}>
        <div className="d-flex justify-content-between alig-items-center m-4">
          <h5 className="">{category.CategoryName}</h5>
          <button onClick={()=>removeCategory(category.id)} className="btn">
            <i className="fa-solid fa-trash text-danger"></i>
          </button>
        </div>
        <Row>
          {
            category.allVideos?.length>0?category.allVideos.map(card=>(
              <Col draggable onDragStart={e=>videoDragStarted(e,card.id,category.id)}  className="d-flex justify-content-center mb-3">
                <VideoCard video={card} insideCategory={true} />
              </Col>
            )):null
          }
        </Row>
      </div>

      )):<p className="fw-bolder text-danger">Nothing to Display</p>
      
}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingName"
              label="Category Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>Add Category</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Category;