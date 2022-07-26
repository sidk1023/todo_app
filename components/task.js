import { Checkbox, CheckboxGroup, Tooltip,Badge  } from '@chakra-ui/react'
import {EditIcon,CalendarIcon,DeleteIcon} from '@chakra-ui/icons'
import { useState } from 'react'


export default function Task({taskData,setCount,count}){
    
    const [completed, setCompleted] = useState(taskData.completionDate?1:0)

    const handleCheck = (e) => {
        let tasks = JSON.parse(window.localStorage.getItem('tasks'))
        let objIndex = tasks.findIndex((obj=> obj._id === taskData._id))
        if(completed===0){
            tasks[objIndex].completionDate = Date.now()

            setCompleted(1)
        }
        else{
            tasks[objIndex].completionDate = null
            setCompleted(0)

        }
        window.localStorage.setItem('tasks',JSON.stringify(tasks))
      };

      const handleDelete = (e) =>{
        let tasks = JSON.parse(window.localStorage.getItem('tasks'))
        let objIndex = tasks.findIndex((obj=> obj._id === taskData._id))
        tasks.splice(objIndex,1)
        window.localStorage.setItem('tasks',JSON.stringify(tasks))
        setCount(count+1)
      }
    
    let badgeText = 'Pending'
    let badgeColor = 'blue'
    if(new Date(taskData.date)<Date.now()){
      badgeText = 'Overdue'
      badgeColor='red'
    }
    if(completed===1){
        badgeText = 'Completed'
        badgeColor='green'
    }
    return(<>
    <div className='flex justify-between  rounded-md text-white bg-gray-800 px-6 py-4 my-1'>
        <Checkbox size = 'lg' spacing='2rem' colorScheme='pink' isChecked = {(completed===1)?true:false} onChange={handleCheck}>{taskData.text}</Checkbox>
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
            <div className='ml-4 hover:text-pink-500' onClick={handleDelete}>
                <DeleteIcon/>
            </div>
        
            </div>
        </div>
    </>)
}