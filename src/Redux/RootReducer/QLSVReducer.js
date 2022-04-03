let qlsv = {
    mangSV: [],
    sinhVien: {
        values: {
            maSV: '',
            hoTen: '',
            sdt: "",
            email: "",
        },
        errors: {
            maSV: "",
            hoTen: "",
            sdt: "",
            email: "",
        }
    }
}
export const QLSVReducer = (state = qlsv, action) => {
    switch (action.type) {
        case "THEM_SINH_VIEN":
            state.mangSV = [...state.mangSV, action.sinhVien];

            return { ...state }
        case "XOA_SINH_VIEN":
            let mangSVXoa = [...state.mangSV];
            state.mangSV = mangSVXoa.filter((sv) => {
                return sv.maSV !== action.maSVXoa
            });
            return { ...state }
        case 'XEM_SINH_VIEN':
            state.sinhVien.values = action.xemSV
            state.sinhVien = { ...state.sinhVien }

            return { ...state }
        case 'HANDLE_INPUT':
            state.sinhVien = action.sinhVien
            state.sinhVien = { ...state.sinhVien }
            return { ...state }
        case 'CAP_NHAP':
            let mangCapNhap = [...state.mangSV]
            let sinhVienCapNhap = mangCapNhap.find((sv) => {
                return sv.maSV === action.capNhapSV.maSV;
            });

            if (sinhVienCapNhap) {
                sinhVienCapNhap.hoTen = action.capNhapSV.hoTen;
                sinhVienCapNhap.sdt = action.capNhapSV.sdt;
                sinhVienCapNhap.email = action.capNhapSV.email;
            }
            state.mangSV = mangCapNhap;
            return { ...state }


        default: return state;
    }
}
