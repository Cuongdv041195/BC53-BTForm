// rafc
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'

export const ProductTable = () => {
  const { productList } = useSelector((state) => state.btForm)

  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className="mt-5">
      <h3 className="text-danger">Tìm Kiếm Sinh Viên</h3>
      <input
        type="text"
        className="form-control mb-3"
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.length &&
            productList
              .filter((product) => {
                if (searchValue === '') {
                  return product
                } else if (
                  product.name.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return product
                }
              })
              .map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{product.phone}</td>
                    <td style={{ width: 120 }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          confirm('Xác Nhận Xóa')
                            ? dispatch(btFormActions.deleteProduct(product.id))
                            : ''
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                      <button
                        className="btn btn-success ms-3"
                        onClick={() => {
                          dispatch(btFormActions.setProductEdit(product))
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}
