// initialize visitor data on page load

async function initializeVisitor() {
  let visitorName = localStorage.getItem("visitorName");

  const newVisitorSection = document.getElementById("new-visitor-section");
  const returningVisitorSection = document.getElementById("returning-visitor-section");
  const returningVisitorMessage = document.getElementById("returning-visitor-message");
  const saveButton = document.getElementById("save-visitor-name");
  const input = document.getElementById("visitor-name-input");

  console.log("visitorName:", visitorName);

  if (!visitorName) {
    if (newVisitorSection) {
      newVisitorSection.style.display = "block";
    }

    if (saveButton && input) {
      saveButton.onclick = async () => {
        const enteredName = input.value.trim();
        if (!enteredName) return;

        localStorage.setItem("visitorName", enteredName);

        if (newVisitorSection) {
          newVisitorSection.style.display = "none";
        }

        if (returningVisitorSection && returningVisitorMessage) {
          returningVisitorMessage.textContent = `Welcome, ${enteredName}!`;
          returningVisitorSection.style.display = "block";
        }
      };
    }
    return;
  } 
    if (returningVisitorSection && returningVisitorMessage) {
        returningVisitorMessage.textContent = `Welcome back, ${visitorName}!`;
        returningVisitorSection.style.display = "block";
    }
}

function getVisitorName() {
  return localStorage.getItem("visitorName");
}

//run when page loads

document.addEventListener("DOMContentLoaded", () => {

  initializeVisitor();

  const resetButton = document.getElementById("reset-visitor");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      localStorage.removeItem("visitorName");
      location.reload();
    });
  }

});