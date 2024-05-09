import "./Navbar.css";
// eslint-disable-next-line react/prop-types
function Search({ width, classBS }) {
  return (
    <>
      {" "}
      <div
        className={`input-group ${classBS} position-relative `}
        style={{ width }}
      >
        <input
          className="form-control rounded-2 shadow-none input-search"
          type="search"
          placeholder="search..."
          id="example-search-input"
        />
        <span className=" position-absolute icon-search">
          <i className="bi bi-search fs-5 text-muted" />
        </span>
      </div>
    </>
  );
}

export default Search;
