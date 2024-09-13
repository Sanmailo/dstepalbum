// import * as s from './script.js';




// const albumPage = document.getElementById('albumPage');
// const downloadAlbumBtn = document.getElementById('downloadAlbumBtn');
// const downloadIndividualBtn = document.getElementById('downloadIndividualBtn');
// const clearStorageBtn = document.getElementById('clearStorageBtn');

// let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

// // Load profiles from localStorage on page load
// window.addEventListener('load', () => {
//     if (profiles.length > 0) {
//         showAlbum();
//     }
// });

// registrationForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData(registrationForm);
//     const profilePicFile = formData.get('profilePic');

//     // Convert image file to Base64
//     const profilePicBase64 = await convertToBase64(profilePicFile);

//     const profile = {
//         nin: formData.get('nin'),
//         firstName: formData.get('firstName'),
//         middleName: formData.get('middleName'),
//         lastName: formData.get('lastName'),
//         profilePic: profilePicBase64,
//         regNumber: formData.get('regNumber'),
//         phoneNumber: formData.get('phoneNumber'),
//         age: formData.get('age'),
//         qualification: formData.get('qualification')
//     };

//     profiles.push(profile);
//     profiles.sort((a, b) => a.regNumber - b.regNumber);

//     // Save profiles to localStorage
//     localStorage.setItem('profiles', JSON.stringify(profiles));

//     showProfile(profile);
//     showAlbum();

//     registrationForm.reset();
// });

// function showProfile(profile) {
//     profilePage.innerHTML = `
//         <h2>${profile.firstName} ${profile.middleName} ${profile.lastName}</h2>
//         <img src="${profile.profilePic}" alt="Profile Picture">
//         <p>NIN: ${profile.nin}</p>
//         <p>Registration Number: ${profile.regNumber}</p>
//         <p>Phone Number: ${profile.phoneNumber}</p>
//         <p>Age: ${profile.age}</p>
//         <p>Qualification: ${profile.qualification}</p>
//     `;
// }

// function showAlbum() {
//     albumPage.innerHTML = '';
//     profiles.forEach((profile, index) => {
//         albumPage.innerHTML += `
//             <div class="profile-card">
//                 <h2>${profile.firstName} ${profile.middleName} ${profile.lastName}</h2>
//                 <img src="${profile.profilePic}" alt="Profile Picture">
//                 <p>NIN: ${profile.nin}</p>
//                 <p>Registration Number: ${profile.regNumber}</p>
//                 <p>Phone Number: ${profile.phoneNumber}</p>
//                 <p>Age: ${profile.age}</p>
//                 <p>Qualification: ${profile.qualification}</p>
//                 <button onclick="deleteProfile(${index})">Delete</button>
//             </div>
//         `;
//     });
// }

// // Convert image file to Base64 string
// function convertToBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

// // Download Album as Single Image
// downloadAlbumBtn.addEventListener('click', async () => {
//     const albumElement = document.querySelector('.album-page');
//     const canvas = await html2canvas(albumElement);
//     const imgData = canvas.toDataURL('image/png');

//     const element = document.createElement('a');
//     element.href = imgData;
//     element.download = 'album.png';
//     document.body.appendChild(element);
//     element.click();
// });

// // Download Individual Profile Images
// downloadIndividualBtn.addEventListener('click', async () => {
//     const zip = new JSZip();
//     const albumElements = document.querySelectorAll('.profile-card');

//     for (let i = 0; i < albumElements.length; i++) {
//         const canvas = await html2canvas(albumElements[i]);
//         const imgData = canvas.toDataURL('image/png');
//         zip.file(`profile-${i + 1}.png`, imgData.split(',')[1], { base64: true });
//     }

//     zip.generateAsync({ type: 'blob' }).then(content => {
//         const element = document.createElement('a');
//         element.href = URL.createObjectURL(content);
//         element.download = 'individual-profiles.zip';
//         document.body.appendChild(element);
//         element.click();
//     });
// });

// // Delete a specific profile by index
// function deleteProfile(index) {
//     profiles.splice(index, 1);
//     localStorage.setItem('profiles', JSON.stringify(profiles));
//     showAlbum();
// }

// // Clear entire localStorage
// clearStorageBtn.addEventListener('click', () => {
//     if (confirm('Are you sure you want to clear all profiles?')) {
//         localStorage.removeItem('profiles');
//         profiles = [];
//         albumPage.innerHTML = '';
//         profilePage.innerHTML = '';
//         alert('All profiles have been cleared.');
//     }
// });
