// rafc
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { btFormActions } from '../store/BTForm/slice'

export const StudentForm = () => {
  const [formValue, setFormValue] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
  })

  const [formError, setFormError] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
  })

  const dispatch = useDispatch()
  const { studentList } = useSelector((state) => state.btForm)
  const { studentEdit } = useSelector((state) => state.btForm)

  const validate = (name, value) => {
    switch (name) {
      case 'id':
        const index = studentList.findIndex((product) => product.id === value)
        if (value.trim() === '' && !studentEdit) {
          return 'Vui lòng nhập thông tin'
        } else if (index !== -1 && !studentEdit) {
          return 'Mã SV đã tồn tại!'
        } else {
          return ''
        }

      case 'name':
        if (value.trim() === '') {
          return 'Vui lòng nhập thông tin'
        } else {
          return ''
        }

      case 'phone':
        if (value.trim() === '') {
          return 'Vui lòng nhập thông tin'
        } else if (!value.match(new RegExp('^[0-9]*$'))) {
          return 'Số điện thoại không hợp lệ'
        } else {
          return ''
        }

      case 'email':
        if (value.trim() === '') {
          return 'Vui lòng nhập thông tin'
        } else if (
          !value.match(
            new RegExp(
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            )
          )
        ) {
          return 'Email không hợp lệ'
        } else {
          return ''
        }

      default:
        return ''
    }
  }

  // currying function
  const handleFormValue = (name) => (ev) => {
    setFormError({ ...formError, [name]: validate(name, ev.target.value) })
    setFormValue({
      ...formValue,
      [name]: ev.target.value,
    })
  }

  useEffect(() => {
    if (studentEdit) {
      
      // set error về giá trị ban đầu
      setFormValue(studentEdit)
    }
  }, [studentEdit])
 
  return (
    <div>
      <form
        className="row"
        id="btForm"
        onSubmit={(ev) => {
          // ngăn sự kiện reload của browser
          ev.preventDefault()
          const validationError = {}
          Object.keys(formValue).forEach((name) => {
            // key : id | name | price | image | productType
            const error = validate(name, formValue[name]) // Vui lòng nhập thông tin || ""
            if (error && error.length > 0) {
              validationError[name] = error
            }
          })
          if (Object.keys(validationError).length > 0) {
            setFormError({ ...validationError })
            return
          }

          if (studentEdit) {
            // console.log('ev: ', ev)
            // dispatch action Edit
            dispatch(btFormActions.editStudent(formValue))
          } else {
            dispatch(btFormActions.addStudent(formValue))
          }

          setFormValue({
            id: '',
            name: '',
            phone: '',
            email: '',
          })
        }}
      >
        <h2 className="p-3 bg-dark text-warning">Danh Sách Sinh Viên</h2>
        <div className="col-6 fw-bold">
          <div>
            <p>Mã SV</p>
            <input
              id="id"
              type="text"
              className="form-control"
              // onChange={(event) => {
              //     // console.log('e: ', event.target.value)
              //     setFormValue({
              //         ...formValue,
              //         id: event.target.value,
              //     })
              // }}
              onChange={handleFormValue('id')}
              // onBlur={handleFormValue('id')}
              // value={studentEdit?.id}
              disabled={formValue.id === studentEdit?.id}
              value={formValue.id}
            />
            {formError.id && (
              <p>
                <small className="text-danger">{formError.id}</small>
              </p>
            )}
          </div>
          <div className="mt-3">
            <p>Họ Tên</p>
            <input
              type="text"
              className="form-control"
              // onChange={(ev) => {
              //     setFormValue({
              //         ...formValue,
              //         name: ev.target.value,
              //     })
              // }}
              onChange={handleFormValue('name')}
              // onBlur={handleFormValue('name')}
              // value={studentEdit?.name}
              value={formValue.name}
            />
            {formError.name && (
              <p>
                <small className="text-danger">{formError.name}</small>
              </p>
            )}
          </div>
        </div>
        <div className="col-6 fw-bold">
          <div className="">
            <p>Số Điện Thoại</p>
            <input
              type="text"
              className="form-control"
              onChange={handleFormValue('phone')}
              value={formValue.phone}
            />
            {formError.phone && (
              <p>
                <small className="text-danger">{formError.phone}</small>
              </p>
            )}
          </div>
          <div className="mt-3">
            <p>Email</p>
            <input
              type="text"
              className="form-control"
              onChange={handleFormValue('email')}
              value={formValue.email}
            />
            {formError.email && (
              <p>
                <small className="text-danger">{formError.email}</small>
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          {studentEdit ? (
            <button className="btn btn-info">Update</button>
          ) : (
            <button className="btn btn-success">Create</button>
          )}
        </div>
      </form>
      {/* <button form="btForm">Submit</button> */}
    </div>
  )
}
