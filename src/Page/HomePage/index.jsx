import ProductCard from "../../components/productCard";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { ProductData, allProducts } from "../../redux/slices/productSlice";
import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardImg,
  Button,
  Modal,
} from "reactstrap";

const HomePage = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { products } = useSelector(allProducts);

  useEffect(() => {
    dispatch(ProductData());
  }, []);
  console.log("data--",products)

  const toggleModal = ()=>{

  }
  return (
    <div className="main">
      <div className="right-col">
        <h2>SAVIYNT</h2>
      </div>
      <div className="left-col">
        <h1>Customers</h1>
        <button className="add-button" onClick={()=>setModal(true)}>Add New Customers</button>
        <div className="banner">
          <h4>Customer ID</h4>
          <h4>Customer Name</h4>
          <h4>Email</h4>
        </div>
        <div>
          {products.map((data,index)=>
            <ProductCard data={data} key={index}/>
        )}
        </div>
      </div>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <Card>
            <CardBody className="mt-2">
              <h5>Are you sure you want to delete this Section ?</h5>
            </CardBody>
            <CardFooter>
              <button className="btn btn-danger me-2">
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </CardFooter>
          </Card>
        </Modal>
    </div>
  );
};
export default HomePage;
