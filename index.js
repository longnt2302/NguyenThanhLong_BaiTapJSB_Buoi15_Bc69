let switchCurrency = (value) => parseInt(value).toLocaleString("it-IT", { style: "currency", currency: "VND" });
// Bài 1
let result = (diemChuan, tongDiem) => (tongDiem >= diemChuan ? "success" : "fail");
// Regrex Number Integer
let regNum = /^\d*$/;
// Warning messeage
let warInterger = "Chỉ được nhập số";
let typeNum = document.querySelectorAll(".int");
typeNum.forEach((type) => {
  let _this = type;
  _this.oldValue = _this.value;
  _this.onkeyup = (event) => {
    if (regNum.test(_this.value) === true) {
      _this.classList.remove("input-error");
      _this.setCustomValidity("");
      _this.oldValue = _this.value;
      _this.oldSelectionStart = _this.selectionStart;
      _this.oldSelectionEnd = _this.selectionEnd;
    } else if (_this.hasOwnProperty("oldValue")) {
      _this.classList.add("input-error");
      _this.setCustomValidity(warInterger);
      _this.reportValidity();
      _this.value = _this.oldValue;
      _this.setSelectionRange(_this.oldSelectionStart, _this.oldSelectionEnd);
    } else {
      _this.value = "";
    }
  };
});
let validateInput = () => {
  let count = 0;
  if (document.getElementById("diemChuan").value == "") {
    count++;
    alert("NHẬP ĐIỂM CHUẨN");
  } else if (+document.getElementById("diemChuan").value > 30) {
    count++;
    alert("ĐIỂM CHUẨN KHÔNG ĐƯỢC VƯỢT QUÁ TỔNG ĐIỂM 3 MÔN");
  } else if (document.getElementById("mon1").value == "") {
    count++;
    alert("NHẬP ĐIỂM MÔN 1");
  } else if (+document.getElementById("mon1").value > 10) {
    count++;
    alert("ĐIỂM MÔN 1 KHÔNG VƯỢT QUÁ 10");
  } else if (document.getElementById("mon2").value == "") {
    count++;
    alert("NHẬP ĐIỂM MÔN 2");
  } else if (+document.getElementById("mon2").value > 10) {
    count++;
    alert("ĐIỂM MÔN 2 KHÔNG VƯỢT QUÁ 10");
  } else if (document.getElementById("mon3").value == "") {
    count++;
    alert("NHẬP ĐIỂM MÔN 3");
  } else if (+document.getElementById("mon3").value > 10) {
    count++;
    alert("ĐIỂM MÔN 3 KHÔNG VƯỢT QUÁ 10");
  }
  return count;
};
document.querySelector("#bt1 button").onclick = function () {
  let err = validateInput();
  if (err == 0) {
    let diemChuan = +document.getElementById("diemChuan").value;
    let mon1 = +document.getElementById("mon1").value;
    let mon2 = +document.getElementById("mon2").value;
    let mon3 = +document.getElementById("mon3").value;
    let pointArea = +document.querySelector("input[name=area]:checked").value;
    let pointObject = +document.querySelector("input[name=object]:checked").value;
    let tongDiem = 0;
    tongDiem += mon1 + mon2 + mon3 + pointArea + pointObject;
    let note, bg;
    let check = result(diemChuan, tongDiem);
    switch (check) {
      case "success":
        note = "SUCCESS";
        bg = "text-bg-success";
        break;
      case "fail":
        note = "FAILED";
        bg = "text-bg-danger";
        break;
    }
    let divResult = document.querySelector("#bt1 .result");
    divResult.className = "result p-2";
    divResult.classList.add(bg);
    divResult.innerHTML = note;
  }
};

