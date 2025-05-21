document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registrationForm = document.getElementById("registrationForm");
  const loginSection = document.getElementById("auth");
  const registrationSection = document.getElementById("registration");
  const statusTrackingSection = document.getElementById("statusTracking");
  const statusMessage = document.getElementById("statusMessage");
  const backToRegistrationBtn = document.getElementById("backToRegistration");
  const registeredCompaniesDiv = document.getElementById("registeredCompanies");

  const registeredCompanies = [];

  // Handle Login
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "suba" && password === "suba@06") {
      loginSection.style.display = "none";
      registrationSection.style.display = "block";
    } else {
      alert("Invalid credentials! Please try again.");
    }
  });

  // Handle Registration Form Submission
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const companyName = document.getElementById("companyName").value;
    const email = document.getElementById("email").value;
    const industry = document.getElementById("industry").value;
    const documentFile = document.getElementById("document").files[0];

    if (!documentFile || !["application/pdf", "image/jpeg", "image/png"].includes(documentFile.type)) {
      alert("Invalid file type. Please upload a PDF, JPG, or PNG.");
      return;
    }

    const fileUrl = URL.createObjectURL(documentFile);

    // Add company to array
    registeredCompanies.push({
      companyName,
      email,
      industry,
      fileName: documentFile.name,
      fileUrl: fileUrl
    });

    displayRegisteredCompanies();

    alert("Registration submitted successfully!");
    registrationForm.reset();
  });

  function displayRegisteredCompanies() {
    registeredCompaniesDiv.innerHTML = "";

    if (registeredCompanies.length === 0) {
      registeredCompaniesDiv.innerHTML = "<p>No companies registered yet.</p>";
    } else {
      registeredCompanies.forEach((company) => {
        const card = document.createElement("div");
        card.className = "company-card";
        card.innerHTML = `
          <h4>${company.companyName}</h4>
          <p><strong>Email:</strong> ${company.email}</p>
          <p><strong>Industry:</strong> ${company.industry}</p>
          <a href="${company.fileUrl}" download="${company.fileName}" target="_blank">Download Document</a>
        `;
        registeredCompaniesDiv.appendChild(card);
      });
    }
  }

  // Handle "Back to Registration" button click
  backToRegistrationBtn.addEventListener("click", function () {
    statusTrackingSection.style.display = "none";
    registrationSection.style.display = "block";
  });
});
