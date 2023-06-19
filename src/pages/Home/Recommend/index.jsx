import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecommentList, getCardList, getVideoClass } from '../../../api'
import { getTime } from '../../../utils'
import { videoState,classState } from '../../../Recoil/appState'
import { useSetRecoilState } from 'recoil'
import ListRe from '../../../components/listRe'

import "./index.less"



export default function Recommend() {

  const navigate = useNavigate()

  let [recommentEye, setEye] = useState([])
  let [recommentCard, setCard] = useState([])

  let setData = useSetRecoilState(videoState)
  let setClassDetails = useSetRecoilState(classState)

  const handlePlay = async (index)=>{
    const res = index < 10 ? await getVideoClass(recommentEye[index].data.header.id) : await getVideoClass(recommentCard[index-10].data.id)
    console.log(res,'clickres');
    const videoData = res.data.itemList.filter((item,index)=> item.type !=='textCard' && index <6 )
    setClassDetails(videoData)
    setData([...recommentEye,...recommentCard])

    navigate('/details',{
      replace:true,
      state:{
        index:index
      }
    })

    
  }

  async function funData() {
    const resRe = await getRecommentList()
    console.log(resRe, 'resRe');
    setEye(resRe.data.itemList[0].data.itemList)
    const resCa = await getCardList()
    console.log(resCa, 'resCa');
    setCard(resCa.data.itemList.filter(item => item.type === 'videoSmallCard'))
  }


  //发起请求
  // useEffect(funData(), []);

  //发起请求
  useEffect(() => {

    funData()

  }, []);

  return (
    <div>
      <ListRe recommentEye={recommentEye} handlePlay={handlePlay}></ListRe>
      <hr />
      {
        recommentCard.map((item, index) => {
          return (
            <div className="content-card" key={index}>
              <div className="card-left">
                <img src={item.data.cover.detail} alt="" />
                <i style={{ color: '#fff' }} onClick={()=>handlePlay(index+10)} className='iconfont icon-bofang inconVideo'></i>
              </div>
              <div className="card-right">
                <div className="card-right-top">
                  {item.data.title}
                </div>
                <div className="card-right-bottom">
                  <p>#{item.data.tags[1].name}</p>
                  <p>{getTime(item.data.duration)}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
