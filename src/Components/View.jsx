import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';
import { getAlluploadedVideoAPI, getCategoryAPI, updateCategoryAPI } from '../../services/allAPI';


function View({ uploadVideoResponse,setDropVideoResponse }) {
  const [allVideos, setAllVideos] = useState([]);
  const [deleteVideoResponse, setDeleteVideoResponse] = useState(false);

  useEffect(() => {
    getALLuploadedVideos();
    // Reset deleteVideoResponse after fetching videos
    setDeleteVideoResponse(false);
  }, [uploadVideoResponse,deleteVideoResponse]);

  const getALLuploadedVideos = async () => {
    try {
      const result = await getAlluploadedVideoAPI();
      console.log(result);
      if (result.status === 200) {
        setAllVideos(result.data);
      } else {
        setAllVideos([]);
        console.log("API FAILED");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setAllVideos([]);
    }
  };

  // console.log(allVideos);
  const VideoDragOver = (e) =>{
    e.preventDefault();
  }

  const videoDrop = async (e) => {
    const {videoId,categoryId} = JSON.parse(e.dataTransfer.getData('data'))
    console.log(videoId,categoryId)
    const {data}= await getCategoryAPI()
    console.log(data)
    const selectCatedgory=data.find(items=>items.id==categoryId)
    let result =selectCatedgory.allVideos.filter(video=>videoId!==videoId)
    console.log(result)
    let {id,categoryName}=selectCatedgory
    let newCategory={id,categoryName,allVideos:result}
    console.log(newCategory);
    const res =await updateCategoryAPI(categoryId,newCategory)
    setDropVideoResponse(res)

  }

  return (
    <div>
      <Row droppable='true' onDragOver={(e)=>VideoDragOver(e)} onDrop={e=>videoDrop(e)} >
        {
          allVideos.length > 0 ? (
            allVideos.map((video) => (
              <Col key={video.id} sm={12} md={6} lg={4} xl={3}>
                <Videocard video={video} setDeleteVideoResponse={setDeleteVideoResponse} />
              </Col>
            ))
          ) : <p>Nothing to display</p>
        }
      </Row>
    </div>
  );
}

export default View;