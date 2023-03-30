import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = products
    .filter((product) => {
      if (searchTerm === "") {
        return true;
      } else if (
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tất cả</option>
                <option>Thời trang nam</option>
                <option>Thời trang nữ</option>
                <option>Thời trang trẻ em</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Mới nhất</option>
                <option>rẻ nhất</option>
                <option>Được đánh giá cao</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {currentItems.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Trước
                </Link>
              </li>
              {pageNumbers.map((pageNumber) => (
                <li
                  className={`page-item ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  key={pageNumber}
                >
                  <Link
                    className="page-link"
                    to="#"
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Link>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(products.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <Link
                  className="page-link"
                  to="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Tiếp
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
