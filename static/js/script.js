document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('myForm');
    const responseMessage = document.getElementById('response-message');
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Create a FormData object to handle form data and file uploads
        const formData = new FormData(form);

        try {
            // Send the form data using Axios
            const response = await axios.post('/users/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // This is important for file uploads
                }
            });


            if (response.status === 201) {

                // show profile
                document.getElementById('profile').style.display = 'block';

                // hide myform
                document.getElementById('myForm').style.display = 'none';
                document.getElementById('hide').style.display = 'none';

                // Show PDF download button
                document.getElementById('downloadjpg-btn').style.display = 'block';

                responseMessage.innerHTML = 'succeful'
                // Redirect to profile.html on success
                // window.location.href = '/templates/profile.html';
            } else {
                alert('Failed to create user: ' + response.data.message);
            }

        } catch (error) {
            // Display error message
            responseMessage.textContent = `Error: ${error.response ? error.response.data.message : error.message}`;
            responseMessage.style.color = 'red';
        }

    });
});


const form = document.querySelector('#myForm')
form.addEventListener('submit', function (e) {
    e.preventDefault()

    // Get form data
    const profileImage = document.getElementById('profilePicture').src;
    const ninImage = document.getElementById('ninImage').src;
    const fingerprintImage = document.getElementById('fingerprintPicture').src;

    const nin = document.getElementById('nin').value;
    const firstname = document.getElementById('firstName').value;
    const middlename = document.getElementById('middleName').value;
    const lastname = document.getElementById('lastName').value;
    const dstepRegNo = document.getElementById('dstepRegNo').value;
    const admittedCourse = document.getElementById('admittedCourse').value;
    const personalEmail = document.getElementById('personalEmail').value;
    const officialEmail = document.getElementById('officialEmail').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phoneNumber').value;
    const whatsapp = document.getElementById('whatsappNo').value;
    const dob = document.getElementById('dateOfBirth').value;
    const age = document.getElementById('age').value;
    const physicalChallenge = document.getElementById('physicalChallenge').value;
    const employmentStatus = document.getElementById('employmentStatus').value;
    const stateOfResidence = document.getElementById('stateOfResidence').value;
    const stateOfOrigin = document.getElementById('stateOfOrigin').value;
    const highestQualification = document.getElementById('highestQualification').value;
    const institutionAttended = document.getElementById('tertiaryCourseOfStudy').value;
    const courseOfStudy = document.getElementById('tertiaryCourseOfStudy').value;
    const occupation = document.getElementById('occupation').value;

    // profile declared
    document.getElementById('profile_picture').src = profileImage;
    document.getElementById('profile_nin').src = ninImage;
    document.getElementById('profile_fingerprint').src = fingerprintImage;

    document.getElementById('ninNumber').innerHTML = `NIN: ${nin}`;
    document.getElementById('profile_firstname').innerHTML = `First Name: ${firstname}`;
    document.getElementById('profile_middlename').innerHTML = `Middle Name: ${middlename}`;
    document.getElementById('profile_lastname').innerHTML = `Last Name: ${lastname}`;
    document.getElementById('profile_dstepRegNo').innerHTML = `DSTEP Reg. No.: ${dstepRegNo}`;
    document.getElementById('profile_admittedCourse').innerHTML = `DSTEP Admitted Course: ${admittedCourse}`;
    document.getElementById('profile_personalEmail').innerHTML = `Personal Email: ${personalEmail}`;
    document.getElementById('profile_officialEmail').innerHTML = `Official Email: ${officialEmail}`;
    document.getElementById('profile_gender').innerHTML = `Gender: ${gender}`;
    document.getElementById('profile_phone').innerHTML = `Phone Number: ${phone}`;
    document.getElementById('profile_whatsapp').innerHTML = `Whatsapp Number: ${whatsapp}`;
    document.getElementById('profile_dob').innerHTML = `Date of Birth: ${dob}`;
    document.getElementById('profile_age').innerHTML = `Age: ${age}`;
    document.getElementById('profile_physicalChallenge').innerHTML = `Physical Challenge: ${physicalChallenge}`;
    document.getElementById('profile_employmentStatus').innerHTML = `Employment Status: ${employmentStatus}`;
    document.getElementById('profile_stateOfResidence').innerHTML = `State of Residence: ${stateOfResidence}`;
    document.getElementById('profile_stateOfOrigin').innerHTML = `State of Origin: ${stateOfOrigin}`;
    document.getElementById('profile_highestQualification').innerHTML = `Qualification: ${highestQualification}`;
    document.getElementById('profile_institutionAttended').innerHTML = `Institution: ${institutionAttended}`;
    document.getElementById('profile_courseOfStudy').innerHTML = `Course: ${courseOfStudy}`;
    document.getElementById('profile_occupation').innerHTML = `Occupation: ${occupation}`;
})


// download btn func
document.getElementById('downloadjpg-btn').addEventListener('click', () => {
    const element = document.getElementById('profile');

    html2canvas(element).then(canvas => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/jpeg');

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'profile.jpg'; // Set the default filename

        // Append the link to the body and trigger a click to start the download
        document.body.appendChild(link);
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
    });
});



// Reg no. js script
document.addEventListener('DOMContentLoaded', function () {
    var inputField = document.getElementById('dstepRegNo');
    var prefix = 'IDEAS/IGF/NPCU/92/B/OYO-NHC/';

    inputField.addEventListener('input', function (event) {
        var inputValue = event.target.value;

        if (inputValue.startsWith(prefix)) {
            // Remove the prefix from the value
            var suffix = inputValue.substring(prefix.length);

            // Remove any non-numeric characters
            var cleanedSuffix = suffix.replace(/\D/g, '');

            // Limit the suffix to 4 digits
            var finalSuffix = cleanedSuffix.substring(0, 4);

            // Update the input value with the prefix and cleaned suffix
            event.target.value = prefix + finalSuffix;
        } else {
            // If the input doesn't start with the prefix, reset the value to just the prefix
            event.target.value = prefix;
        }
    });
});



// read and display img
function setupImagePreview(inputId, imageId) {
    let inputElement = document.getElementById(inputId);
    let imageElement = document.getElementById(imageId);

    inputElement.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageElement.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
}

// Set up image previews
setupImagePreview('profilePicInput', 'profilePicture');
setupImagePreview('ninInput', 'ninImage');
setupImagePreview('fingerprintInput', 'fingerprintPicture');
