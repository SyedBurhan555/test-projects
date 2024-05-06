import ProductCard from '../../components/productCard';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserData,
  allUser,
  addUserData,
  sortUsers,
} from '../../redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardTitle, Modal } from 'reactstrap';

const HomePage = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [addUser, setAddUser] = useState({
    id: Math.floor(Math.random() * (1000 + 1)),
    first_name: '',
    email: '',
    avatar: null,
  });
  const { user } = useSelector(allUser);
  console.log(user);

  useEffect(() => {
    dispatch(UserData());
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setAddUser((prevAddUser) => ({
          ...prevAddUser,
          avatar: reader.result,
        }));
      }
    };
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const handleSubmit = () => {
    if (addUser.email && addUser.first_name && addUser.avatar) {
      dispatch(addUserData(addUser));
      setModal(false);
    } else {
      alert('please fill all data');
    }
  };
  const handleSort = (columnName) => {
    console.log(columnName);
    dispatch(sortUsers(columnName));
  };

  // console.log('sort', SortName());
  return (
    <div className="main">
      <div className="right-col">
        <h2>SAVIYNT</h2>
      </div>
      <div className="left-col">
        <h1>Customers</h1>
        <button className="add-button" onClick={() => setModal(true)}>
          Add New Customers
        </button>
        <div className="banner">
          <h4
            onClick={() => handleSort('customerId')}
            style={{ cursor: 'pointer' }}
          >
            Customer ID
          </h4>
          <h4
            onClick={() => handleSort('customerName')}
            style={{ cursor: 'pointer' }}
          >
            Customer Name
          </h4>
          <h4
            onClick={() => handleSort('customerEmail')}
            style={{ cursor: 'pointer' }}
          >
            Email
          </h4>
        </div>
        <div>
          {user.map((data, index) => (
            <ProductCard data={data} key={index} />
          ))}
        </div>
      </div>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <Card>
          <CardBody className="mt-2">
            <CardTitle>
              <h5>Add New Customer</h5>
            </CardTitle>
            <form>
              <input
                type="text"
                placeholder="Customer Name"
                value={addUser.first_name}
                className="form-control"
                onChange={(e) =>
                  setAddUser({
                    ...addUser,
                    first_name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={addUser.email}
                placeholder="Email"
                className="form-control mt-2"
                onChange={(e) =>
                  setAddUser({
                    ...addUser,
                    email: e.target.value,
                  })
                }
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control mt-2"
              />
              {addUser && (
                <div>
                  {/* <h3>Uploaded Image Preview:</h3> */}
                  <img
                    src={addUser.avatar}
                    // alt="Uploaded"
                    style={{ maxWidth: '30%', marginTop: '12px' }}
                  />
                </div>
              )}
            </form>
          </CardBody>
          <CardFooter>
            <button
              className="btn btn-danger me-2"
              onClick={() => handleSubmit()}
            >
              Add
            </button>
            <button className="btn btn-primary" onClick={() => setModal(false)}>
              Cancel
            </button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
};
export default HomePage;
