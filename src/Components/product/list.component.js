import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';

export default function List() {
  const [products, setProducts] = useState([]); // products data
  const [filterData, setFilterData] = useState([]); // filter data 
  const [currentPage, setCurrentPage] = useState(0); // page change 

  const handlePageChange = ({ selected }) => {  // pagination  
    setCurrentPage(selected);
  };

  const handleFilter =(value) => {      // filter data values
    const res = filterData.filter(f => f.title.includes(value))
    setProducts(res);
  }

  const itemsPerPage = 4;  // listing limit 
  const startIndex = currentPage * itemsPerPage;    // <td> data listing
  const endIndex = startIndex + itemsPerPage;    // <td> data listing
  const currentProducts = products.slice(startIndex, endIndex); // <td> data listing 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products`);
      const data = response.data;
      setProducts(data.products);
      setFilterData(data.products);  // Initialize filterData with the same data as products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/api/products/${id}`);
      Swal.fire({
        icon: 'success',
        text: response.data.message
      });
      fetchProducts();
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'error'
      });
    }
  };

  // Filter products based on the search query
 

  return (
    <div className="container" style={{ width: '800px' }}>
      <div className="row">
        <div className="col-12">
          <Link className="btn btn-primary mb-2 float-end" to="/product/create">
            Create Product
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
          <div class="form-group searchs">
                <span className='listname'>
                  <h3>Product List</h3>
                </span>
              </div> <br />
            <div className="table-responsive">
            <div class="form-group searchs">
                  <input type="text" className="textbox" onChange={e => handleFilter(e.target.value)} 
                  placeholder="Search here..."/>
                </div>
                <br />
              <div className="d-flex justify-content-between mt-4">
                <a href="http://localhost:8000/ProductText" className="btn btn-primary" >Export CSV</a>
                <a href="http://localhost:8000/ProductExcel" className="btn btn-success" >Export Excel</a>
                <a href="http://localhost:8000/exportPDF" className="btn btn-danger" >Export PDF</a>
              </div>
              <br />
              {/* ... (export buttons) */}
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Sr.No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>status</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 &&
                    currentProducts.map((row, key) => (
                      <tr key={row.id}>
                        <td>{key + 1}</td>
                        <td>{row.title}</td>
                        <td>{row.description}</td>
                        <td>
                          {row.status === 1 ? (
                            <a href={`http://localhost:8000/Status/${row.id}`} className="btn btn-success">
                              ON
                            </a>
                          ) : (
                            <a href={`http://localhost:8000/Status/${row.id}`} className="btn btn-danger">
                              OFF
                            </a>
                          )}
                          {/* {row.status} */}
                        </td>
                        <td>
                          <img
                            width="50px"
                            src={`http://localhost:8000/storage/product/images/${row.image}`}
                            alt={row.title}
                          />
                        </td>
                        <td>
                          <Link to={`/product/edit/${row.id}`} className="btn btn-success me-2">
                            Edit
                          </Link>
                          <Button variant="danger" onClick={() => deleteProduct(row.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div><br />
            <div className="col-12">
          {/* Pagination component */}
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={Math.ceil(products.length / itemsPerPage)}
            pageRangeDisplayed={5} // Number of page links to display
            marginPagesDisplayed={3} // Number of page links to display on edges
            onPageChange={handlePageChange}
            containerClassName={'pagination '} //justify-content-center
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
          />
        </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}
