import React, { useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import {useRoom} from '../uttils/roomContext.js'
import { useAuth } from '../uttils/authContext.js'
const RoomRouting = () => {
    const {getRoomByID} = useRoom()
    const {user}  = useAuth()
    const navigate =  useNavigate()

    useEffect( () => {
    },[])
  return (
    <div>Loading... room</div>
  )
}

export default RoomRouting