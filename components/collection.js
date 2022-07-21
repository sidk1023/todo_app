import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";
import Task from "./task";
import {
  FormControl,
  FormLabel,
  Switch ,
  FormErrorMessage,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  ButtonGroup,
  Portal,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

export default function Collection({ collectionData }) {

  const [taskData, setTaskData] = useState([]);
  useEffect(() => {
    console.log("Inside task useEffect");
    let items = JSON.parse(window.localStorage.getItem("tasks"));
    if (items) {
      items = items.filter((a) => a.collectionId === collectionData._id);
      setTaskData(items);
    }
  }, []);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());
  const [inputText, setInputText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sorted, setSorted] = useState(0);
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  const currentPageData = taskData.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(taskData.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleChanges = (e) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputText) {
      alert("Input should not be blank");
    } else if (startDate < Date.now()) {
      alert("Date Should be after today");
    } else {
      console.log(inputText, startDate);
      let items = JSON.parse(window.localStorage.getItem("tasks"));
      items.unshift({
        _id: uuidv4(),
        text: inputText,
        date: startDate,
        completionDate: null,
        collectionId: collectionData._id,
        completed: false
      });
      window.localStorage.setItem("tasks", JSON.stringify(items));
      items = items.filter((a) => a.collectionId === collectionData._id);
      if(sorted){
        items.sort((a,b)=>(new Date(a.date)> new Date(b.date))?1 : (new Date(a.date)< new Date(b.date))?-1:0)
      }
      setTaskData(items);
      setInputText("");
      setStartDate(new Date());
      onClose();
    }
  };
  const onToggle = (e) => {
    e.preventDefault();
   
    if(sorted){
      let items = JSON.parse(window.localStorage.getItem("tasks"));
      if (items) {
        items = items.filter((a) => a.collectionId === collectionData._id);
        setTaskData(items);
      
        setSorted(0)
    }
  }
     else{
      let items = taskData
      items.sort((a,b)=>(new Date(a.date)> new Date(b.date))?1 : (new Date(a.date)< new Date(b.date))?-1:0)
      setTaskData(items)
     
      setSorted(1)
     }
     
}

  return (
    <>
      <div className="my-10 mx-10">
        <div className="text-white text-md sm:text-xl mb-2 flex justify-between">
          <div className="text-2xl">{collectionData.name}</div>
          <div className="flex justify-start" >
          <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='email-alerts' mt='1'>
    Sort By Deadline
  </FormLabel>
  <Switch id='sort'  colorScheme= "pink" mr = '4' onChange={onToggle}/>
</FormControl>
          <div className="mr-2 hover:text-pink-500">
            <DeleteIcon />
          </div>
        
            </div>
        </div>
        <div className="App">
          
          <div className=" text-white mb-4 text-xs">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>

          {currentPageData.map((task) => (
            <Task taskData={task} key={task._id} />
          ))}
        </div>
        <div className="text-sm sm:text-lg text-white">
          <Button onClick={onOpen} colorScheme="pink">
            <AddIcon className="mr-2" /> Add Task
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior={"inside"}
            className="text-white bg-black"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Textarea
                  placeholder="Enter Task"
                  value={inputText}
                  onChange={handleChanges}
                />
                <div className="mx-4 text-lg">Deadline</div>
                <div className="border-2">
                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy h:mm:ss a"
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="pink" onClick={onSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
}
