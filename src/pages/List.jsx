import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';



const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token }
      });

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message );
    }
  };

  const removeProduct = async(_id)=>{
    try{
      const response = await axios.post(backendUrl + '/api/product/remove',{_id},{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        console.log(response.data.message);

        await fetchList()
      }else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(response.data.message );
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h4 className="mb-4">Product List</h4>
      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '80px' }}>Image</th>
              <th style={{ width: '150px' }}>Name</th>
              <th style={{ width: '120px' }}>Category</th>
              <th style={{ width: '80px' }}>Price</th>
              <th style={{ width: '150px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.image}
                    alt=""
                    style={{ maxWidth: '50px' }}
                  />
                </td>
                <td className="text-truncate" style={{ maxWidth: '150px' }}>
                  {item.name}
                </td>
                <td className="text-truncate" style={{ maxWidth: '120px' }}>
                  {item.category}
                </td>
                <td>Rs:{item.price}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={()=>removeProduct(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
