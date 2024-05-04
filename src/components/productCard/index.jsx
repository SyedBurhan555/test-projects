import "./index.css";
const ProductCard = ({ data }) => {
  return (
    <div className="product-card">
      <img src={data.avatar} alt="product-image" />
      <span>{data.id}</span>
      <p>{data.first_name}</p>
      <p>{data.email}</p>
      <div className="product-buttons">
        <button>Edit</button>
        <button>delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
