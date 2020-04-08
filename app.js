
function messagePopupToggle() {
    document.getElementById("messagePopup").classList.toggle("active")
}

document.getElementById("forgotPasswordSubmit").addEventListener("submit", async (event) => {
    try {
        event.preventDefault();


        const { email, aadhaarNumber, role } = event.target
        if (!email.value || !aadhaarNumber.value || !role.value) {
            document.getElementById("forgotPasswordError").innerText = "Error : Please Fill All The Fields";
            document.getElementById("forgotPasswordError").style.color = "red";
            return
        }
        document.getElementById("loader").style.display = "block";
        const forgotUser = {
            email: email.value,
            aadhaarNumber: aadhaarNumber.value,
            role: role.value
        }
        const response = await fetch("https://seasonal-jobs.herokuapp.com/api/user/forgotpassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(forgotUser)
        });
        const responseJson = await response.json()
        document.getElementById("loader").style.display = "none"
        if (responseJson.error) {
            document.getElementById("forgotPasswordError").innerText = `Error : ${responseJson.error}`
            document.getElementById("forgotPasswordError").style.color = `red`;
            return;
        }
        else {
            document.getElementById("forgotPasswordClose").click();
            document.getElementById('message').innerText = `${responseJson.message}`
            messagePopupToggle();
        }
    }
    catch (error) {
        document.getElementById("loader").style.display = "none"
        alert(error.message)
        console.log(error)
    }
})

document.getElementById("loginSubmit").addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        const { email, password, role } = event.target
        if (!email.value || !password.value || !role.value) {
            document.getElementById("loginError").innerText = "Error : Please Fill All The Fields";
            document.getElementById("loginError").style.color = "red";
            return
        }
        document.getElementById("loader").style.display = "block"
        const loginUser = {
            email: email.value,
            password: password.value,
            role: role.value
        }
        const response = await fetch("https://seasonal-jobs.herokuapp.com/api/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUser)
        });
        const responseJson = await response.json()
        document.getElementById("loader").style.display = "none"
        if (responseJson.error) {
            document.getElementById("loginError").innerText = `Error : ${responseJson.error}`
            document.getElementById("loginError").style.color = `red`;
            return;
        }
        document.getElementById("loginClose").click();
        localStorage.setItem("Authorization", responseJson.jwt)
        localStorage.setItem("user", JSON.stringify(responseJson.user))
        document.getElementById("navOne").style.display = "none";
        document.getElementById("mainContainer").innerHTML = "";
        if (responseJson.user.role == "Job-Seeker") {
            document.getElementById("navTwo").style.display = "block";
            if (responseJson.user.profilePicture) {
                document.getElementsByClassName("userPic")[0].setAttribute("src", `${responseJson.user.profilePicture}`)
            }
            document.getElementsByClassName("userName")[0].innerText = `Hi, ${responseJson.user.name}`;
            const card = document.createElement('div')
            card.innerHTML = `    
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-6 mt-5">
                <div class="card text-center">
                    <div class="card-header bg-info">
                        <strong>Seasonal-Jobs Welcomes You for Seeking a Part-Time Job</strong>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Please use above links to view all types of Jobs and search according to your interest and location.</p>
                    </div>
                </div>
            </div>
        </div>`
            document.getElementById("mainContainer").insertAdjacentElement("beforeend", card);
        }
        if (responseJson.user.role == "Job-Provider") {
            document.getElementById("navThree").style.display = "block";
            if (responseJson.user.profilePicture) {
                document.getElementsByClassName("userPic")[1].setAttribute("src", `${responseJson.user.profilePicture}`)
            }
            document.getElementsByClassName("userName")[1].innerText = `Hi, ${responseJson.user.name}`;
            const card = document.createElement('div')
            card.innerHTML = `    
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-6 mt-5">
                <div class="card text-center">
                    <div class="card-header bg-info">
                        <strong>Seasonal-Jobs Welcomes You for Providing a Part-Time Job</strong>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Please use above links to post jobs and delete or view posted jobs.</p>
                    </div>
                </div>
            </div>
        </div>`
            document.getElementById("mainContainer").insertAdjacentElement("beforeend", card)
            return;
        }
        if (responseJson.user.role == "Admin") {
            document.getElementById("navThree").style.display = "block";
            if (!responseJson.user.profilePicture) {
                document.getElementsByClassName("userPic")[2].setAttribute("src", `${responseJson.user.profilePicture}`)
            }
            document.getElementsByClassName("userName")[2].innerText = `Hi, ${responseJson.user.name}`;
            const card = document.createElement('div')
            card.innerHTML = `    
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-6 mt-5">
                <div class="card text-center ">
                    <div class="card-header bg-info">
                        <strong>Hi, Admin Welcome Back</strong>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Please use above links to control users and jobs</p>
                    </div>
                </div>
            </div>
        </div>`
            document.getElementById("mainContainer").insertAdjacentElement("beforeend", card)
            return;
        }
    }
    catch (error) {
        document.getElementById("loader").style.display = "none"
        alert(error.message)
        console.log(error)
    }
})

