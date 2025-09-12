document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "admin@example.com" && password === "admin123") {
    alert("Login successful!");
    window.location.href = "admin-dashboard.html"; // Redirect to dashboard
  } else {
    alert("Invalid email or password.");
  }
});
