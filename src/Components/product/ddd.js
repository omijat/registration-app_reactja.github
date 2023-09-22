import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import './SearchBar.css';
export default function List() {

  const [products, setProducts] = useState([]); // products datta
  const [filterData, setFilterData] = useState([]); // filter data 
  const [currentPage, setCurrentPage] = useState(0); // page change 
  
  const handlePageChange = ({ selected }) => {  // pagination  
    setCurrentPage(selected);
  };
  
  const itemsPerPage = 4;  // listing limit 
  const startIndex = currentPage * itemsPerPage;    // <td> data listing
  const endIndex = startIndex + itemsPerPage;    // <td> data listing
  const currentProducts = products.slice(startIndex, endIndex); // <td> data listing 
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {   // fetch product and filter data 
    try {
      const response = await axios.get(`http://localhost:8000/api/product`);
      const data = response.data; 
      console.log(data);  
      setProducts(data);  
      setFilterData(data);  
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };  
  
  const handleFilter =(value) => {      // filter data valees
    const res = filterData.filter(f => f.title.includes(value))
    setProducts(res);
  }

  const deleteProduct = async (id) => {   // delete  product data 
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

    await axios.delete(`http://localhost:8000/api/product/${id}`).then(({ data }) => {
      Swal.fire({
        icon: 'success',
        text: data.message
      });
      fetchProducts();
    }).catch(({ response: { data } }) => {
      Swal.fire({
        text: data.message,
        icon: 'error'
      });
    });
  };



// Export PDF Function 





  return (
    <div className="container" style={{ width: '800px' }}>
      <div className="row">
        <div className="col-12">
          <Link className="btn btn-primary mb-2 float-end" to={"/product/create"}>
            Create Product
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <div>
              </div>
                 
              <div class="form-group searchs">
                <span className='listname'>
                  <h3>Product List</h3>
                </span>
              </div> 
                <div>
                  <a href="http://localhost:8000/exportPDF" className="btn btn-primary mb-2 float-start btnss"> 
                   PDF
                  </a>
                </div>
              <a href="http://localhost:8000/ProductExcel"  className="btn btn-primary mb-2 float-start btnss" >
                     EXCEL 
              </a>

              <a href="http://localhost:8000/ProductText" className="btn btn-primary mb-2 float-start btnss" >
                     TEXT 
              </a>
                <div class="form-group searchs">
                  <input type="text" className="textbox" onChange={e => handleFilter(e.target.value)} 
                  placeholder="Search here..."/>
                </div> 
                <br/> 
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Sr.No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 && (
                    currentProducts.map((row, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{row.title}</td>
                        <td>{row.description}</td>
                        <td>
                          <img width="50px" src={`http://127.0.0.1:8000/storage/product/image/${row.image}`} alt={row.title} />
                        </td>
                        <td>
                          <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                            Edit  
                          </Link>
                          <Button variant="danger" onClick={() => deleteProduct(row.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12">
          {/* Pagination component */}
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            // pageCount={10}
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
  );
}