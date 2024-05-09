import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useContext, useState } from "react";
import { BookContext } from "../../../context/BookContext";
import BubbleLoading from "../../staticComponents/bubbleLoading";
import classes from "./accordion.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
export default function CustomAccordion() {
  const {
    fetchDataByAuthor,
    setCurrPage,
    setCheckedAuthors,
    authors,
    categories,
    checkedAuthors,
    checkedCategory,
    setCheckedCategory,
    fetchDataByCategory,
  
    setSearch,
    fetchData
  
  } = useContext(BookContext);

  const [showAllCategories] = useState(false);
  const [showAllAuthors] = useState(false);
  const [numDisplayedCategories, setNumDisplayedCategories] = useState(10);
  const [numDisplayedAuthors, setNumDisplayedAuthors] = useState(10);
  // 
  const handleClearFilters = () => {
    setCheckedAuthors('');
    setCheckedCategory(''); 
    setSearch('');
    setCurrPage(1);
    setNumDisplayedCategories(10); 
    setNumDisplayedAuthors(10);
    fetchData()
  };
 
  const handleCategoryChange = async (event) => {
    const selectedCategory = event.target.value;
    setCheckedCategory(selectedCategory);
    setCurrPage(1);
    await fetchDataByCategory(selectedCategory);
  };
  const handleAuthorChange = async (event) => {
    const selectedAuthor = event.target.value;
    setCheckedAuthors(selectedAuthor);
    setCurrPage(1);
    await fetchDataByAuthor(selectedAuthor);
  };
  if (!categories || !authors) return <BubbleLoading></BubbleLoading>;
  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, numDisplayedCategories);

    const displayedAuthors = showAllAuthors
    ? authors
    : authors.slice(0, numDisplayedAuthors);
  return (
    <div>
     
           <Button
                variant="outlined"
                onClick={handleClearFilters}
                sx={{
                    color: '#5b067d',
                    borderColor: '#5b067d', 
                    '&:hover': {
                        backgroundColor: '#5b067d', 
                        color: 'white', 
                        borderColor: '#5b067d',
                    },
                }}
            >
                <span className={classes.color}>Clear Filters</span>
            </Button>
      <Accordion
        elevation={0}
        sx={{ backgroundColor: "transparent", border: "none" }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#ac62c3', fontWeight:'bold'}} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: "transparent",
            border: "none",
            fontWeight: "bold",
            fontSize: 20,
            "&.Mui-expanded": {
              margin: "0",
            },
          }}
        >
          Categories
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "transparent", border: "none" }}
        >
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="categories"
              name="categories"
              value={checkedCategory}
              onChange={handleCategoryChange}
            >
              {displayedCategories.map((option, index) => (
          <FormControlLabel
          key={index}
          value={option}
          control={
            <Radio
              sx={{
                "&, &.Mui-checked": {
                  color: "#5b067d",
                },
                "&:not(.Mui-checked)": {
                  color: "black",
                },
              }}
            />
          }
          label={option}
          checked={checkedCategory === option} // Update this line
        />
              ))}
            </RadioGroup>
          </FormControl>
          {categories.length > numDisplayedCategories && !showAllCategories ? ( 
                <Button variant="text" onClick={() => setNumDisplayedCategories(prevNum => prevNum + 10)}>
               <div  className={classes.color}>
                   <AddIcon /> Load More
                 </div>
            </Button>
           
          
          ):(
            <Button onClick={() => setNumDisplayedCategories(10)}>

            <div  className={classes.color}  >
                  <RemoveIcon /> Load Less
                 </div>
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        elevation={0}
        sx={{ backgroundColor: "transparent", border: "none" }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#ac62c3', fontWeight:'bold'}} />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            backgroundColor: "transparent",
            border: "none",
            fontWeight: "bold",
            fontSize: 20,
            "&.Mui-expanded": {
              margin: "0",
            },
          }}
        >
          Author
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "transparent", border: "none" }}
        >
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="authors"
              name="authors"
              value={checkedAuthors}
              onChange={handleAuthorChange}
            >
              {displayedAuthors.map((option, index) => (
              <FormControlLabel
              key={index}
              value={option}
              control={
                <Radio
                  sx={{
                    "&, &.Mui-checked": {
                      color: "#5b067d",
                    },
                    "&:not(.Mui-checked)": {
                      color: "black",
                    },
                  }}
                />
              }
              label={option}
              checked={checkedAuthors === option} // Update this line
            />
              ))}
            </RadioGroup>
          </FormControl>
       {authors.length > numDisplayedAuthors && !showAllAuthors ? ( 
                <Button variant="text" onClick={() => setNumDisplayedAuthors(prevNum => prevNum + 10)}>
               <div  className={classes.color}>
                   <AddIcon /> Load More
                 </div>
            </Button>
           
          
          ):(
            <Button onClick={() => setNumDisplayedAuthors(10)}>

            <div  className={classes.color}  >
                  <RemoveIcon /> Load Less
                 </div>
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