// Bài 2
const unitPrice = {
  l1: 500,
  l2: 650,
  l3: 850,
  l4: 1100,
  end: 1300,
};
let handleBt2 = (quantity) => {
  let total = 0;
  if (quantity <= 50) {
    total += quantity * unitPrice["l1"];
  } else if (quantity > 50 && quantity <= 100) {
    total += 50 * unitPrice["l1"] + (quantity - 50) * unitPrice["l2"];
  } else if (quantity > 100 && quantity <= 200) {
    total += 50 * unitPrice["l1"] + 50 * unitPrice["l2"] + (quantity - 100) * unitPrice["l3"];
  } else if (quantity > 200 && quantity <= 350) {
    total += 50 * unitPrice["l1"] + 50 * unitPrice["l2"] + 100 * unitPrice["l3"] + (quantity - 200) * unitPrice["l4"];
  } else {
    total += 50 * unitPrice["l1"] + 50 * unitPrice["l2"] + 100 * unitPrice["l3"] + 150 * unitPrice["l4"] + (quantity - 350) * 1300;
  }
  return total;
};
document.querySelector("#bt2 button").onclick = function () {
  let countErr = 0;
  let ten = document.getElementById("ten");
  let soDien = document.getElementById("soDien");
  if (ten.value == "") {
    countErr++;
    alert("NHẬP TÊN");
  } else if (soDien.value == "") {
    countErr++;
    alert("NHẬP SỐ ĐIỆN");
  }
  if (countErr == 0) {
    let total = handleBt2(parseInt(soDien.value));
    document.querySelector("#bt2 .result").innerHTML = `<p>Tổng tiền phải trả của quý khách <span class="text-danger text-uppercase">${ten.value}</span> là: <span class="text-danger">${switchCurrency(total)}</span></span></p>`;
  }
};

// Bài 3
let taxPersonalIncome = (name, tongThuNhap, nguoiPhuThuoc = 0) => {
  let data = {};
  let taxPrice = 0;
  let luongCoBan = 4500000;
  let thue;
  let countErr = 0;
  let basicUnit = 1000000;
  if (name == "") {
    countErr++;
    alert("Nhập họ tên");
  } else if (tongThuNhap == "") {
    countErr++;
    alert("Nhập tổng thu nhập");
  } else if (tongThuNhap < 54000000) {
    countErr++;
    alert("Tổng thu nhập phải > 54.000.000VND ( Lương cơ bản : 4.500.000VND/tháng )");
  }
  let thuNhapChiuThue = tongThuNhap - 4000000 - nguoiPhuThuoc * 1600000;
  if (countErr == 0) {
    if (thuNhapChiuThue < 60 * basicUnit) {
      thue = 0;
    } else if (thuNhapChiuThue == 60 * basicUnit) {
      thue = 5 / 100;
    } else if (thuNhapChiuThue > 60 * basicUnit && thuNhapChiuThue <= 120 * basicUnit) {
      thue = 10 / 100;
    } else if (thuNhapChiuThue > 120 * basicUnit && thuNhapChiuThue <= 210 * basicUnit) {
      thue = 15 / 100;
    } else if (thuNhapChiuThue > 210 * basicUnit && thuNhapChiuThue <= 384 * basicUnit) {
      thue = 20 / 100;
    } else if (thuNhapChiuThue > 384 * basicUnit && thuNhapChiuThue <= 624 * basicUnit) {
      thue = 25 / 100;
    } else if (thuNhapChiuThue > 624 * basicUnit && thuNhapChiuThue <= 960 * basicUnit) {
      thue = 30 / 100;
    } else if (thuNhapChiuThue > 960 * basicUnit) {
      thue = 35 / 100;
    }
  }
  taxPrice += thuNhapChiuThue * thue;
  data.hoTen = name;
  data.total = tongThuNhap;
  data.dependentPerson = nguoiPhuThuoc;
  data.totalTax = thuNhapChiuThue;
  data.tax = `${thue}`;
  data.taxPrice = taxPrice;
  console.log(typeof data["tax"]);
  return data;
};
document.querySelector("#bt3 button").onclick = function () {
  let hoTen = document.getElementById("hoTen").value;
  let tongThuNhap = +document.getElementById("tongThuNhap").value;
  let nguoiPhuThuoc = +document.getElementById("nguoiPhuThuoc").value;
  let obj = taxPersonalIncome(hoTen, tongThuNhap, nguoiPhuThuoc);
  let tax = "0%";
  if (obj["tax"] !== "1") tax = `${obj["tax"] * 100}%`;
  document.querySelector("#bt3 .result").innerHTML = `<ul class="my-3">
  <li>Họ tên: <strong class="text-danger">${obj["hoTen"]}</strong></li>
  <li>Tổng thu nhập: <strong class="text-danger">${switchCurrency(obj["total"])}</strong></li>
  <li>Người phụ thuộc: <strong class="text-danger">${obj["dependentPerson"]}</strong></li>
  <li>Tổng thu nhập chịu thuế: <strong class="text-danger">${switchCurrency(obj["totalTax"])}</strong></li>
  <li>Thuế thu nhập cá nhân: <strong class="text-danger">${tax}</strong></li>
  <li>Tiền thuế thu nhập cá nhân: <strong class="text-danger">${switchCurrency(obj["taxPrice"])}</strong></li>
  </ul>`;
};

