var dsnv = new DanhSachNhanVien();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

getLocalStorage();

function layDuLieuDauVao(isAdd) {
  var _taiKhoan = getEle("tknv").value;
  var _hoTen = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhau = getEle("password").value;
  var _ngayLam = getEle("datepicker").value;
  var _luongCB = getEle("luongCB").value;
  var _chucVu = getEle("chucVu").value;
  var _gioLam = getEle("gioLam").value;

  var isValid = true;

  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        _taiKhoan,
        "divTaiKhoanErr",
        "(*) Tài khoản không được rỗng."
      ) &&
      validation.kiemTraDoDaiKiTu(
        _taiKhoan,
        "divTaiKhoanErr",
        "(*) Độ dài kí tự từ 4 - 6",
        4,
        6
      ) &&
      validation.kiemTraTaiKhoanTrung(
        _taiKhoan,
        "divTaiKhoanErr",
        "(*) Tài khoản đã tồn tại!",
        dsnv.list
      );
  }

  isValid &=
    validation.kiemTraRong(
      _hoTen,
      "divHoTenErr",
      "(*) Họ tên không được rỗng."
    ) &&
    validation.kiemTraKiTuChuoi(
      _hoTen,
      "divHoTenErr",
      "(*) Họ tên phải là chữ."
    );

  isValid &=
    validation.kiemTraRong(
      _email,
      "divEmailErr",
      "(*) Email không được rỗng."
    ) &&
    validation.kiemTraKiTuDacBiet(
      _email,
      "divEmailErr",
      "(*) Email chưa đúng."
    );

  isValid &=
    validation.kiemTraRong(
      _matKhau,
      "divMatKhauErr",
      "(*) Mật Khẩu không được rỗng."
    ) &&
    validation.kiemTraMatKhau(
      _matKhau,
      "divMatKhauErr",
      "(*) Mật Khẩu phải có chữ in hoa, số và kí tự đặc biệt."
    ) &&
    validation.kiemTraDoDaiKiTu(
      _matKhau,
      "divMatKhauErr",
      "(*) Mật khẩu từ 6 - 10 kí tự",
      6,
      10
    );

  isValid &=
    validation.kiemTraRong(
      _ngayLam,
      "divNgayLamErr",
      "(*) Ngày làm không được rỗng."
    ) &&
    validation.kiemTraNgayThang(
      _ngayLam,
      "divNgayLamErr",
      "(*) Định dạng dd/mm/yyyy"
    );

  isValid &=
    validation.kiemTraRong(
      _luongCB,
      "divLuongCBErr",
      "(*) Lương cơ bản không được rỗng."
    ) &&
    validation.kiemTraSoDuong(
      _luongCB,
      "divLuongCBErr",
      "(*) Lương cơ bản chưa đúng."
    ) &&
    validation.kiemTraLuong(
      _luongCB,
      "divLuongCBErr",
      "(*) Lương cơ bản trong khoảng 1 000 000 - 20 000 000"
    );

  isValid &= validation.kiemTraChucVu(
    "chucVu",
    "divChucVuErr",
    "(*) Vui lòng chọn chức vụ"
  );

  isValid &=
    validation.kiemTraRong(
      _gioLam,
      "divGioLamErr",
      "(*) Giờ làm không được rỗng."
    ) &&
    validation.kiemTraSoDuong(
      _gioLam,
      "divGioLamErr",
      "(*) Giờ làm không đúng."
    ) &&
    validation.kiemTraGioLam(
      _gioLam,
      "divGioLamErr",
      "(*) Giờ làm trong khoảng từ 80 - 200 giờ/tháng."
    );

  if (isValid) {
    var nhanVien = new NhanVien(
      _taiKhoan,
      _hoTen,
      _email,
      _matKhau,
      _ngayLam,
      _luongCB,
      _chucVu,
      _gioLam
    );
    return nhanVien;
  }
  return null;
}

