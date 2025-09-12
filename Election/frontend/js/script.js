
document.getElementById("voterRegisterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("fullName").value;
  const id = document.getElementById("voterId").value;
  const constituency = document.getElementById("constituency").value;

  alert(`Registered successfully!\nName: ${name}\nVoter ID: ${id}\nConstituency: ${constituency}`);
  // Here you would normally send data to backend/server
});



document.getElementById("voterLoginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const voterId = document.getElementById("voterId").value.trim();
  const password = document.getElementById("voterPassword").value;

  if (voterId === "" || password === "") {
    document.getElementById("voterLoginError").textContent = "Please fill all fields.";
    return;
  }

  // Simulated login credentials for demo
  if (voterId === "demo123" && password === "1234") {
    alert("Login successful!");
    window.location.href = "vote.html";
  } else {
    document.getElementById("voterLoginError").textContent = "Invalid Voter ID or Password.";
  }
});
