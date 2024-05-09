import { Container } from "react-bootstrap";
import Filter from "./Filter/filter";
import SearchBar from "./Search/searchBar";
import AllBooks from "./booksList/allBooks";

const Index = () => {
  return (
    <Container >
      <div >
      <div className="row ">
        <div className="col-md-12"> <SearchBar /></div>
      </div>

      <div className="sec-section row ">
        <div className="filter col-lg-3  ">
        <h2 className="fw-bold">Filter</h2>
        <span style={{color:'var(--gray-font)'}} className="fs-6">choose your filtration method</span>
          <Filter />

        </div>
        <div className="list col-lg-9 ">
        
          <AllBooks />
        </div>
      </div>
      </div>

    </Container>
  );
};

export default Index;
