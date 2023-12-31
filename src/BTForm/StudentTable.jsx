// rafc
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'

export const StudentTable = () => {
  const { studentList } = useSelector((state) => state.btForm)

  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className="mt-5">
      <h3 className="text-danger">Tìm Kiếm Sinh Viên</h3>
      <input
        type="text"
        className="form-control mb-3 w-25"
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
          {studentList.length &&
            studentList
              .filter((student) => {
                if (searchValue === '') {
                  return student
                } else if (
                  student.name.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return student
                }
              })
              .map((student) => {
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td style={{ width: 120 }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          confirm('Xác Nhận Xóa')
                            ? dispatch(btFormActions.deleteStudent(student.id))
                            : ''
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                      <button
                        className="btn btn-success ms-3"
                        onClick={() => {
                          dispatch(btFormActions.setStudentEdit(student))
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
