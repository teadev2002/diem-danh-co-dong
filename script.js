document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("attendanceTableBody");

    // Khởi tạo dữ liệu từ Local Storage nếu có
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};

    // Dữ liệu mẫu với tên có dấu
    const sampleData = [
        "Trung Anh", "Thế  Anh", "Thanh Phong", "Hữu Tú",
        "Mai Thắng", "Mai Lợi", "Thanh Hậu", "Minh Tú",
        "Hải Đăng", "Tấn Lộc", "Đức Chung", "Thiện Nghĩa", "Minh Hiếu",
        "Quốc Thái", "Hoàng Phúc", "Trung Hiếu", "Nhật Hoàng", "Thiên Bảo", "Minh Thuận","Đức Quy"
    ];

    // Điền bảng với dữ liệu từ Local Storage hoặc mẫu
    sampleData.forEach(name => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align:center; padding: 2.5px 0px !important;" onclick="updateTime('${name}', this)">${name}</td>
            <td style="text-align:center;" contenteditable="true" onclick="confirmTimeChange(this)"></td>
        `;

        // Nếu có dữ liệu đã lưu trữ, khôi phục giá trị thời gian
        if (storedData[name]) {
            row.querySelector('td:nth-child(2)').textContent = storedData[name];
        }

        tableBody.appendChild(row);
    });

    // Cập nhật thời gian mỗi giây
    setInterval(updateCurrentTime, 1000);
});

function updateTime(name, cell) {
    const currentTime = new Date().toLocaleTimeString('vi-VI', { hour: '2-digit', minute: '2-digit' });
    cell.nextElementSibling.textContent = currentTime;

    // Lưu trạng thái dữ liệu vào Local Storage
    saveDataToLocalStorage();
}

//=========


function confirmTimeChange(cell) {
    const initialTime = cell.textContent;

    cell.addEventListener('blur', function () {
        const updatedTime = cell.textContent;

        if (updatedTime !== initialTime) {
            Swal.fire({
                title: "Bạn Có Chắc Muốn Lưu?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Lưu",
                denyButtonText: `Không Lưu`
            }).then((result) => {
                if (result.isConfirmed) {
                    saveDataToLocalStorage();
                    Swal.fire("Đã Lưu!", "", "success");
                } else if (result.isDenied) {
                    cell.textContent = initialTime;
                    Swal.fire("Không Lưu", "", "info");
                }
            });
        }
    }, { once: true });
}

//===========

function clearAll() {
    Swal.fire({
        title: "CÓ CHẮC XÓA KO ?",
        text: "BẠN KO THỂ HOÀN TÁC SAU KHI XÓA!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "XÓA!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear table content
            const rows = document.querySelectorAll('#attendanceTableBody tr');
            rows.forEach(row => {
                row.querySelector('td:nth-child(2)').textContent = "";
            });

            // Remove data from Local Storage
            localStorage.removeItem("attendanceData");

            Swal.fire("ĐÃ XÓA!", "Dữ Liệu Điểm Danh Đã Xóa", "success");
        }
    });
}

function updateCurrentTime() {
    const currentTime = new Date().toLocaleTimeString('vi-VI', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('currentTime').innerHTML = currentTime;
    if (currentTime.match('21:50:00') || currentTime.match('22:25:00') || currentTime.match('21:55:00')) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "CHỤP HÌNH BÁO CÁO",
            showConfirmButton: false,
            timer: 2000
        });
    }
}

function saveDataToLocalStorage() {
    const dataToSave = {};
    const tableRows = document.querySelectorAll('#attendanceTableBody tr');

    tableRows.forEach(row => {
        const name = row.querySelector('td:first-child').textContent;
        const time = row.querySelector('td:nth-child(2)').textContent;
        dataToSave[name] = time;
    });

    // Save the data to Local Storage
    localStorage.setItem("attendanceData", JSON.stringify(dataToSave));
}

function showTime() {
    document.getElementById('currentDate').innerHTML = new Date().toLocaleDateString();
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

// function opentx() {
//     window.location.href = "teamx.html";
// }


Swal.fire("Bấm vào tên người để điểm danh \n Lưu ý TRÁNH bấm nhầm ô tên 2 lần nha!!! \n Bấm nhầm thì vẫn sửa được \n Yên tâm mà xài");








 