function updatePassword() {
    document.getElementById("loader").style.display = "block";
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role == "Job-Provider")
        var User = "jobprovider";
    if (user.role == "Job-Seeker")
        var User = "jobseeker";
    const update = {
        password: `${document.getElementById("updatePassword").value}`
    };
    document.getElementById("loader").style.display = "block";
    fetch(`https://seasonal-jobs.herokuapp.com/api/${User}/editpassword`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        },
        body: JSON.stringify(update)
    })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none";
            if (responseJson.error)
                return alert(`${responseJson.error}`);
            document.getElementById("message").innerText = `${responseJson.message}`;
            messagePopupToggle();
        });
}
