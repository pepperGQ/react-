import React, { useRef, useState, Fragment } from 'react'
import { getTime } from '../../utils'

import './index.less'

export default function listRe(props) {

    const { recommentEye, name, handlePlay } = props

    const player = useRef()

    const [Icon, setIcon] = useState(false)

    const play = (event) => {
        setIcon(true)
    }

    const pause = () => {
        setIcon(false)
    }

    return (
        <div className='ListRe'>
            {
                recommentEye.map((item, index) => {
                    return (
                        <div className="content" key={index}>
                            {index === 0 && name !== 'Texts' ?
                                <Fragment>
                                    {
                                        <video ref={player} controls autoPlay muted width="100%" onPlay={play} onPause={pause} >
                                            <source src={recommentEye[0].data.content.data.playUrl} type='video/webm' />
                                        </video>
                                    }
                                    {
                                        Icon ? '' :
                                            <Fragment>
                                                <i onClick={() => handlePlay(index)} className='iconfont icon-bofang inconVideo'></i>
                                                <div className='iconMain'> <p>开眼</p><p>精选</p> </div>
                                            </Fragment>
                                    }
                                </Fragment> :
                                <Fragment>
                                    <img src={item.data.content.data.cover.detail} alt="" />
                                    <i onClick={() => handlePlay(index)} className='iconfont icon-bofang inconVideo'></i>
                                    <div className='iconMain'> <p>开眼</p><p>精选</p> </div>
                                </Fragment>
                            }
                            <div className="main-footer">
                                
                                    <div className="footer-left">
                                        <img src={item.data.content.data.author.icon} alt="" />
                                    </div>
                                    <div className="footer-right">
                                        <div className="top">{item.data.header.title}</div>
                                        <div className="botoom">
                                            {item.data.content.data.titlePgc}&nbsp;
                                            #{item.data.content.data.tags[1].name}
                                            <i className="iconfont icon-bofang" style={{ fontSize: '.3rem', margin: '0 .2rem' }}>
                                            </i>
                                            {getTime(item.data.content.data.duration)}
                                        </div>
                                    </div>
                                
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}
