const loginForm = document.getElementById("loginForm");
const registrationForm = document.getElementById("registrationForm");
const registrationSection = document.getElementById("registration");

const credentials = {
  admin: "admin123",
  investor: "invest456"
};

const savedCompanies = JSON.parse(localStorage.getItem("registeredCompanies")) || [];

// LOGIN LOGIC
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (role === "admin" && password === credentials.admin) {
      localStorage.setItem("userRole", "admin");
      window.location.href = "admin.html";
    } else if (role === "investor" && password === credentials.investor) {
      localStorage.setItem("userRole", "investor");
      window.location.href = "investor.html";
    } else if (role === "startup") {
      alert("Please register as a startup first.");
      window.location.href = "indices.html";
    } else {
      alert("Invalid role or password.");
    }
  });
}

// STARTUP REGISTRATION LOGIC
if (registrationForm) {
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("companyName").value.trim();
    const email = document.getElementById("email").value.trim();
    const industry = document.getElementById("industry").value.trim();
    const file = document.getElementById("document").files[0];

    const exists = savedCompanies.some(company =>
      company.name.toLowerCase() === name.toLowerCase() ||
      company.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      alert("Company name or email already exists. Please use unique details.");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const documentURL = event.target.result;
        const newCompany = { name, email, industry, document: documentURL };

        savedCompanies.push(newCompany);
        localStorage.setItem("registeredCompanies", JSON.stringify(savedCompanies));

        localStorage.setItem("userRole", "startup");
        localStorage.setItem("chatWithStartup", name);

        alert("Registration successful!");
        window.location.href = "startup.html";
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a document.");
    }
  });
}
