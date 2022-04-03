import React, { Component } from 'react'

import { connect } from 'react-redux'

class TableDSSV extends Component {

  renderTable = () => {
    let { mangSV } = this.props;
    let count = 1;
    return mangSV.map((sv, index) => {
      return <tr key={sv.maSV}>
        <td>{count++}</td>
        <td>{sv.maSV}</td>
        <td>{sv.hoTen}</td>
        <td>{sv.sdt}</td>
        <td>{sv.email}</td>
        <td>
          <button className='btn btn-danger' onClick={() => {
            let action = {
              type: 'XOA_SINH_VIEN',
              maSVXoa: sv.maSV,
            }
            this.props.dispatch(action);
          }}> Xóa</button>
          <button className='btn btn-info' onClick={() => {
            let action = {
              type: 'XEM_SINH_VIEN',
              xemSV: sv,
            }
            this.props.dispatch(action);
          }}>Xem</button>
        </td>
      </tr>
    })
  }
  render() {
    return (
      <div className='card mt-5'>
        <div className="card-header bg-dark text-white">
          Danh sách Sinh Viên
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tài khoản</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Email</th>
                <th scope="col">SĐT</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.QLSVReducer.mangSV
  }
}
export default connect(mapStateToProps)(TableDSSV);