function taoBang(nv) {
  getEle("tableDanhSach").innerHTML = "";

  for (var i = 0; i < nv.length; i++) {
    var tagTR = document.createElement("tr");

    var tagTD_TaiKhoan = document.createElement("td");
    var tagTD_HoTen = document.createElement("td");
    var tagTD_Email = document.createElement("td");
    var tagTD_NgayLam = document.createElement("td");
    var tagTD_ChucVu = document.createElement("td");
    var tagTD_TongLuong = document.createElement("td");
    var tagTD_XepLoai = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");

    tagTD_TaiKhoan.innerHTML = nv[i].taiKhoan;
    tagTD_HoTen.innerHTML = nv[i].hoTen;
    tagTD_Email.innerHTML = nv[i].email;
    tagTD_NgayLam.innerHTML = nv[i].ngayLam;
    tagTD_ChucVu.innerHTML = nv[i].chucVu;
    tagTD_TongLuong.innerHTML = nv[i].tongLuong;
    tagTD_XepLoai.innerHTML = nv[i].xepLoai;
    tagTD_Button_Edit.innerHTML =
      '<button  data-toggle="modal" data-target="#myModal" class="btn btn-primary" onclick="suaNhanVien(\'' +
      nv[i].taiKhoan +
      "')\">Sửa</button>";
    tagTD_Button_Delete.innerHTML =
      '<button class="btn btn-danger" onclick="xoaNhanVien(\'' +
      nv[i].taiKhoan +
      "')\">Xóa</button>";

    tagTR.appendChild(tagTD_TaiKhoan);
    tagTR.appendChild(tagTD_HoTen);
    tagTR.appendChild(tagTD_Email);
    tagTR.appendChild(tagTD_NgayLam);
    tagTR.appendChild(tagTD_ChucVu);
    tagTR.appendChild(tagTD_TongLuong);
    tagTR.appendChild(tagTD_XepLoai);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);

    getEle("tableDanhSach").appendChild(tagTR);
  }
}

//Button thêm nhân viên
getEle("btnThem").addEventListener("click", function () {
  getEle("formNV").reset();
  getEle("tknv").disabled = false;
  getEle("btnThemNV").style.display = "block";
  getEle("btnCapNhat").style.display = "none";

  var divErr = document.getElementsByClassName("alert-danger");
  for (var i = 0; i < divErr.length; i++) {
    divErr[i].style.display = "none";
  }
});

//Thêm nhân viên
getEle("btnThemNV").addEventListener("click", function (event) {
  //Chặn trang web bị load lại trong form
  event.preventDefault();

  var nhanVien = layDuLieuDauVao(true);

  if (nhanVien) {
    nhanVien.tinhTongLuong();
    nhanVien.timXepLoai();
    dsnv.themNhanVien(nhanVien);
    taoBang(dsnv.list);
  }

  setLocalStorage();

  var divErr = document.getElementsByClassName("alert-danger");
  for (var i = 0; i < divErr.length; i++) {
    divErr[i].style.display = "block";
  }
});

//Xóa nhân viên
function xoaNhanVien(taiKhoan) {
  dsnv._xoaNhanVien(taiKhoan);
  taoBang(dsnv.list);
  setLocalStorage();
}

//Sửa nhân vien
function suaNhanVien(taiKhoan) {
  var nhanVien = dsnv.layThongTinNhanVien(taiKhoan);

  getEle("tknv").value = nhanVien.taiKhoan;
  getEle("tknv").disabled = true;

  getEle("name").value = nhanVien.hoTen;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.matKhau;
  getEle("datepicker").value = nhanVien.ngayLam;
  getEle("luongCB").value = nhanVien.luongCB;
  getEle("chucVu").value = nhanVien.chucVu;
  getEle("gioLam").value = nhanVien.gioLam;

  getEle("btnCapNhat").style.display = "block";
  getEle("btnThemNV").style.display = "none";

  var divErr = document.getElementsByClassName("alert-danger");
  for (var i = 0; i < divErr.length; i++) {
    divErr[i].style.display = "none";
  }
}

//Cập nhật nhân viên
getEle("btnCapNhat").addEventListener("click", function () {
  var nhanVien = layDuLieuDauVao(false);

  var divErr = document.getElementsByClassName("alert-danger");
  for (var i = 1; i < divErr.length; i++) {
    divErr[i].style.display = "block";
  }

  nhanVien.tinhTongLuong();
  nhanVien.timXepLoai();
  dsnv.capNhatNhanVien(nhanVien);
  taoBang(dsnv.list);
  setLocalStorage();
});

getEle("reset").addEventListener("click", function () {
  getEle("formNV").reset();
  var divErr = document.getElementsByClassName("alert-danger");
  for (var i = 0; i < divErr.length; i++) {
    divErr[i].style.display = "none";
  }
});

//Tìm kiếm nhân viên
getEle("searchName").addEventListener("keyup", function () {
  var keyWord = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNhanVien(keyWord);
  taoBang(mangTimKiem);
});

function setLocalStorage() {
  //chuyển kiểu JSON sang kiểu string (JSON.stringify)
  var arrString = JSON.stringify(dsnv.list);
  localStorage.setItem("DSNV", arrString);
}
function getLocalStorage() {
  //chuyển kiểu string sang kiểu JSON (JSON.parse)
  if (localStorage.getItem("DSNV")) {
    var data = localStorage.getItem("DSNV");
    dsnv.list = JSON.parse(data);
    taoBang(dsnv.list);
  }
}