// Bài tập 4
// handle click
document.querySelectorAll("input[name=loaiKhachHang]").forEach((item) => {
  item.onchange = function () {
    switch (item.value) {
      case "doanhnghiep":
        document.getElementById("soKetNoi").removeAttribute("disabled");
        break;
      case "canhan":
        document.getElementById("soKetNoi").setAttribute("disabled", "disabled");
        document.getElementById("soKetNoi").value = 0;
        break;
    }
  };
});
let handleTotal = (loaiKH) => {
  let data = {};
  data.canhan = {};
  data.doanhnghiep = {};
  let soDauKetNoi = 0;
  let soDauKetNoiThemVao = 0;
  let tienKetNoi = 0;
  switch (loaiKH) {
    case "canhan":
      data.canhan.hoadon = 4.5;
      data.canhan.coban = 20.5;
      data.canhan.kenh = 7.5;
      break;
    case "doanhnghiep":
      soDauKetNoi = +document.getElementById("soKetNoi").value;
      if (soDauKetNoi > 10) {
        soDauKetNoiThemVao = soDauKetNoi - 10;
        tienKetNoi = soDauKetNoiThemVao * 5 + 75;
      } else {
        tienKetNoi = 75;
      }
      data.doanhnghiep.hoadon = 15;
      data.doanhnghiep.coban = tienKetNoi;
      data.doanhnghiep.kenh = 50;
      break;
  }
  return data[loaiKH];
};

document.querySelector("#bt4 button").onclick = function () {
  let currentDollar = 25000;
  let loaiKhachHang = document.querySelector("input[name='loaiKhachHang']:checked").value;
  let khachHang;
  switch (loaiKhachHang) {
    case "canhan":
      khachHang = "Cá Nhân";
      break;
    case "doanhnghiep":
      khachHang = "Doanh Nghiệp";
      break;
  }
  let soKetNoi = +document.getElementById("soKetNoi").value;
  let countErr = 0;
  if (document.getElementById("maKhachHang").value == "") {
    countErr++;
    alert("NHẬP MÃ KHÁCH HÀNG");
  } else if (document.getElementById("soKenhCaoCap").value == "") {
    countErr++;
    alert("NHẬP SỐ KÊNH ĐÃ THUÊ");
  } else if (loaiKhachHang == "doanhnghiep" && soKetNoi == 0) {
    countErr++;
    alert("NHẬP SỐ KẾT NỐI VÀ PHẢI > 0");
  }
  if (countErr == 0) {
    let obj = handleTotal(loaiKhachHang);
    let maKhachHang = document.getElementById("maKhachHang").value;
    let soKenhCaoCap = +document.getElementById("soKenhCaoCap").value;
    let note = "";
    if (loaiKhachHang == "doanhnghiep") {
      let soKetNoiThemVao = "";
      if (soKetNoi > 10) {
        soKetNoiThemVao = `. Thêm vào: ${soKetNoi - 10} kết nối.`;
      }
      note += `$75/10 đầu kết nối, $5/1 kết nối thêm vào. Tổng số kết nối: ${soKetNoi + soKetNoiThemVao}`;
    }
    document.querySelector("#bt4 .result").innerHTML = `<p class="text-warning my-2">Tính theo giá $ : 1$ = ${switchCurrency(currentDollar)}</p>
    <ul>
      <li>Mã Khách Hàng: <span class="text-primary">${maKhachHang}</span></li>
      <li>Loại Khách Hàng: <span class="text-primary">${khachHang}</span></li>
      <li>Phí Xử Lý Hoá Đơn: <span class="text-primary">$${obj.hoadon} => ${switchCurrency(obj.hoadon * currentDollar)}</span></li>
      <li>Phí Cơ Bản: <span class="text-primary">${note} Tổng phí => $${obj.coban} => ${switchCurrency(obj.coban * currentDollar)}</span></li>
      <li>Thuê Kênh Cao Cấp: <span class="text-primary">${soKenhCaoCap} kênh. Giá $${obj.kenh}/kênh => ${switchCurrency(obj.kenh * soKenhCaoCap * currentDollar)}</span></li>
    </ul>
    <p>
      <strong>Tổng: <span class="text-danger">$${obj.hoadon + obj.coban + obj.kenh * soKenhCaoCap} => ${switchCurrency((obj.hoadon + obj.coban + obj.kenh * soKenhCaoCap) * currentDollar)}</span></strong>
    </p>`;
    document.querySelector("#bt4 .result").style.display = "block";
  } else {
    document.querySelector("#bt4 .result").style.display = "none";
  }
};
