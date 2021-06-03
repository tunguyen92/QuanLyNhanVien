function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;
  this.xepLoai = "";

  this.tinhTongLuong = function () {
    var index = getEle("chucVu").selectedIndex;

    if (index == 1) {
      this.tongLuong = parseFloat(this.luongCB) * 3;
    } else if (index == 2) {
      this.tongLuong = parseFloat(this.luongCB) * 2;
    } else if (index == 3) {
      this.tongLuong = parseFloat(this.luongCB);
    }
    return this.tongLuong;
  };

  this.timXepLoai = function () {
    if (parseFloat(this.gioLam) >= 192) return (this.xepLoai = "Xuất sắc");
    else if (parseFloat(this.gioLam) >= 176) return (this.xepLoai = "Giỏi");
    else if (parseFloat(this.gioLam) >= 160) return (this.xepLoai = "Khá");
    return (this.xepLoai = "Trung bình");
  };
}
