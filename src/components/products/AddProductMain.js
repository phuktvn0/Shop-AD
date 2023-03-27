import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setColor([]);
      setSize([]);
      setCountInStock(0);
      setImage("");
      setPrice(0);
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const product1 = {
      name,
      price,
      description,
      color,
      size,
      image,
      countInStock,
    };
    dispatch(createProduct(product1));
  };
  const handlerColor = (e) => {
    const indexOfValue = color.indexOf(e.target.value);
    if (indexOfValue < 0) {
      setColor([...color, e.target.value]);
    } else {
      const array1 = color.slice(0, indexOfValue);
      const array2 = color.slice(indexOfValue + 1, color.length);
      setColor([...array1, ...array2]);
    }
  };
  const handlerSize = (e) => {
    const indexOfValue = color.indexOf(e.target.value);
    if (indexOfValue < 0) {
      setSize([...size, e.target.value]);
    } else {
      const array1 = size.slice(0, indexOfValue);
      const array2 = size.slice(indexOfValue + 1, size.length);
      setSize([...array1, ...array2]);
    }
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Quay lại sản phẩm
            </Link>
            <h2 className="content-title">Thêm sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm mới
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Giá
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Số lượng trong kho
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_color" className="form-label">
                      Màu sắc
                    </label>
                    <div className="form-check">
                      <input
                        className=" form-check-input"
                        type="checkbox"
                        value="Yellow"
                        id="product-cat"
                        name="color"
                        onChange={handlerColor}
                      />
                      <label className="form-check-label" htmlFor="product-cat">
                        Vàng
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Green"
                        id="product-cat-1"
                        name="color"
                        onChange={handlerColor}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-1"
                      >
                        Xanh lá
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Blue"
                        id="product-cat-2"
                        name="color"
                        onChange={handlerColor}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-2"
                      >
                        Xanh
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Black"
                        id="product-cat-3"
                        name="color"
                        onChange={handlerColor}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-2"
                      >
                        Đen
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="White"
                        id="product-cat-4"
                        name="color"
                        onChange={handlerColor}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-cat-2"
                      >
                        Trắng
                      </label>
                    </div>
                    <div className="mb-4">
                      <h5 className="mb-3 mt-4">Size</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="S"
                          id="product-cat-5"
                          name="size"
                          onChange={handlerSize}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat"
                        >
                          S
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="M"
                          id="product-cat-6"
                          name="size"
                          onChange={handlerSize}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-1"
                        >
                          M
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="XL"
                          id="product-cat-7"
                          name="size"
                          onChange={handlerSize}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-2"
                        >
                          XL
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="XLL"
                          id="product-cat-8"
                          name="size"
                          onChange={handlerSize}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-2"
                        >
                          XLL
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Freestyle"
                          id="product-cat-9"
                          name="size"
                          onChange={handlerSize}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-cat-2"
                        >
                          Freestyle
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Hình ảnh</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
