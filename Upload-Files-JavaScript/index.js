

const getValuesFromInputs = () =>{
   const profileName = document.querySelector('input.profile-name').value;
   const profileImg = document.querySelector('input.profile-img').files[0];
   const profileAud = document.querySelector('input.profile-aud').files[0];

   document.querySelector('form').style.display = 'none';

   return [profileName, profileImg, profileAud];
  
}

const convertInputValues = () => {
  const [profileName, profileImg, profileAud] = getValuesFromInputs();
  
  const profileImgURL = URL.createObjectURL(profileImg);
  const profileAudURL = URL.createObjectURL(profileAud);
  
  return[profileAudURL, profileImgURL, profileName ]

}

const addInputToProfile = () => {

    const [profileAudURL, profileImgURL, profileName ]  = convertInputValues();

    document.querySelector('figure h2').innerHTML = `Hey ${profileName}`;
    document.querySelector('.profile img').setAttribute('src', profileImgURL);
    document.querySelector('.aud').setAttribute('src', profileAudURL);

    document.querySelector('.header').style.display = 'flex';
}

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  addInputToProfile();
});