document.getElementById("registerSubmit").addEventListener("submit", async (event) => {
    try {
        event.preventDefault();
        const { email, password, role, address, aadhaarNumber, contactNumber, gender, name } = event.target
        if (!email.value || !password.value || !role.value || !address.value || !aadhaarNumber.value || !gender.value || !name.value || !contactNumber.value) {
            document.getElementById("registerError").innerText = "Error : Please Fill All The Fields";
            document.getElementById("registerError").style.color = "red";
            return
        }
        document.getElementById("loader").style.display = "block"
        const registerUser = {
            email: email.value,
            password: password.value,
            role: role.value,
            address: address.value,
            aadhaarNumber: aadhaarNumber.value,
            contactNumber: contactNumber.value,
            gender: gender.value,
            name: name.value
        }

        const response = await fetch("https://seasonal-jobs.herokuapp.com/api/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerUser)
        });
        const responseJson = await response.json()
        document.getElementById("loader").style.display = "none"
        if (responseJson.error) {
            document.getElementById("registerError").innerText = `Error : ${responseJson.error}`
            document.getElementById("registerError").style.color = `red`;
            return;
        }

        document.getElementById("registerClose").click()
        document.getElementById("message").innerText = `${responseJson.message}`
        messagePopupToggle();
    }
    catch (error) {
        document.getElementById("loader").style.display = "none"
        alert(error.message)
        console.log(error)
    }
})

function jobsCards(responseJson) {
    document.getElementById("mainContainer1").innerHTML = ''
    document.getElementById("mainContainer").style.display = "block"
    document.getElementById("mainContainer").innerHTML = `<div id ="row" class='row justify-content-center mt-3 '></div>`
    responseJson.jobs.forEach(job => {
        document.getElementById("row").innerHTML += `<div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-4">
        <div class="card">
          <div class="card-header bg-info"><b>Title :${job.title}</b></div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Category :</b>${job.category}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Time Slot :</b>${job.timeSlot}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Duration :</b>${job.duration}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Preference :</b>${job.preference}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>City :</b>${job.city}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Pincode :</b>${job.pincode}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>PostedAt :</b>${job.updatedAt}</div>
            </div>
            <div class="text-right"> 
              <button type="button" class="btn btn-primary mt-3 " onclick="viewJob('${job._id}')">View Job</button>
          </div> 
          </div>
        </div>
      </div>`
    });
}

function allJobs(pageNumber) {
    document.getElementById("loader").style.display = "block"
    fetch(`https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/allavailablejobs/${pageNumber}/`)
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            jobsCards(responseJson)
            let pagination = document.createElement("div")
            document.getElementById('mainContainer').insertAdjacentElement("beforeend", pagination);
            pagination.innerHTML = `<nav class="mt-5 mr-1">
        <ul id="pagination" class="pagination justify-content-center">
        </ul>
      </nav>`
            for (let i = 0; i <= (responseJson.count / 10); i++) {
                document.getElementById('pagination').innerHTML += `<li class="page-item"><a onclick='allJobs("${i + 1}")' class="page-link" href="#">${i + 1}</a></li>`
            }
            document.getElementById("loader").style.display = "none"
        })
        .catch(error => {
            alert(error.message)
            console.log(error)
        })
}

function queryJobs(queryKey, queryValue, pageNumber) {
    document.getElementById("loader").style.display = "block"
    fetch(`https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/filter/${pageNumber}?${queryKey}=${queryValue}`)
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            jobsCards(responseJson)
            let pagination = document.createElement("div")
            document.getElementById('mainContainer').insertAdjacentElement("beforeend", pagination);
            pagination.innerHTML = `<nav class="mt-5 mr-1">
        <ul id="pagination" class="pagination justify-content-center">
        </ul>
      </nav>`
            for (let i = 0; i <= (responseJson.count / 10); i++) {
                document.getElementById('pagination').innerHTML += `<li class="page-item"><a onclick='queryJobs("${queryKey},${queryValue},${i + 1}")' class="page-link" href="#">${i + 1}</a></li>`
            }
        })
        .catch(error => {
            document.getElementById("loader").style.display = "none"
            alert(error.message)
            console.log(error)
        })
}

