
import {  FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { BookContext } from "../../../context/BookContext";
const SearchBar = () => {
    const {setSearch,search}=useContext(BookContext);
  
    const handleChange=(event)=>{
        setSearch(event.target.value);
      
    }
    return (
        <InputGroup className="mb-3 mt-5">
        <FormControl
            placeholder="Find books here..."
            aria-label="Search books"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={search}
        />
        <InputGroup.Text id="basic-addon2"><FaSearch /></InputGroup.Text>
       
    </InputGroup>
       
    );
}

export default SearchBar;
