document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("attendanceTableBody");

    // Khởi tạo dữ liệu từ Local Storage nếu có
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
    
    // Dữ liệu mẫu với tên có dấu
    const sampleData = [
        "Trung Anh", "Thế  Anh", "Thanh Phong", "Hữu Tú", "Công Nam", "Minh Đăng",
        "Mai Thắng", "Mai Lợi", "Hữu Danh", "Thanh Hậu", "Phước Sang", "Minh Tú",
        "Quang Thiệu", "Hải Đăng", "Tấn Lộc", "Đức Chung", "Thiện Nghĩa", "Minh Hiếu", "Tuấn Khải",
         "Quốc Thái", "Hoàng Phúc"
    ];

    console.log(sampleData);
    // Điền bảng với dữ liệu từ Local Storage hoặc mẫu
    sampleData.forEach(name => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="text-align:center;">${name}</td>
            <td style="text-align:center;" contenteditable="true"> </td>
            <td ><input style="margin-left: 10%" class="form-check-input" type="checkbox" name="attendance" onclick="updateTime(this)" /></td>
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

// function updateTime(checkbox) {
//     const currentTime = new Date().toLocaleTimeString('vi-VI', { hour: '2-digit', minute: '2-digit' });
//     const row = checkbox.closest("tr").getElementsByTagName("td")[1];
//     row.textContent = currentTime;

//     // Lưu trạng thái dữ liệu vào Local Storage
//     saveDataToLocalStorage();
// }

function updateTime(checkbox) {
    const currentTime = new Date().toLocaleTimeString('vi-VI', { hour: '2-digit', minute: '2-digit' });
    const row = checkbox.closest("tr").getElementsByTagName("td")[1];

    // If the checkbox is checked, update the time; otherwise, delete the time value
    if (checkbox.checked) {
        row.textContent = currentTime;
    } else {
        row.textContent = "";
    }

    // Save the data to Local Storage
    saveDataToLocalStorage();
}


function clearAll() {
    if (confirm("Bạn có chắc chắn muốn xoá tất cả điểm danh không?")) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            const row = checkbox.closest("tr").getElementsByTagName("td")[1];
            row.textContent = "";
        });

        // Xóa dữ liệu từ Local Storage
        localStorage.removeItem("attendanceData");
    }
}

function updateCurrentTime() {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('currentTime').innerHTML = currentTime;
}

function saveDataToLocalStorage() {
    const dataToSave = {};
    const tableRows = document.querySelectorAll('#attendanceTableBody tr');

    tableRows.forEach(row => {
        const name = row.querySelector('td:first-child').textContent;
        const time = row.querySelector('td:nth-child(2)').textContent;
        dataToSave[name] = time;
    });

    // Lưu dữ liệu vào Local Storage
    localStorage.setItem("attendanceData", JSON.stringify(dataToSave));
}
function saveCheckboxState() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxState = {};

    checkboxes.forEach((checkbox, index) => {
        checkboxState[index] = checkbox.checked;
    });

    localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
}
function showTime() {
	document.getElementById('currentDate').innerHTML = new Date().toLocaleDateString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);