document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("attendanceTableBody");

  // Khởi tạo dữ liệu từ Local Storage nếu có
  const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};

  // Dữ liệu mẫu với tên có dấu
  const sampleData = [
    "Trung Anh 👪",
    "Thanh Phong 🌪️",
    "Mai Lợi 🥇",
    "Thanh Hậu ♠️",
    "Minh Tú 🌠",
    "Tấn Lộc ☘️",
    "Đức Chung 👦",
    "Minh Hiếu ⚰️",
    "Hải Đăng 💡",
    "Thiện Nghĩa 👺",
    "Hoàng Phúc 💣",
    "Trung Hiếu 🔫",
    "Minh Thuận 🥟 ",
    "Đức Quy 🐢",
    "Hải Quân ",
    "Duy Nam",
    "Công Lý",
    "Thành Công ",
    "Minh Đức",
    "Xuân Trường",
    "Tấn Đạt",
  ];

  // Điền bảng với dữ liệu từ Local Storage hoặc mẫu
  sampleData.forEach((name) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td style="text-align:center;" onclick="updateTime('${name}', this)">${name}</td>
            <td style="text-align:center;" contenteditable="true" onclick="confirmTimeChange(this)"></td>
        `;

    // Nếu có dữ liệu đã lưu trữ, khôi phục giá trị thời gian
    if (storedData[name]) {
      row.querySelector("td:nth-child(2)").textContent = storedData[name];
    }

    tableBody.appendChild(row);
  });

  // Cập nhật thời gian mỗi giây
  setInterval(updateCurrentTime, 1000);
});

function updateTime(name, cell) {
  const currentTime = new Date().toLocaleTimeString("vi-VI", {
    hour: "2-digit",
    minute: "2-digit",
  });
  cell.nextElementSibling.textContent = currentTime;

  // Lưu trạng thái dữ liệu vào Local Storage
  saveDataToLocalStorage();
}

//=========

function confirmTimeChange(cell) {
  const initialTime = cell.textContent;

  cell.addEventListener(
    "blur",
    function () {
      const updatedTime = cell.textContent;

      if (updatedTime !== initialTime) {
        Swal.fire({
          title: "Bạn Có Chắc Muốn Lưu?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Lưu",
          denyButtonText: `Không Lưu`,
        }).then((result) => {
          if (result.isConfirmed) {
            saveDataToLocalStorage();
            Swal.fire({
              toast: true, // Kích hoạt kiểu toast
              position: "top-end", // Vị trí xuất hiện (top-end, top-start, bottom-end, bottom-start)
              icon: "success", // Icon cho thông báo (success, error, warning, info)
              title: "Đã Lưu!", // Tiêu đề thông báo
              showConfirmButton: false, // Ẩn nút "OK"
              timer: 1000, // Thời gian hiển thị (ms)
              timerProgressBar: true, // Thanh tiến trình hiển thị thời gian còn lại
            });
          } else if (result.isDenied) {
            cell.textContent = initialTime;
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "info", // Biểu tượng "info"
              title: "Không Lưu", // Tiêu đề thông báo
              showConfirmButton: false, // Ẩn nút "OK"
              timer: 1000, // Thời gian hiển thị (ms)
              timerProgressBar: true, // Hiển thị thanh tiến trình
            });
          }
        });
      }
    },
    { once: true }
  );
}

//===========

function clearAll() {
  Swal.fire({
    title: "CÓ CHẮC XÓA HẾT KO ?",
    text: "BẠN KO THỂ HOÀN TÁC SAU KHI XÓA!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "XÓA!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Clear table content
      const rows = document.querySelectorAll("#attendanceTableBody tr");
      rows.forEach((row) => {
        row.querySelector("td:nth-child(2)").textContent = "";
      });

      // Remove data from Local Storage
      localStorage.removeItem("attendanceData");

      Swal.fire({
        toast: true, // Hiển thị thông báo dạng toast
        position: "top-end", // Vị trí góc trên bên phải
        icon: "success", // Biểu tượng thông báo (success)
        title: "ĐÃ XÓA!", // Tiêu đề chính
        text: "Dữ Liệu Điểm Danh Đã Xóa", // Thông điệp phụ
        showConfirmButton: false, // Ẩn nút "OK"
        timer: 2000, // Thời gian hiển thị 3 giây
        timerProgressBar: true, // Hiển thị thanh tiến trình
      });
    }
  });
}

function updateCurrentTime() {
  const currentTime = new Date().toLocaleTimeString("vi-VI", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("currentTime").innerHTML = currentTime;
  if (
    currentTime.match("21:50:10") ||
    currentTime.match("22:25:00") ||
    currentTime.match("21:55:00")
  ) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "CHỤP HÌNH BÁO CÁO",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function saveDataToLocalStorage() {
  const dataToSave = {};
  const tableRows = document.querySelectorAll("#attendanceTableBody tr");

  tableRows.forEach((row) => {
    const name = row.querySelector("td:first-child").textContent;
    const time = row.querySelector("td:nth-child(2)").textContent;
    dataToSave[name] = time;
  });

  // Save the data to Local Storage
  localStorage.setItem("attendanceData", JSON.stringify(dataToSave));
}

function showTime() {
  document.getElementById("currentDate").innerHTML =
    new Date().toLocaleDateString();
}
showTime();
setInterval(function () {
  showTime();
}, 1000);

let sorted = false;

function showTimetable() {
  document.getElementById("overlay").style.display = "block";
}

function closeTimetable() {
  document.getElementById("overlay").style.display = "none";
}

//cheat
document.getElementById("currentDate").addEventListener("click", function () {
  const tableRows = document.querySelectorAll("#attendanceTableBody tr");

  // Lặp qua từng hàng trong bảng
  tableRows.forEach((row, index) => {
    // Kiểm tra nếu phần tử ở vị trí thứ 9 trở lên
    if (index >= 9) {
      const timeCell = row.querySelector("td:nth-child(2)");
      const timeText = timeCell.textContent;

      // Kiểm tra nếu thời gian vượt quá 21:50:00
      if (timeText > "21:50:00") {
        // Cập nhật thời gian thành 21:49:00
        timeCell.textContent = "21:49";
      }
    }
  });

  // Lưu lại dữ liệu mới vào Local Storage
  saveDataToLocalStorage();
});

// Function to capture the table and share it as an image`
function captureAndShare() {
  // Chọn phần tử bảng để chụp
  const table = document.querySelector(".item");

  // Sử dụng html2canvas để chụp màn hình
  html2canvas(table, {
    scale: 2, // Tăng độ phân giải của ảnh
    backgroundColor: "#ffffff", // Đặt nền trắng cho ảnh
  }).then((canvas) => {
    // Chuyển canvas thành blob để chia sẻ
    canvas.toBlob((blob) => {
      // Tạo tệp từ blob
      const file = new File([blob], "attendance-screenshot.png", {
        type: "image/png",
      });

      // Kiểm tra hỗ trợ Web Share API
      if (navigator.share && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            files: [file],
            title: "Bảng điểm danh",
            text: "Danh sách điểm danh được chụp từ ứng dụng.",
          })
          .then(() => {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Đã chia sẻ ảnh chụp màn hình!",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          })
          .catch((error) => {
            console.error("Lỗi khi chia sẻ:", error);
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "error",
              title: "Không thể chia sẻ. Vui lòng thử lại!",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          });
      } else {
        // Fallback: Tải ảnh về nếu Web Share API không được hỗ trợ
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "attendance-screenshot.png";
        link.click();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Web Share API không hỗ trợ. Ảnh đã được tải xuống!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    }, "image/png");
  });
}
