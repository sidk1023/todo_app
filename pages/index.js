import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Task from '../components/task'
import Collection from '../components/collection'
import AddButton from '../components/addButton'
import DatePicker from 'react-datepicker'
import { useState,useEffect } from 'react'
import { collectionData } from '../data/data'


export default function Home({allData}) {


  allData = collectionData
  useEffect(() => {
    window.localStorage.setItem("allData",JSON.stringify(allData))
    console.log("Added data")
  }, []);
  return (
    <div className='h-full  bg-gray-900 '>
     <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
    <Navbar> </Navbar>
    <div className='flex justify-center my-4 py-2'>
<AddButton/>

</div>
<section className='mb-20'>

<div className='container mx-auto mt-10'>
  {
    allData.map(
      (collectionData)=>(
          <Collection collectionData = {collectionData} key={collectionData.collectionName}/>
      )
  )
  }
  </div>
</section>   



    </div>
  )
}
