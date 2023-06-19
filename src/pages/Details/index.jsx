import ReacsetClassDetailst, { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getVideoClass } from '../../api'

//useRecoilValue:使用值而不需要对值进行修改
import { useRecoilValue, useRecoilState } from "recoil"
import { videoState, classState, clickVideoState } from '../../Recoil/appState'
import { useLocation } from 'react-router-dom'
import Introduction from '../../components/Details/Introduction'

import './index.less'

export default function Details() {

  const navigate = useNavigate()

  let getDetails = useRecoilValue(videoState)
  let [getClassDetails, setClassDetails] = useRecoilState(classState)
  let [getClickVideoState, setClickVideoState] = useRecoilState(clickVideoState)

  //推荐页拿过来的index
  const { state: { index } } = useLocation()

  let [isIcon, setIcon] = useState(false)
  let [isPlay, setPlay] = useState(false)

  const player = useRef()

  //激活样式
  let [isActive, setActive] = useState(true)
  const handleActive = (value) => {
    setActive(value)
  }


  const handleClick = (event, value) => {
    event.stopPropagation()
    setIcon(value)
    console.log('@@@');
  }


  let time = ''
  const handlePlay = (value) => {
    !value ? player.current.play() : player.current.pause()
    if (!value && isIcon) {
      clearTimeout(time)
      time = setTimeout(() => {
        setIcon(false)
      }, 3000)
    }
    setPlay(value)
  }

  const handleEnter = () => {
    player.current.currentTime += 10
    if (!isPlay && isIcon) {
      clearTimeout(time)
      time = setTimeout(() => {
        setIcon(false)
      }, 3000);
    }
  }
  function focus() {

  }

  let handleClassDetail = async (index) => {
    //获取推荐页视频的类似视频
    let res = await getVideoClass(getClassDetails[index].data.id)
    let videoData = res.data.itemList.filter((item, index) => {
      return item.type !== 'textCard' && index < 6
    })
    setClassDetails(videoData)
    //获取点击的视频详情
    setClickVideoState(getClassDetails[index])


  }

  useEffect(() => {
    setClickVideoState('')
    console.log('hhhhhhhhhhhhhhh');
    console.log( getDetails[index],'getDetails');
  }, [])

  return (
    <div className='Details'>
      <div className='Details-header' >

        <div className="Details-top">
          <i onClick={() => { navigate(-1) }} className='iconfont icon-fanhui'></i>
          <div className='top-author'>
            {
              getClickVideoState === '' ?
                <Fragment>
                  {
                    getDetails[index].type === 'videoSmallCard' ?
                      <Fragment>
                        <img src={getDetails[index].data.author.icon} />
                        <p>{getDetails[index].data.author.name}</p>
                      </Fragment> :
                      <Fragment>
                        <img src={getDetails[index].data.content.data.author.icon} />
                        <p>{getDetails[index].data.content.data.author.name}</p>
                      </Fragment>
                  }
                </Fragment> :
                <Fragment>
                  <img src={getClickVideoState.data.author.icon} />
                  <p>{getClickVideoState.data.author.name}</p>
                </Fragment>
            }
          </div>
          <i className='iconfont icon-jia'></i>
        </div>

        <div className='playVideo' style={{ position: 'relative' }} >
          <div onClick={(event) => handleClick(event, !isIcon)} className="videoMask">
            {
              isIcon ?
                <div>
                  <i className={isPlay ? 'iconfont icon-bofang' : 'iconfont icon-zanting'} onClick={() => handlePlay(!isPlay)}></i>
                  <i className='iconfont icon-hanhan-011' onClick={handleEnter}></i>
                </div> : ''
            }
          </div>
          <Fragment>
            {
              getDetails[index].type !== 'videoSmallCard' ?
                <video
                  ref={player}
                  controls
                  autoPlay
                  width='100%'
                  loop
                  src={getClickVideoState === '' ? getDetails[index].data.content.data.playUrl : getClickVideoState.data.playUrl}
                  type="video/webm"
                  onClick={focus}
                ></video> :
                <video
                  ref={player}
                  controls
                  autoPlay
                  width='100%'
                  loop
                  src={getClickVideoState === '' ? getDetails[index].data.playUrl : getClickVideoState.data.playUrl}
                  type="video/webm"
                  onClick={focus}
                ></video>
            }
          </Fragment>

        </div>

        <div className="Details-bottom" >
          <p onClick={() => { handleActive(true) }} className={isActive == true ? 'deIsActive' : ''}>简介</p>
          <p onClick={() => { handleActive(false) }} className={isActive == true ? '' : 'deIsActive'}>评论</p>
        </div>
        <hr />
      </div>
      {/**先判断激活的是简介还是评论组件，再判断推荐页面的是视频列表还是卡片列表 */
        <Fragment>
          {
            isActive ?
              <Fragment>
                {/* {简介} */
                  getDetails[index].type !== 'videoSmallCard' ?
                    <Fragment>
                      {
                        <Introduction
                          listData={
                            getClickVideoState === '' ? {
                              title: getDetails[index].data.header.title,
                              description: getDetails[index].data.content.data.description,
                              consumption: getDetails[index].data.content.data.consumption,
                              tags: getDetails[index].data.content.data.tags,
                              collected: getDetails[index].data.content.data.collected
                            } : {
                              title: getClickVideoState.data.title,
                              description: getClickVideoState.data.description,
                              consumption: getClickVideoState.data.consumption,
                              tags: getClickVideoState.data.tags,
                              collected: getClickVideoState.data.collected
                            }
                          }
                          handleClassDetail={handleClassDetail}
                        />
                        
                      }
                    </Fragment>
                    :
                    <Fragment></Fragment>
                }


              </Fragment> :
              <Fragment>
                {/* {评论} */

                }
              </Fragment>
          }
        </Fragment>
      }
    </div>
  )
}
