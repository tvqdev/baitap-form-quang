import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDSSV from './TableDSSV'

export default class QLSV extends Component {
  render() {
    return (
      <div className='container'>
        <FormDangKy />
        <TableDSSV />
      </div>
    )
  }
}
