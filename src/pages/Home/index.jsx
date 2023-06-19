import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom';
import './index.less'

export default function Home() {

  function getActiveClass({isActive}){
    return isActive ? 'topAcitve' : ''

  }

  return (
    <div>
      <div className='header'>
        <NavLink to=""><i className='text-color'>HOT!</i></NavLink>
        <NavLink className={getActiveClass} to="recommend">推荐</NavLink>
        <NavLink className={getActiveClass} to="attention">关注</NavLink>
        <NavLink className={getActiveClass} to="texts">日报</NavLink>
        <NavLink className={getActiveClass} to=""><i className='iconfont icon-xiaoxi'></i></NavLink>
      </div>
      <div className='content'>
        {<Outlet />}
      </div>
    </div>
  )
}
