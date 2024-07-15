// // Add event listeners once the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', function() {

//     // Event listener for Profile Picture upload
//     document.getElementById('ProfilePicInput').addEventListener('change', function(event) {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function(e) {
//                 document.getElementById('profilePicture').src = e.target.result;
//             }
//             reader.readAsDataURL(file);
//         }
//     });

//     // Event listener for Fingerprint Picture upload
//     document.getElementById('FingerprintInput').addEventListener('change', function(event) {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function(e) {
//                 document.getElementById('fingerprintPicture').src = e.target.result;
//             }
//             reader.readAsDataURL(file);
//         }
//     });

//     // Event listener for form submission
//     document.getElementById('upload-form').addEventListener('submit', async function(event) {
//         event.preventDefault();

//         const formData = new FormData();
//         formData.append('ProfilePicture', document.getElementById('ProfilePicInput').files[0]);
//         formData.append('FingerprintPicture', document.getElementById('FingerprintInput').files[0]);
//         formData.append('Date', document.getElementById('Date').value);
//         formData.append('NIN', document.getElementById('NIN').value);
//         formData.append('FirstName', document.getElementById('FirstName').value);
//         formData.append('MiddleName', document.getElementById('MiddleName').value);
//         formData.append('LastName', document.getElementById('LastName').value);
//         formData.append('DSTEPRegNo', document.getElementById('DSTEPRegNo').value);
//         formData.append('DSTEPAdmittedCourse', document.getElementById('DSTEPAdmittedCourse').value);
//         formData.append('PersonalEmail', document.getElementById('PersonalEmail').value);
//         formData.append('OfficialEmail', document.getElementById('OfficialEmail').value);
//         formData.append('Gender', document.getElementById('Gender').value);
//         formData.append('PhoneNumber', document.getElementById('PhoneNumber').value);
//         formData.append('WhatsappNumber', document.getElementById('WhatsappNumber').value);
//         formData.append('DateOfBirth', document.getElementById('DateOfBirth').value);
//         formData.append('Age', document.getElementById('Age').value);
//         formData.append('PhysicalChallenge', document.getElementById('PhysicalChallenge').value);
//         formData.append('EmploymentStatus', document.getElementById('EmploymentStatus').value);
//         formData.append('StateOfResidence', document.getElementById('StateOfResidence').value);
//         formData.append('StateOfOrigin', document.getElementById('StateOfOrigin').value);
//         formData.append('HighestQualification', document.getElementById('HighestQualification').value);
//         formData.append('LastInstitutionAttended', document.getElementById('LastInstitutionAttended').value);
//         formData.append('TertiaryCourseOfStudy', document.getElementById('TertiaryCourseOfStudy').value);
//         formData.append('Occupation', document.getElementById('Occupation').value);

//         try {
//             const response = await fetch('https://dstepapi.onrender.com/submit-profile', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log('Success:', data);
//             // Optionally show a success message to the user or redirect

//         } catch (error) {
//             console.error('Error:', error);
//             // Optionally show an error message to the user
//         }
//     });

//     // Additional functions or event listeners can be added here

// });

// // You can add more functions or event listeners as needed




// //  end
document.getElementById('ProfilePicInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('ProfilePicture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('FingerprintInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('FingerprintPicture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('upload-form').addEventListener('submit', function (event) {
    event.preventDefault();

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

    // Set profile information
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

    // Show profile
    document.getElementById('profile').style.display = 'block';

    // Optionally hide the form after submission
    document.getElementById('upload-form').style.display = 'none';

    // Show PDF download button
    document.getElementById('download-btn').style.display = 'block';
});

// Save profile as PDF
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
