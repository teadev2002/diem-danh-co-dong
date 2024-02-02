document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("attendanceTableBody");

    // Khởi tạo dữ liệu từ Local Storage nếu có
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
    
    // Dữ liệu mẫu với tên có dấu
    const sampleData = [
        "Trung Anh", "Thế  Anh", "Thanh Phong", "Hữu Tú", "Công Nam", "Minh Đăng",
        "Mai Thắng", "Mai Lợi", "Hữu Danh", "Thanh Hậu", "Phước Sang", "Minh Tú",
        "Quang Thiệu", "Hải Đăng", "Tấn Lộc", "Đức Chung", "Thiện Nghĩa", "Minh Hiếu", "Tuấn Khải",
         "Quốc Thái", "Hoàng Phúc", "Tài"
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

    // Save the data to Local Storage
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
let sorted = false;

function sortByTime() {
    const tableBody = document.getElementById("attendanceTableBody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    // Toggle sorting direction
    sorted = !sorted;

    // Sort the rows based on the time value in the second column
    rows.sort((rowA, rowB) => {
        const timeA = rowA.querySelector("td:nth-child(2)").textContent;
        const timeB = rowB.querySelector("td:nth-child(2)").textContent;

        if (!timeA && !timeB) {
            return 0;
        } else if (!timeA) {
            return 1;
        } else if (!timeB) {
            return -1;
        } else {
            // Convert time strings to Date objects for comparison
            const dateA = new Date(`2000-01-01 ${timeA}`);
            const dateB = new Date(`2000-01-01 ${timeB}`);
            return sorted ? dateA - dateB : dateB - dateA; // Sort in ascending or descending order
        }
    });

    // Remove existing rows from the table
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Append sorted rows to the table
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}
 
function showTimetable(){
    document.getElementById('overlay').style.display = 'block';
 
  }
  function closeTimetable(){
    document.getElementById('overlay').style.display = 'none';
  }
  function opentx(){
    document.getElementById('overlaytx').style.display = 'block';
 
  }
  function closetx(){
    document.getElementById('overlaytx').style.display = 'none';
  }

  function opennap(){
    document.getElementById('overlaynap').style.display = 'block';
 
  }
  function closenap(){
    document.getElementById('overlaynap').style.display = 'none';
  }
  function naptien() {
    // Get the entered value
    var enteredValue = document.getElementById("napvaovi").value;

    // Convert the entered value to a number
    var enteredAmount = parseFloat(enteredValue);

    // Check if the entered amount is non-negative
    if (enteredAmount >= 0) {
        // Get the current balance
        var currentBalance = parseFloat(document.getElementById("sodu").innerText);

        // Update the balance by adding the entered amount
        var newBalance = currentBalance + enteredAmount;

        // Update the balance display
        document.getElementById("sodu").innerText = newBalance;
    } else {
        // Show an error message or take other appropriate actions for negative input
        alert("KHÔNG THỂ NẠP TIỀN DƯỚI 0");
    }
    closenap();
}

function handleBet() {
    // Get user's choice
    var userChoice = document.querySelector('input[name="flexRadioDefault"]:checked');
    if (!userChoice) {
        alert("Vui lòng chọn Chẵn hoặc Lẻ.");
        return;
    }

    // Get user's bet amount
    var betAmount = parseFloat(document.getElementById("betmoney").value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Vui lòng nhập số tiền cược hợp lệ.");
        return;
    }

    // Get current balance
    var currentBalance = parseFloat(document.getElementById("sodu").innerText);

    // Check if the bet amount is less than or equal to the current balance
    if (betAmount > currentBalance) {
        alert("Số tiền cược không được lớn hơn số dư hiện tại.");
        return;
    }

    // Generate a random number between 1 and 9
    var randomNumber = Math.floor(Math.random() * 9) + 1;

    // Determine if the result is even or odd
    var isResultEven = randomNumber % 2 === 0;

    // Variable to track win/loss status
    var winStatus;

    // Check user's choice
    if ((userChoice.id === "even" && isResultEven) || (userChoice.id === "odd" && !isResultEven)) {
        // User wins
        winStatus = true;
        alert("Thắng! Số ngẫu nhiên: " + randomNumber);
    } else {
        // User loses
        winStatus = false;
        alert("Thua! Số ngẫu nhiên: " + randomNumber);
    }

    // Update the balance display based on win/loss status
    if (winStatus) {
        currentBalance += betAmount;
    } else {
        currentBalance -= betAmount;
    }

    document.getElementById("sodu").innerText = currentBalance;
}
