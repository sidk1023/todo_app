import { Checkbox, CheckboxGroup, Tooltip,Badge  } from '@chakra-ui/react'
import {EditIcon,CalendarIcon,DeleteIcon} from '@chakra-ui/icons'
import { useState } from 'react'


 const filler ='In publishing and graphic design, ng on .'
 const date = "27/10/2022"
export default function Task({taskData}){
    
    let badgeText = 'Pending'
    let badgeColor = 'blue'
    if(new Date(taskData.date)<Date.now()){
      badgeText = 'Overdue'
      badgeColor='red'
    }
    return(<>
    <div className='flex justify-between  rounded-md text-white bg-gray-800 px-6 py-4 my-1'>
        <Checkbox size = 'lg' spacing='2rem' colorScheme='pink'>{taskData.text}</Checkbox>
        <div className='flex justify-end '>
        <div><Badge colorScheme={badgeColor}>{badgeText}</Badge></div>
        <div className='ml-4 hover:text-pink-500'>
        <Tooltip label={taskData.date.toString()} fontSize='md'>
  <CalendarIcon />
</Tooltip>
            </div>
            <div className='ml-4 hover:text-pink-500'>
                <EditIcon/>
            </div>
            <div className='ml-4 hover:text-pink-500'>
                <DeleteIcon/>
            </div>
        
            </div>
        </div>
    </>)
}