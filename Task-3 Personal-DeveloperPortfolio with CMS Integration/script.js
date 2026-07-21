// ===========================
// EmailJS Initialization
// ===========================


(function () {
    emailjs.init({
        publicKey: "Vo8P4STCD3Prgs2cX",
    });
})();

const projectContainer = document.getElementById("projectContainer");

fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
        displayProjects(projects);
    })
    .catch((error) => {
        console.log("Error Loading JSON:", error)
    });



function displayProjects(projects) {
    projectContainer.innerHTML = "";
    projects.forEach((project) => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
               <img src="${project.image}" alt="${project.title}">
               <div class="project-info">
               <h3>${project.title}</h3>
               <p>${project.description}</p>
               <div class="project-links">
               <a href="${project.github}" target="_blank">
               GitHub
               </a>
               <a href="${project.live}" target="_blank">
               Live Demo
               </a>
               </div>
               </div>
            `;
        projectContainer.appendChild(card);
    });
};



// ===========================
// Contact Form
// ===========================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const templateParams = {

        from_name: document.getElementById("name").value,

        from_email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value

    };

    emailjs.send(
        "service_mx8qrj7",
        "template_6ta8bcl",
        templateParams
    )

        .then(function () {

            alert("✅ Message Sent Successfully!");

            contactForm.reset();

        })

        .catch(function (error) {

            console.log("Status:", error.status);
            console.log("Text:", error.text);
            console.log(error);

            alert("Status: " + error.status + "\n" + error.text);

        });

});