document.getElementById('city').addEventListener('submit', async (event) => {
    event.preventDefault();
    queryJobs("city", event.target.city.value, "1")
})

document.getElementById('pincode').addEventListener('submit', async (event) => {
    event.preventDefault();
    queryJobs("pincode", event.target.pincode.value, "1")
})

document.getElementById('keyword').addEventListener('submit', async (event) => {
    event.preventDefault();
    queryJobs("keyword", event.target.keyword.value, "1")
})

function viewJob(jobid) {
    document.getElementById("loader").style.display = "block"
    fetch(`https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/byjobid/${jobid}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${(localStorage.getItem('Authorization'))}`
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none";
            document.getElementById("mainContainer").style.display = "none"
            document.getElementById("mainContainer1").style.display = "block"
            document.getElementById("mainContainer1").innerHTML = `
            <div class="text-left">
            <button onclick="back()" type="button" class="btn btn-primary ml-5 mt-2" style="width:100px;border-top-left-radius: 0.8rem;border-bottom-left-radius: 0.8rem;">Back</button>
            </div>
        <div class="row justify-content-center mt-2 ">
      <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2">
        <div class="card">
          <div class="card-header bg-info"><b>Title :</b>Job-Details</div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Title :</b>${responseJson.job.title}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Category :</b>${responseJson.job.category}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Time Slot :</b>${responseJson.job.timeSlot}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Duration :</b>${responseJson.job.duration}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Rate of Payment(in Rs) :</b>${responseJson.job.rateOfPayment}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Preferred Skill :</b>${responseJson.job.preferedSkills}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Preference :</b>${responseJson.job.preference}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>City :</b>${responseJson.job.city}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Pincode :</b>${responseJson.job.pincode}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Address :</b>${responseJson.job.address}</div>
            </div>
            <div class="text-right"> 
              <button type="button" id="applyJob" class="btn mt-3" style="background-color:#5cb85c;color:white" onclick='applyJob("${responseJson.job._id}")'>Apply Job</button>
          </div> 
          </div>
        </div>
      </div>
      <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2 ">
        <div class="card">
          <div class="card-header bg-info"><b>Title :</b>Job-Provider-Details</div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Name :</b>${responseJson.job.jobProviderName}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Contact Number :</b>${responseJson.job.contactNumber}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Email :</b>${responseJson.job.jobProviderEmail}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Posted Job At :</b>${responseJson.job.updatedAt}</div>
            </div>
          </div>
        </div>
      </div>
  </div>`

        })
        .catch(error => {
            document.getElementById("loader").style.display = "none"
            alert(error.message)
            console.log(error)
        })
}

function applyJob(jobid) {
    document.getElementById("loader").style.display = "block"
    fetch(`https://seasonal-jobs.herokuapp.com/api/jobseeker/searchjobs/byjobid/${jobid}/isaccepted`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${(localStorage.getItem('Authorization'))}`
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return window.alert(`${responseJson.error}`)
            document.getElementById("applyJob").innerText = `Job Applied`
            document.getElementById("applyJob").style.backgroundColor = `red`
            document.getElementById("applyJob").style.color = `white`
            document.getElementById("message").innerText = `${responseJson.message}`
            messagePopupToggle()
        })
        .catch(error => {
            document.getElementById("loader").style.display = "none"
            alert(error.message)
            console.log(error)
        })
}

function logoutSubmit() {
    document.getElementById("loader").style.display = "block"
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role == "Job-Provider") var User = "jobprovider"
    if (user.role == "Job-Seeker") var User = "jobseeker"
    if (user.role == "Admin") var User = "admin"
    fetch(`https://seasonal-jobs.herokuapp.com/api/${User}/logout/`, {

        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return alert(`${responseJson.error}`)
            document.getElementById("message").innerText = `${responseJson.message}`
            messagePopupToggle()
            setTimeout(() => {
                location.reload()
            }, 3000)
        })

}

function back() {
    document.getElementById('mainContainer1').style.display = "none"
    document.getElementById('mainContainer').style.display = "block"
}

