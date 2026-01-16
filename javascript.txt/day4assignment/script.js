const validUser = {
    username: "student",
    password: "1234"
};

const monthlyActivities = [
    {
        id: 1,
        activity: "Create project file which contains tables between 12 to 19",
        subject: "Maths"
    },
    {
        id: 2,
        activity: "Solve 10 algebra problems",
        subject: "Maths"
    },
    {
        id: 3,
        activity: "Prepare science experiment chart",
        subject: "Science"
    },
    {
        id: 4,
        activity: "Write essay on environment",
        subject: "English"
    }
];

function login() {
    const uname = document.getElementById("username").value;
    const pwd = document.getElementById("password").value;

    if (uname === validUser.username && pwd === validUser.password) {
        window.location.href = "welcome.html";
    } else {
        alert("Invalid Username or Password");
    }
}


function goToActivities() {
    window.location.href = "activities.html";
}


function showActivities() {
    const selectedSubject = document.getElementById("subjectSelect").value;
    const list = document.getElementById("activityList");

    list.innerHTML = "";

    const filteredActivities = monthlyActivities.filter(
        act => act.subject === selectedSubject
    );

    filteredActivities.forEach(act => {
        const li = document.createElement("li");
        li.textContent = act.activity;
        list.appendChild(li);
    });
}
