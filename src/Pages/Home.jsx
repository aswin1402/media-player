import React, { useState } from 'react'
import Add from '../Components/Add'
import View from '../Components/View'
import Category from '../Components/Category'
import { Link } from 'react-router-dom'


function Home() {
  const[UploadVideoResponse,setUploadVideoResponse]=useState({})
  const[dropVideoResponse,setDropVideoResponse]=useState({})
  return (
    <>
      <div className="container mt-5 mb-5 d-flex justify-content-between">
        <div className="add-videos">
          <Add setUploadVideoResponse={setUploadVideoResponse}/>
        </div>
        <Link to={'/history'} style={{textDecoration:'none', color:'black', fontsize:'30px',fontWeight:'Bold'}}>Watch History <i className='fa-solid fa-arrow-right-to-bracket'></i></Link>
      </div>
      <div className="container-fluid w-100 mt-5 mb-5 row">
        <div className="all-videos col-lg-9">
          <h1>All Videos</h1>
          <View UploadVideoResponse={UploadVideoResponse} setDropVideoResponse={setDropVideoResponse}/>
        </div>
        <div className="all-videos col-lg-3">
          <Category dropVideoResponse={{dropVideoResponse}} />
        </div>
      </div>
    </>
  )
}

export default Home
