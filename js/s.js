// profile pic function 
let profileImg = document.getElementById('ProfilePicInput')

profileImg.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('ProfilePicture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// fingerprintImage function 
let fingerImg = document.getElementById('FingerprintInput')
fingerImg.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('FingerprintPicture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// upload api and foirm function  
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('upload-form');
    const formData = new FormData(form);

    try {
        const response = await fetch('https://dstepapi.onrender.com/Submit-profile', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert('Upload successful:', result);
        } else {
            alert('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }


    // Get form data
    const profileImage = document.getElementById('ProfilePicture').src;
    const fingerprintImage = document.getElementById('FingerprintPicture').src;
    const date = document.getElementById('Date').value;

    const nin = document.getElementById('NIN').value;
    const firstname = document.getElementById('FirstName').value;
    const middlename = document.getElementById('MiddleName').value;
    const lastname = document.getElementById('LastName').value;
    const dstepRegNo = document.getElementById('DSTEPRegNo').value;
    const admittedCourse = document.getElementById('DSTEPAdmittedCourse').value;
    const personalEmail = document.getElementById('PersonalEmail').value;
    const officialEmail = document.getElementById('OfficialEmail').value;
    const gender = document.getElementById('Gender').value;
    const phone = document.getElementById('PhoneNumber').value;
    const whatsapp = document.getElementById('WhatsappNumber').value;
    const dob = document.getElementById('DateofBirth').value;
    const age = document.getElementById('Age').value;
    const physicalChallenge = document.getElementById('PhysicalChallenge').value;
    const employmentStatus = document.getElementById('EmploymentStatus').value;
    const stateOfResidence = document.getElementById('StateOfResidence').value;
    const stateOfOrigin = document.getElementById('StateOfOrigin').value;
    const highestQualification = document.getElementById('HighestQualification').value;
    const institutionAttended = document.getElementById('LastInstitutionAttended').value;
    const courseOfStudy = document.getElementById('TertiaryCourseOfStudy').value;
    const occupation = document.getElementById('Occupation').value;

    // profile declared
    document.getElementById('profile-picture').src = profileImage;
    document.getElementById('profile-fingerprint').src = fingerprintImage;
    document.getElementById('profile-date').textContent = `Date: ${date}`;

    document.getElementById('profile-nin').textContent = `NIN: ${nin}`;
    document.getElementById('profile-firstname').textContent = `First Name: ${firstname}`;
    document.getElementById('profile-middlename').textContent = `Middle Name: ${middlename}`;
    document.getElementById('profile-lastname').textContent = `Last Name: ${lastname}`;
    document.getElementById('profile-dstepRegNo').textContent = `DSTEP Reg. No.: ${dstepRegNo}`;
    document.getElementById('profile-admittedCourse').textContent = `DSTEP Admitted Course: ${admittedCourse}`;
    document.getElementById('profile-personalEmail').textContent = `Personal Email: ${personalEmail}`;
    document.getElementById('profile-officialEmail').textContent = `Official Email: ${officialEmail}`;
    document.getElementById('profile-gender').textContent = `Gender: ${gender}`;
    document.getElementById('profile-phone').textContent = `Phone Number: ${phone}`;
    document.getElementById('profile-whatsapp').textContent = `Whatsapp Number: ${whatsapp}`;
    document.getElementById('profile-dob').textContent = `Date of Birth: ${dob}`;
    document.getElementById('profile-age').textContent = `Age: ${age}`;
    document.getElementById('profile-physicalChallenge').textContent = `Physical Challenge: ${physicalChallenge}`;
    document.getElementById('profile-employmentStatus').textContent = `Employment Status: ${employmentStatus}`;
    document.getElementById('profile-stateOfResidence').textContent = `State of Residence: ${stateOfResidence}`;
    document.getElementById('profile-stateOfOrigin').textContent = `State of Origin: ${stateOfOrigin}`;
    document.getElementById('profile-highestQualification').textContent = `Qualification: ${highestQualification}`;
    document.getElementById('profile-institutionAttended').textContent = `Institution: ${institutionAttended}`;
    document.getElementById('profile-courseOfStudy').textContent = `Course: ${courseOfStudy}`;
    document.getElementById('profile-occupation').textContent = `Occupation: ${occupation}`;

    // creating data in json
    const Profile = {
        profileImage: profileImage,
        fingerprintImage: fingerprintImage,
        date: date,
        nin: nin,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        dstepRegNo: dstepRegNo,
        admittedCourse: admittedCourse,
        personalEmail: personalEmail,
        officialEmail: officialEmail,
        gender: gender,
        phone: phone,
        whatsapp: whatsapp,
        dob: dob,
        age: age,
        physicalChallenge: physicalChallenge,
        employmentStatus: employmentStatus,
        stateOfResidence: stateOfResidence,
        stateOfOrigin: stateOfOrigin,
        highestQualification: highestQualification,
        institutionAttended: institutionAttended,
        courseOfStudy: courseOfStudy,
        occupation: occupation
    };



    // Show profile
    document.getElementById('profile').style.display = 'block';

    // Optionally hide the form after submission
    document.getElementById('upload-form').style.display = 'none';

    // Show PDF download button
    document.getElementById('download-btn').style.display = 'block';
});
document.getElementById('download-btn').addEventListener('click', function () {
    const element = document.getElementById('profile');
    html2pdf().from(element).save('profile.pdf');
});

// Reg no. js script
document.addEventListener('DOMContentLoaded', function () {
    var inputField = document.getElementById('DSTEPRegNo');
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
