// Кнопки

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupEditClose = popupEdit.querySelector('.popup__close-icon');
const popupAddClose = popupAdd.querySelector('.popup__close-icon');
const popupImageClose = popupImage.querySelector('.popup__close-icon');

// Формы

const formProfile = popupEdit.querySelector('.form');
const userNameInput = formProfile.querySelector('#user-name');
const userJobInput = formProfile.querySelector('#user-job');

const formCard = popupAdd.querySelector('.form');
const placeNameInput = formCard.querySelector('#place-name');
const placeImgInput = formCard.querySelector('#place-img');

// Профиль

const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Карточки

const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;

// Открытая картинка

const imageElement = popupImage.querySelector('.opened-image__image');
const imageCaption = popupImage.querySelector('.opened-image__caption');


// Открытие и закрытие модальных окон

function openPopup(popup) {
  popup.classList.add('popup_animated');
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Открытие и закрытие модального окна с картинкой

function handlePreviewImage(popupImageData) {
  openPopup(popupImage);

  imageElement.src = popupImageData.link;
  imageElement.alt = popupImageData.name;
  imageCaption.textContent = popupImageData.name;
}

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage);
});


// Функции создания и добавления карточек

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const likeButton = cardElement.querySelector('.element__like-icon');
  const trashButton = cardElement.querySelector('.element__trash-icon');

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  elementTitle.textContent = cardData.name;

  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-icon_active');
  });

  trashButton.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  elementImage.addEventListener('click', evt => {
    const targetImage = evt.target;

    const cardData = {
      name: targetImage.alt,
      link: targetImage.src
    };

    handlePreviewImage(cardData);
  });

  return cardElement;
}

function addCard(cardData, cardContainer, newCard) {
  const card = createCard(cardData);

  if (newCard) {
    cardContainer.prepend(card);
  } else {
    cardContainer.append(card);
  }
}


// Карточки из коробки

initialCards.forEach(item => {
  addCard(item, cardsList, false);
});


// Модальное окно редактирования профиля

editButton.addEventListener('click', () => {
  openPopup(popupEdit);

  userNameInput.value = profileTitle.textContent;
  userJobInput.value = profileSubtitle.textContent;
});

popupEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

// Отправка формы редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = userNameInput.value;
  profileSubtitle.textContent = userJobInput.value;

  closePopup(popupEdit);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);


// Модальное окно добавления карточки

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

popupAddClose.addEventListener('click', () => {
  closePopup(popupAdd);
});

// Отправка формы добавления карточки

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCard({
    name: placeNameInput.value,
    link: placeImgInput.value
  }, cardsList, true);

  closePopup(popupAdd);

  formCard.reset();
}

formCard.addEventListener('submit', handleCardFormSubmit);


// console.log();
// debugger;
