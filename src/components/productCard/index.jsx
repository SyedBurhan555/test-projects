/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import './index.css';
import { removeUser, updateUser } from '../../redux/slices/userSlice';
import { Card, CardBody, CardFooter, CardTitle, Modal } from 'reactstrap';
import { useState } from 'react';

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [Editmodal, setEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleDelete = () => {
    console.log('id-received-', deleteId);
    dispatch(removeUser(deleteId));
    setModal(false);
  };
  const DeleteConfirmation = (id) => {
    console.log('idd-', id);
    setDeleteId(id);
    setModal(true);
  };
  const EditModal = (data) => {
    console.log('edit', data);
    setEditModal(true);
    setSelectedData(data);
  };
  const handleEdit = () => {
    dispatch(
      updateUser({
        id: selectedData.id,
        newData: selectedData,
      })
    );
    setEditModal(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setSelectedData((prevAddUser) => ({
          ...prevAddUser,
          avatar: reader.result,
        }));
      }
    };
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="product-card">
      <img src={data.avatar} alt="product-image" />
      <span>{data.id}</span>
      <p>{data.first_name}</p>
      <p>{data.email}</p>
      <div className="product-buttons">
        <button onClick={() => EditModal(data)} className="edit-button">
          Edit
        </button>
        <button
          onClick={() => DeleteConfirmation(data.id)}
          className="delete-button"
        >
          delete
        </button>
      </div>
      <Modal size="md" isOpen={modal}>
        <div className="modal-header">
          <h2 className="modal-title mt-0" id="myModalLabel">
            Are You Sure
          </h2>
        </div>
        <div className="modal-body">
          <h6>
            Do You Really Want to delete this Customer?
            <b />
            This Process can not be undone
          </h6>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger waves-effect waves-light"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
          <button
            className="btn btn-primary waves-effect waves-light"
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal isOpen={Editmodal} toggle={() => setEditModal(!modal)}>
        <Card>
          <CardBody className="mt-2">
            <CardTitle>
              <h5>Edit Customer</h5>
            </CardTitle>
            <form>
              <input
                type="text"
                placeholder="Customer Name"
                value={selectedData.first_name}
                className="form-control"
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    first_name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={selectedData.email}
                placeholder="Email"
                className="form-control mt-2"
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    email: e.target.value,
                  })
                }
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control mt-2"
              />
              {selectedData && (
                <div>
                  <img
                    src={selectedData.avatar}
                    style={{ maxWidth: '30%', marginTop: '12px' }}
                  />
                </div>
              )}
            </form>
          </CardBody>
          <CardFooter>
            <button
              className="btn btn-danger me-2"
              onClick={() => handleEdit()}
            >
              Edit
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
};

export default ProductCard;