function profileEdit() {
    let user = JSON.parse(localStorage.getItem('user'))
    document.getElementById('mainContainer').style.display = "none"
    document.getElementById("mainContainer1").style.display = "block"
    document.getElementById("mainContainer1").innerHTML = `<div class="text-left">
    <button onclick="back()" type="button" class="btn btn-primary ml-5 mt-2"
      style="width:100px;border-top-left-radius: 0.8rem;border-bottom-left-radius: 0.8rem;">Back</button>
  </div>
  <div class="row justify-content-center mt-2 ">
    <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2">
      <div class="card">
        <div class="card-header bg-info"><b>Edit Your Profile</b></div>
        <div class="card-body">
          <form id="formUpdateProfile">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input id="updateProfileName" type="text" name="name" disabled value="${user.name}" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" disabled class="form-control" value="${user.email}" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Aadhaar Number</label>
              <input type="text" name="" disabled class="form-control" value="${user.aadhaarNumber}"
                id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Gender</label>
              <input type="text" name="" disabled class="form-control" value="${user.gender}" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Contact Number</label>
              <input type="text" id='updateProfileContactNumber' name="contactNumber" class="form-control" value="${user.contactNumber}"
                id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Address</label>
              <input type="text" name="address" id="updateProfileAddress" class="form-control" value="${user.address}" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
  
            <div class="form-group">
              <label for="exampleInputEmail1">Role</label>
              <input type="text" disabled class="form-control" id="updateProfileRole" value="${user.role}" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
        </div>
        <div class="text-center">
          <button id="updateProfile" type="button" id="applyJob" class="btn mt-2 mb-2 bg-success"
            style="background-color:green;color:white;" onclick="updateProfile()" >Update
            Profile</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  <div class="row justify-content-center mt-2 ">
    <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2">
      <div class="card">
        <div class="card-header bg-info"><b>Edit Your Password</b></div>
        <div class="card-body">
          <form id="formUpdatePassword">
            <div class="form-group">
              <label for="exampleInputEmail1">Password</label>
              <input id="updatePasswordd" type="password" name="password" class="form-control" value="" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
            <div  class="text-center">
              <button type="button"  class="btn mt-2 mb-2 bg-success"
                style="background-color:green;color:white;" onclick='updatePassword()'>Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center mt-2 ">
    <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2">
      <div class="card">
        <div class="card-header bg-info"><b>Upload Your Profile Picture</b></div>
        <div class="card-body">
          <form id="formUpdatePicture">
            <div class="form-group">
              <label for="exampleInputEmail1">Profile Picture</label>
              <input id="updatePicturee" type="file" name="profilePicture" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            </div>
            <div class="text-center">
              <button type="button" id="applyJob" class="btn mt-2 mb-2 bg-success"
                style="background-color:green;color:white;" onclick="updatePicture()">Update Picture</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`
}


function updateProfile() {
    document.getElementById("loader").style.display = "block"
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role == "Job-Provider") var User = "jobprovider"
    if (user.role == "Job-Seeker") var User = "jobseeker"

    var contactNumber = document.getElementById("updateProfileContactNumber").value
    var address = document.getElementById("updateProfileAddress").value

    if (contactNumber == null) contactNumber = user.contactNumber;
    if (address == null) addresss = user.address;
    const update = {
        contactNumber,
        address
    }

    document.getElementById("loader").style.display = "block"
    fetch(`https://seasonal-jobs.herokuapp.com/api/${User}/editprofile`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        },
        body: JSON.stringify(update)
    })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return alert(`${responseJson.error}`)
            document.getElementById("message").innerText = `${responseJson.message}`
            let user = responseJson.user
            messagePopupToggle();
        })
}


function updatePassword() {
    document.getElementById("loader").style.display = "block"
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role == "Job-Provider") var User = "jobprovider"
    if (user.role == "Job-Seeker") var User = "jobseeker"

    const update = {
        password: `${document.getElementById("updatePasswordd").value}`
    }

    document.getElementById("loader").style.display = "block"
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
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return alert(`${responseJson.error}`)
            document.getElementById("message").innerText = `${responseJson.message}`
            messagePopupToggle()
        })
}

