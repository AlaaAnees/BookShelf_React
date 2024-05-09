import "./CategorieCard.css";
function CategorieCard(props) {
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      className="category-card col-6 col-md-2 mx-2 mt-2 mt-md-0"
    >
      {/* Your image */}
      <img
        src={props.img}
        style={{
          maxWidth: "100%",
          maxHeight: "140px",
          display: "block",
          borderRadius: "10px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: "100%",
          height: "100%",
          color: "white",
        }}
      >
        <h4>{props.title}</h4>
      </div>
      {/*  overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#a464b8",
          opacity: "30%",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
}

export default CategorieCard;
