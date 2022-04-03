import React, { Component } from 'react'

import { connect } from 'react-redux';

class FormDangKy extends Component {

    state = {
        values: {
            maSV: '',
            hoTen: '',
            sdt: "",
            email: "",
        },
        errors: {
            maSV: "",
            hoTen: "",
            matKhau: "",
            sdt: "",
            email: "",
        }
    }
    handleInput = (event) => {
        let { value, name } = event.target;
        let newValues = { ...this.props.sinhVien.values };
        newValues[name] = value;
        let newError = { ...this.props.sinhVien.errors };
        let message = "";
        if (value.trim() === "") {
            message = name + " không được để trống";
        }
        let attrValue = event.target.getAttribute("data-type");
        let reg = "";
        if (attrValue === "email") {
            reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!reg.test(value)) {
                message = name + " không đúng định dạng";
            }
        }
        newError[name] = message;
        let action = {
            type: 'HANDLE_INPUT',
            sinhVien: {
                values: newValues,
                errors: newError
            }
        }
        this.props.dispatch(action);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);

        let isValid = true;

        for (let key in this.props.sinhVien.errors) {
            if (this.state.errors[key] !== "") {
                isValid = false;
                break;
            }
        }
        if (!isValid) {
            alert("Còn lỗi nè");
            return;
        }
        let action = {
            type: "THEM_SINH_VIEN",
            sinhVien: this.props.sinhVien.values
        }
        this.props.dispatch(action);
    }

    render() {
        let { maSV, hoTen, sdt, email } = this.props.sinhVien.errors;
        let { values } = this.props.sinhVien;
        return (
            <div className="card mt-5">
                <form onSubmit={this.handleSubmit} >
                    <div className="card-header bg-dark text-white">
                        Thông Tin Sinh Viên
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Mã SV</label>
                                <input onChange={this.handleInput} type="text" name="maSV" className="form-control" value={values.maSV} />
                                <p className='text-danger'>{maSV}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Họ Tên</label>
                                <input onChange={this.handleInput} type="text" name="hoTen" className="form-control" value={values.hoTen} />
                                <p className='text-danger'>{hoTen}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Số điện thoại</label>
                                <input onChange={this.handleInput} type="text" name="sdt" className="form-control" value={values.sdt} />
                                <p className='text-danger'>{sdt}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input data-type="email" onChange={this.handleInput} type="email" name="email" className="form-control" value={values.email} />
                                <p className='text-danger'>{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-dark">
                        <button className='btn btn-success'>Thêm Sinh Viên</button>
                        <button className='btn btn-primary' type='button' onClick={() => {
                            let action = {
                                type: 'CAP_NHAP',
                                capNhapSV: this.props.sinhVien.values,
                            }
                            this.props.dispatch(action)
                        }}>Cập Nhật</button>
                    </div>
                </form>
            </div >

        )
    }
}
const mapStateToProps = (rootReducer) => {
    return {
        sinhVien: rootReducer.QLSVReducer.sinhVien
    }
}

export default connect(mapStateToProps)(FormDangKy);