function updatePicture() {
    document.getElementById("loader").style.display = "block"
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role == "Job-Provider") var User = "jobprovider"
    if (user.role == "Job-Seeker") var User = "jobseeker"

    const update = {
        password: `${document.getElementById("updatePassword").value}`
    }

    document.getElementById("loader").style.display = "block"
    fetch(`https://seasonal-jobs.herokuapp.com/api/${User}/uploadprofilepicture`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        },
        body: JSON.stringify(update)
    })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return alert(`${responseJson.error}`)
            document.getElementById("message").innerText = `${responseJson.message}`
            messagePopupToggle()
        })
}

function postJob() {
    document.getElementById('mainContainer').style.display = "none"
    document.getElementById("mainContainer1").style.display = "block"
    document.getElementById("mainContainer1").innerHTML = `<div class="text-left">
    <button onclick="back()" type="button" class="btn btn-primary ml-5 mt-2"
        style="width:100px;border-top-left-radius: 0.8rem;border-bottom-left-radius: 0.8rem;">Back</button>
</div>
<div class="row justify-content-center mt-2 ">
    <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2">
        <div class="card">
            <div class="card-header bg-info text-center"><b>Post Your Job</b></div>
            <div class="card-body">
            <div id="jobPostError"></div>
                <form id="formPostJob">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input id="jobTitle" type="text" name="title" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Category</label>
                            <select id="jobCategory" name="">
                                <option value="Hourly">Hourly</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Duration</label>
                        <input id="jobDuration" type="text" name="" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Description</label>
                        <input id="jobDescription" type="text" name="" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp">
                    </div>


                    <div class="form-group">
                        <label for="exampleInputEmail1">Preference</label>
                        <select id="jobPreference" name="">
                            <option value="Hourly">Male</option>
                            <option value="Daily">Female</option>
                            <option value="Weekly">Transgender</option>
                            <option value="Monthly">Any</option>
                        </select>
                    </div>



                    <div class="form-group">
                        <label for="exampleInputEmail1">Rate of Payment</label>
                        <input type="text" id='jobRateOfPayment' name="" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>


                    <div class="form-group">
                        <label for="exampleInputEmail1">Prefered Skills</label>
                        <input type="text" id='jobPreferedSkills' name="" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Time Slot</label>
                        <input type="text" id='jobTimeSlot' name="" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>


                    <div class="form-group">
                        <label for="exampleInputEmail1">Contact Number
                        </label>
                        <input type="text" name="address" id="jobContactNumber" class="form-control"
                           id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">City</label>
                        <input type="text" name="" id="jobCity" class="form-control"
                           id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Pincode</label>
                        <input type="text" name="" id="jobPincode" class="form-control"
                             id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>


                    <div class="form-group">
                        <label for="exampleInputEmail1">Address</label>
                        <input type="text" name="address" id="jobAddress" class="form-control"
                             id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Keyword</label>
                        <input type="text"  class="form-control" id="jobKeyword"
                            id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
            </div>
            <div class="text-center">
                <button id="" type="button" id="applyJob" class="btn mt-2 mb-2 bg-success text-white"
                     onclick="postJobSubmit()">Post Job</button>
            </div>
            </form>
        </div>
    </div>
</div>`
}



function postJobSubmit() {
    const title = document.getElementById("jobTitle").value
    const category = document.getElementById("jobCategoty").value
    const duration = document.getElementById("jobDuration").value
    const description = document.getElementById("jobDescription").value
    const rateOfPayment = document.getElementById("jobRateOfPayment").value
    const preferedSkills = document.getElementById("jobPreferedSkills").value
    const preference = document.getElementById("jobPreference").value
    const timeSlot = document.getElementById("jobTimeSlot").value
    const contactNumber = document.getElementById("jobContactNumber").value
    const city = document.getElementById("jobCity").value
    const pincode = document.getElementById("jobPincode").value
    const address = document.getElementById("jobAddress").value
    const keyword = document.getElementById("jobKeyword").value
    if (!title || category || !duration || !description || !rateOfPayment || !preferedSkills || !preference ||
        !timeSlot || !contactNumber || !city || !pincode || !address || !keyword) {
        document.getElementById("jobPostError").innerText = `Please Fill All The Inputs`;
        document.getElementById("jobPostError").style.color = "red";
        return
    }
    document.getElementById("loader").style.display = "block"
    const postJob = {
        title,
        category,
        duration,
        description,
        rateOfPayment,
        preferedSkills,
        preference,
        timeSlot,
        contactNumber,
        city,
        pincode,
        address,
        keyword
    }

    fetch(`https://seasonal-jobs.herokuapp.com/api/jobprovider/postingjob`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        },
        body: JSON.stringify(postJob)
    })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return alert(`${responseJson.error}`)
            document.getElementById("message").innerText = `${responseJson.message}`
            messagePopupToggle();
        })
}

