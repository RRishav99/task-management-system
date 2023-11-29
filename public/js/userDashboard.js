document.addEventListener('DOMContentLoaded', function () {
    // Fetch tasks when the page loads
    fetchdata();
    
    function fetchdata() {
        let uid = localStorage.getItem("username");
        console.log(uid);
        const url ="http://localhost:3000/admin/task/"+uid;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tasks = data.tasks;
                const tableBody = document.getElementById('taskTableBody');
                // if(data.notification=="1"){
                //     checkNotifications();
                
                
                
                tasks.forEach(task => {
                    if(task.notification=="1"){
                        let val1= task.Task_Title + "=> task is assigned to you ";
                        showNotification("Notification", val1 ,task._id);
                    }
                    const row = tableBody.insertRow();
                    row.insertCell(0).innerText = task.Task_Title;
                    row.insertCell(1).innerText = task.TASK_DESCRIPTION;
                    row.insertCell(2).innerText = task.PRIORITY_LEVEL;
                  //  row.insertCell(4).innerText = task.update;
                  // Create a dropdown for the "Status" field
          const statusCell = row.insertCell(3);
          const statusSelect = document.createElement('select');
          statusSelect.innerHTML = `
<option value="Incomplete">Incomplete</option>
<option value="On Progress">On Progress</option>
<option value="Completed">Completed</option>
          `;
          statusSelect.value = task.status;
         
          statusSelect.addEventListener('change', () => {
            updateStatus(task._id, statusSelect.value);
          });
          statusCell.appendChild(statusSelect);
          // row.insertCell(4).innerText = task.messages.map(msg => `${msg.user}: ${msg.message}`).join('\n');
          // row.insertCell(4).innerHTML = `<input type="text" id="messageInput_${task._id}" placeholder="Enter message">`;
          const container = document.createElement('div')
          const inputField = document.createElement('input')
          inputField.type = 'text';
          inputField.id = `messageInput_${task._id}`;
          inputField.placeholder = 'Enter message';
          // const messageInput = document.getElementById(`messageInput_${task._id}`);
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => {
            const message = inputField.value;
            if (message.trim() !== '') {
              // Send the message to the server (you need to implement this)
              sendMessageToServer(task._id, message);
            }
          });
          container.appendChild(inputField);
          container.appendChild(updateButton)
          row.insertCell(4).appendChild(container);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
 
    function updateStatus(taskId, newStatus) {
      // Send a request to update the status in the database
      fetch(`admin/tasks/update-status/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Status updated successfully:', data);
        })
        .catch(error => console.error('Error updating status:', error));
    }
           
      }

  function sendMessageToServer(taskId, message) {
    // Send a request to update the message in the database
    fetch(`admin/tasks/update-message/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: message }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent successfully:', data);
        // Optionally, you can perform additional actions after sending the message
      })
      .catch(error => console.error('Error sending message:', error));
  }
})




// setInterval(checkNotifications, 5000);
 
  function checkNotifications(taskId) {
          let newStatus=0;
          console.log("check",taskId);
          fetch(`admin/tasks/update/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notification:newStatus}),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Status updated successfully:', data);
          })
         .catch(error => console.error('Error fetching user details:', error));
  }

   
  // Function to show notification
  function showNotification(title, message,taskid) {
    const notificationPopup = document.getElementById('notificationPopup');
    const notificationTitle = document.getElementById('notificationTitle');
    const notificationMessage = document.getElementById('notificationMessage');
    // const acceptButton = document.getElementById("acceptButton");
    // const rejectButton = document.getElementById("rejectButton")

    const notificat = document.getElementById('OK');
    notificat.addEventListener('click', () => {
      checkNotifications(taskid);
      closeNotification();
    });
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
 
    // Display the notification popup
    notificationPopup.style.display = 'block';
  }
 
  function handleUserResponse(taskId, response) {
    fetch(`admin/tasks/update/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userResponse: response }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User response updated successfully:', data);
      })
      .catch(error => console.error('Error updating user response:', error));
  }


  // Function to close notification
  function closeNotification() {
    const notificationPopup = document.getElementById('notificationPopup');
    
    notificationPopup.style.display = 'none';
  }
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', logout);
 
  // Function to handle logout
  function logout() {
    
    window.location.href = 'index.html';
  }