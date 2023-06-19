import React, { Fragment } from 'react'
import './index.less'

import {useRecoilValue} from 'recoil'
import { classState } from '../../../../Recoil/appState'
import {getTime} from '../../../../utils'

export default function videoRe(props) {

    const {handleClassDetail} = props
    const recommentCard = useRecoilValue(classState)
  return (
    <div className='videoRe'>
        {
            recommentCard.map((item,index)=>{
                return (
                    <Fragment key={index}>
                        <div className="videoRe-header">
                            <div className="header-left">
                                <img src={item.data.author.icon} alt="" />
                            </div>
                            <div className="header-right">
                                <p>{item.data.title}</p>
                                <div className="header-icon">
                                    <p>{item.data.author.name}</p>&nbsp;
                                    <i  className='iconfont icon-bofang'>{getTime(item.data.duration)}</i>
                                </div>
                            </div>
                        </div>
                        <div className="video-content">
                            <img src={item.data.cover.detail} />
                            <i onClick={()=> handleClassDetail(index)} className='iconfont icon-bofang'></i>
                        </div>
                    </Fragment>
                )
            })
        }
        <h4>the end</h4>
    </div>
  )
}