function postedJobs(pageNumber) {
    document.getElementById("loader").style.display = "block";
    fetch(`https://seasonal-jobs.herokuapp.com/api/jobprovider/jobspostedtilldate/${pageNumber}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            const jobs = responseJson.jobs;
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return alert(`${responseJson.error}`)

            document.getElementById("loader").style.display = "none";
            document.getElementById("mainContainer1").style.display = "none"
            document.getElementById("mainContainer").style.display = "block"
            document.getElementById("mainContainer").innerHTML = `<div class="text-left">
            <button onclick="back()" type="button" class="btn btn-primary ml-5 mt-2" style="width:100px;border-top-left-radius: 0.8rem;border-bottom-left-radius: 0.8rem;">Back</button>
            </div><div id ="row" class='row justify-content-center mt-3 '></div>`
            jobs.forEach(job => {
                document.getElementById("row").innerHTML += `
      <div class="col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 mt-2">
        <div class="card">
          <div class="card-header bg-info"><b>Title :</b>${job.title}</div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Category :</b>${job.category}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Time Slot :</b>${job.timeSlot}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Duration :</b>${job.duration}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Rate of Payment(in Rs) :</b>${job.rateOfPayment}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Preferred Skill :</b>${job.preferedSkills}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Preference :</b>${job.preference}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>City :</b>${job.city}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Pincode :</b>${job.pincode}</div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"><b>Address :</b>${job.address}</div>
            </div>
            <div class="text-right"> 
            <button type="button" id="deleteJobb" class="btn mt-3 btn-danger"  onclick='deleteJob("${job._id}")'>Delete Job</button>
              <button type="button"  class="btn mt-3 btn-success" onclick='updateJob("${job._id}")'>Update Job</button>
          </div> 
          </div>
        </div>
      </div>`
            })
            let pagination = document.createElement("div")
            document.getElementById('mainContainer').insertAdjacentElement("beforeend", pagination);
            pagination.innerHTML = `<nav class="mt-5 mr-1">
        <ul id="pagination" class="pagination justify-content-center">
        </ul>
      </nav>`
            for (let i = 0; i <= (responseJson.count / 10); i++) {
                document.getElementById('pagination').innerHTML += `<li class="page-item"><a onclick='allJobs("${i + 1}")' class="page-link" href="#">${i + 1}</a></li>`
            }
            document.getElementById("loader").style.display = "none"
        })
}


function updateJobSubmit(jobid) {

    const title = document.getElementById("jobTitle").value
    const category = document.getElementById("jobCategoty").value
    const duration = document.getElementById("jobDuration").value
    const description = document.getElementById("jobDescription").value
    const rateOfPayment = document.getElementById("jobRateOfPayment").value
    const preferedSkills = document.getElementById("jobPreferedSkills").value
    const preference = document.getElementById("jobPreference").value
    const timeSlot = document.getElementById("jobTimeSlot").value
    const contactNumber = document.getElementById("jobContactNumber").value
    const city = document.getElementById("jobCity").value
    const pincode = document.getElementById("jobPincode").value
    const address = document.getElementById("jobAddress").value
    const keyword = document.getElementById("jobKeyword").value

    document.getElementById("loader").style.display = "block"
    const postJob = {
        title,
        category,
        duration,
        description,
        rateOfPayment,
        preferedSkills,
        preference,
        timeSlot,
        contactNumber,
        city,
        pincode,
        address,
        keyword
    }

    fetch(`https://seasonal-jobs.herokuapp.com/api/jobprovider/udpatingjob/${jobid}/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        },
        body: JSON.stringify(postJob)
    })
        .then(response => response.json())
        .then(responseJson => {
            document.getElementById("loader").style.display = "none"
            if (responseJson.error) return alert(`${responseJson.error}`)
            document.getElementById("message").innerText = `${responseJson.message}`
            messagePopupToggle();
        })

}

function deleteJob(jobid) {
    fetch(`https://seasonal-jobs.herokuapp.com/api/jobprovider/deletingjob/${jobid}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${(localStorage.getItem('Authorization'))}`
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.error) return alert(`${responseJson.error}`)
            document.getElementById("deleteJobb").innerText = `Job Deleted`
            document.getElementById("message").innerText = `${responseJson.message}`
            messagePopupToggle();
        })
}
