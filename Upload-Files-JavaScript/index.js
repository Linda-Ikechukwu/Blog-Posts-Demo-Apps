let profileName,profileImg,profileAud;

const getValuesFromInputs = () =>{
   profileName = document.querySelector('input.profile-name').value;
   profileImg = document.querySelector('input.profile-img').files[0];
   profileAud = document.querySelector('input.profile-aud').files[0];

  document.querySelector('form').style.display = 'none';
  
}

const convertInputValues = () => {
  
  const image = new Blob([profileImg]);
  profileImg = URL.createObjectURL(image);

  const audio = new Blob([profileAud]);
  profileAud = URL.createObjectURL(audio)

}

const addInputToProfile = () => {
    document.querySelector('.profile h2').innerHTML = `${profileName}`;
    document.querySelector('.profile img').setAttribute('src', profileImg);
    document.querySelector('.aud').setAttribute('src', profileAud);

    document.querySelector('.header').style.display = 'block';

    
}

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  getValueFromInputs();
  convertInputValues();
  addInputToProfile();
});