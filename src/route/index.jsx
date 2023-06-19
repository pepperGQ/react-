import React  from 'react';
//路由重定位
import { Navigate } from 'react-router-dom'

//Home组件和其子组件
import Home from  '../pages/Home'
import Recommend from '../pages/Home/Recommend'
import Attention from '../pages/Home/Attention'
import Texts from '../pages/Home/Texts'
import Details from '../pages/Details';

export default [
    {
        path: '/',
        element: <Navigate to="/home/recommend"></Navigate>
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'recommend',
                element: <Recommend />
            },
            {
                path: 'attention',
                element: <Attention />
            },
            {
                path: 'texts',
                element: <Texts />
            },
        ]
    },
    {
        path: '/details',
        element: <Details />
    },
]