import React, { useState } from 'react'
import '../../styles/client/client-dashbord.css'
import AddJob from './Addjob'
import Client_alljob from './Client_alljob'
import BidList from './BidList'

function Client_dashbord() {

 const [page, setpage] = useState("create")

function removeUser(){
  localStorage.removeItem("loggedInUser")
  window.location='/'
}
function create(){
  setpage("create")
}
function alljobs(){
  setpage("alljobs")
}
function allbids(){
  setpage("allbids")
}
function goTohome(){
  window.location='/'
}

  return (
    <div class="dashboard">
  <div class="sidebar">
    <ul>
      <li onClick={create}>Create Job Offer</li>
      <li onClick={alljobs}>All Jobs</li>
      <li onClick={allbids}>Current Job Bids</li>
      <li onClick={goTohome} style={{ backgroundColor: 'red' }} >Go to home</li>
      <li onClick={removeUser} style={{backgroundColor:"red"}}>Logout</li>
    </ul>
  </div>
  <div class="mainbar">
    {page=="create"?<AddJob/>:""}
    {page=="alljobs"?<Client_alljob/>:""}
    {page=="allbids"?<BidList/>:""}
  </div>
</div>


  )
}

export default Client_dashbord