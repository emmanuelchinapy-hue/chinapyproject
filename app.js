const institutions = [
  'Abia State University',
  'Abubakar Tafawa Balewa University',
  'Adamawa State University',
  'Adekunle Ajasin University',
  'Admiralty University of Nigeria',
  'African University of Science and Technology',
  'Ahmadu Bello University',
  'Ajayi Crowther University',
  'Akwa Ibom State University',
  'Alex Ekwueme Federal University, Ndufu-Alike',
  'Al-Hikmah University',
  'Ambrose Alli University',
  'American University of Nigeria',
  'Babcock University',
  'Bauchi State University',
  'Bayero University Kano',
  'Baze University',
  'Bells University of Technology',
  'Benue State University',
  'Bingham University',
  'Bowen University',
  'Caleb University',
  'Caritas University',
  'Chrisland University',
  'Covenant University',
  'Crawford University',
  'Cross River University of Technology',
  'Delta State University',
  'Ebonyi State University',
  'Edo State University Uzairue',
  'Ekiti State University',
  'Elizade University',
  'Enugu State University of Science and Technology',
  'Federal University of Agriculture, Abeokuta',
  'Federal University of Agriculture, Makurdi',
  'Federal University of Petroleum Resources, Effurun',
  'Federal University of Technology, Akure',
  'Federal University of Technology, Minna',
  'Federal University of Technology, Owerri',
  'Federal University, Birnin Kebbi',
  'Federal University, Dutse',
  'Federal University, Dutsin-Ma',
  'Federal University, Gashua',
  'Federal University, Gusau',
  'Federal University, Kashere',
  'Federal University, Lafia',
  'Federal University, Lokoja',
  'Federal University, Otuoke',
  'Federal University, Oye-Ekiti',
  'Federal University, Wukari',
  'Fountain University',
  'Godfrey Okoye University',
  'Gombe State University',
  'Gregory University',
  'Ibrahim Badamasi Babangida University',
  'Ignatius Ajuru University of Education',
  'Imo State University',
  'Joseph Ayo Babalola University',
  'Kaduna State University',
  'Kano University of Science and Technology',
  'Kebbi State University of Science and Technology',
  'Kings University',
  'Kogi State University',
  'Kwara State University',
  'Ladoke Akintola University of Technology',
  'Lagos State University',
  'Landmark University',
  'Lead City University',
  'Madonna University',
  'Michael Okpara University of Agriculture',
  'Nasarawa State University',
  'National Open University of Nigeria',
  'Niger Delta University',
  'Nigerian Defence Academy',
  'Nile University of Nigeria',
  'Nnamdi Azikiwe University',
  'Obafemi Awolowo University',
  'Obong University',
  'Olabisi Onabanjo University',
  'Ondo State University of Science and Technology',
  'Osun State University',
  'Pan-Atlantic University',
  'Paul University',
  'Plateau State University',
  'Redeemer’s University',
  'Renaissance University',
  'Rivers State University',
  'Sokoto State University',
  'Summit University',
  'Tai Solarin University of Education',
  'Taraba State University',
  'The Polytechnic, Ibadan',
  'Umaru Musa Yar’Adua University',
  'University of Abuja',
  'University of Benin',
  'University of Calabar',
  'University of Ibadan',
  'University of Ilorin',
  'University of Jos',
  'University of Lagos',
  'University of Maiduguri',
  'University of Medical Sciences, Ondo',
  'University of Nigeria, Nsukka',
  'University of Port Harcourt',
  'University of Uyo',
  'Usmanu Danfodiyo University',
  'Veritas University',
  'Wellspring University',
  'Wesley University',
  'Yobe State University',
  'Other (not listed)',
];

const form = document.querySelector('#scholarship-form');
const schoolInput = document.querySelector('#institution');
const schoolOptions = document.querySelector('#school-options');
const otherSchoolField = document.querySelector('#other-school-field');
const otherSchoolInput = document.querySelector('#other-school');
const startYear = document.querySelector('#start-year');
const endYear = document.querySelector('#end-year');
const schoolId = document.querySelector('#school-id');
const uploadFilename = document.querySelector('#upload-filename');
const confirmation = document.querySelector('#confirmation');
const studentName = document.querySelector('#student-name');
const matricNumber = document.querySelector('#matric-number');
const currentYear = new Date().getFullYear();

