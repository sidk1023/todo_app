import { Checkbox, CheckboxGroup, Tooltip,Badge  } from '@chakra-ui/react'
import {EditIcon,CalendarIcon,DeleteIcon} from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { CollectionInterface, TaskInterface} from '../data/interfaces'
import { getItems,setItems } from '../data/service'

export default function Task({taskData,setCount,count}){
    const [time, setTime] = useState(Date.now());

useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);
    
    const [completed, setCompleted] = useState(taskData.completionDate?1:0)

    const handleCheck = (e) => {
        let tasks: TaskInterface[] = getItems('tasks')
        let objIndex = tasks.findIndex((obj=> obj._id === taskData._id))
        if(completed===0){
            tasks[objIndex].completionDate = new Date(Date.now()) 

            setCompleted(1)
        }
        else{
            tasks[objIndex].completionDate = null
            setCompleted(0)

        }
        setItems('tasks',tasks)
        setCount(count+1)
      };

      const handleDelete = (e) =>{
        let tasks: TaskInterface[] = getItems('tasks')
        let objIndex = tasks.findIndex((obj=> obj._id === taskData._id))
        tasks.splice(objIndex,1)
        setItems('tasks',tasks)
        setCount(count+1)
      }
    
    let badgeText = 'Pending'
    let badgeColor = 'blue'
    if(new Date(taskData.date)<new Date(Date.now())){
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
           
            <div className='ml-4 hover:text-pink-500' onClick={handleDelete}>
                <DeleteIcon/>
            </div>
        
            </div>
        </div>
    </>)
}