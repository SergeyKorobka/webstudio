const modalBtn = document.querySelector('[data-modal-open]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const body = document.body;

let isLockBody = false;
const timeout = getComputedStyle(modal).transitionDelay;

modalBtn.addEventListener('click', toggleModal);

function addListeners() {
  modal.addEventListener('click', onClickBackdrop);
  modalCloseBtn.addEventListener('click', toggleModal);
  document.addEventListener('keydown', onEscape);
}

function removeListeners() {
  modal.removeEventListener('click', onClickBackdrop);
  modalCloseBtn.removeEventListener('click', toggleModal);
  document.removeEventListener('keydown', onEscape);
}

function toggleModal() {
  const isShowModal = modal.classList.contains('is-hidden');
  if (!isLockBody && isShowModal) {
    bodyLock();
    addListeners();
  } else {
    bodyUnLock();
    removeListeners();
  }
  modal.classList.toggle('is-hidden');
}

function onClickBackdrop(e) {
  if (!e.target.closest('.modal')) {
    toggleModal();
  }
}

function onEscape(e) {
  if (e.code === 'Escape') {
    toggleModal();
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

  body.style.paddingRight = lockPaddingValue;
  body.style.overflow = 'hidden';

  isLockBody = true;
}

function bodyUnLock() {
  setTimeout(function () {
    body.style.removeProperty('padding-right');
    body.style.removeProperty('overflow');
  }, timeout);

  isLockBody = false;
}