institutions.forEach((institution) => {
  const option = document.createElement('option');
  option.value = institution;
  schoolOptions.append(option);
});

function populateYears(select, lastYear) {
  for (let year = 2000; year <= lastYear; year += 1) {
    const option = document.createElement('option');
    option.value = String(year);
    option.textContent = String(year);
    select.append(option);
  }
}

populateYears(startYear, currentYear + 10);
populateYears(endYear, currentYear + 15);
document.querySelector('#current-year').textContent = String(currentYear);

function updateInstitutionField() {
  const isOther = schoolInput.value === 'Other (not listed)';
  otherSchoolField.classList.toggle('is-hidden', !isOther);
  otherSchoolInput.required = isOther;
  if (!isOther) otherSchoolInput.value = '';
  schoolInput.setCustomValidity('');
}

schoolInput.addEventListener('input', updateInstitutionField);
schoolInput.addEventListener('change', updateInstitutionField);

function validateInstitution() {
  const schoolName = schoolInput.value.trim();
  const isListed = institutions.some(
    (institution) => institution.toLocaleLowerCase() === schoolName.toLocaleLowerCase(),
  );
  schoolInput.setCustomValidity(
    isListed ? '' : 'Choose an institution from the suggestions, or select “Other (not listed)”.',
  );
}

function validateYears() {
  const hasBothYears = startYear.value && endYear.value;
  const endIsValid = !hasBothYears || Number(endYear.value) >= Number(startYear.value);
  endYear.setCustomValidity(endIsValid ? '' : 'Expected ending year must be the same year or later than the start year.');
}

schoolId.addEventListener('change', () => {
  const file = schoolId.files[0];
  uploadFilename.textContent = file ? file.name : 'PDF, JPG or PNG · up to 5 MB';
  const supportedType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file?.type)
    || /\.(pdf|jpe?g|png)$/i.test(file?.name ?? '');
  const isValid = !file || (supportedType && file.size <= 5 * 1024 * 1024);
  schoolId.setCustomValidity(
    isValid ? '' : 'Choose a PDF, JPG or PNG file no larger than 5 MB.',
  );
});

startYear.addEventListener('change', validateYears);
endYear.addEventListener('change', validateYears);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validateInstitution();
  validateYears();
  studentName.setCustomValidity(studentName.value.trim() ? '' : 'Enter your full name.');
  matricNumber.setCustomValidity(matricNumber.value.trim() ? '' : 'Enter your matriculation number.');
  otherSchoolInput.setCustomValidity(
    !otherSchoolInput.required || otherSchoolInput.value.trim()
      ? ''
      : 'Enter your school or institution name.',
  );
  if (!form.reportValidity()) return;

  const values = new FormData(form);
  const schoolName = values.get('institution') === 'Other (not listed)'
    ? values.get('otherSchool')
    : values.get('institution');
  const summary = [
    ['Student', values.get('studentName')],
    ['Matriculation number', values.get('matricNumber')],
    ['Age', values.get('age')],
    ['Institution', schoolName],
    ['Education level', values.get('educationLevel')],
    ['Programme years', `${values.get('startYear')}–${values.get('endYear')}`],
    ['School ID', schoolId.files[0].name],
  ];

  confirmation.replaceChildren();
  const heading = document.createElement('h3');
  heading.textContent = 'Your application preview is ready';
  confirmation.append(heading);
  const intro = document.createElement('p');
  intro.textContent = `Thank you, ${values.get('studentName')}. Please check your details:`;
  confirmation.append(intro);
  const list = document.createElement('ul');
  summary.forEach(([label, value]) => {
    const item = document.createElement('li');
    item.textContent = `${label}: ${value}`;
    list.append(item);
  });
  confirmation.append(list);
  const disclaimer = document.createElement('p');
  disclaimer.className = 'preview-disclaimer';
  disclaimer.textContent = 'This is a frontend-only preview. Your information and uploaded file have not been sent or saved.';
  confirmation.append(disclaimer);
  confirmation.classList.remove('is-hidden');
  confirmation.focus();
});

form.addEventListener('input', () => {
  if (!confirmation.classList.contains('is-hidden')) {
    confirmation.classList.add('is-hidden');
  }
});
