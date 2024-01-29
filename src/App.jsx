import { useState } from 'react';
import exclamationCircleFill from './assets/images/exclamation-circle-fill.svg';
import toy from './assets/images/toy.svg';

import { encryptText, decryptText } from './helpers/encryptionUtils';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const App = () => {

  const [message, setMessage] = useState('');
  const [resutText, setResultText] = useState('');
  const [showResult, setShowResult] = useState(false);

  const showSwal = (icon, title) => {
    withReactContent(Swal).mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon,
      title
    });
  }

  const handleInputMessageChange = (event) => {
    const textClened = event.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
    setMessage(textClened);
  };

  const validateMessage = (message) => {
    if (message.length === 0) {
      showSwal("warning", "Please enter a message! 😕");
      return false;
    }
    return true;
  }

  const handleEncryptButtonClick = () => {
    if (validateMessage(message)) {
      const encryptedMessage = encryptText(message);
      setResultText(encryptedMessage);
      showSwal("success", "Message encrypted! 🥳");
      setShowResult(true);
    }
  };

  const handleDecryptButtonClick = () => {
    if (validateMessage(message)) {
      const decryptedMessage = decryptText(message);
      setResultText(decryptedMessage);
      showSwal("success", "Message decrypted! 🤫");
      setShowResult(true);
    }
  };

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(resutText);
    showSwal("info", "Copied to clipboard! 📋");
    setShowResult(false);
    setMessage('');
    setResultText('');
  };

  return (
    <main>
      <article className="container__input">
        <textarea onChange={handleInputMessageChange} value={message} className="message_input" placeholder="Type your message here" />
        <section className="container__buttons">
          <section className="container__buttons__info">
            <p>
              <img src={exclamationCircleFill} alt="Exclamation circle fill image"/> Hey! Only lowercase letters and no accents, please! 🙏
            </p>
          </section>
          <section className="container__buttons__actions">
            <button onClick={handleEncryptButtonClick} className="btn btn-encrypt">Encrypt</button>
            <button onClick={handleDecryptButtonClick} className="btn btn-decrypt">Decrypt</button>
          </section>
        </section>
      </article>
      <article className="result">
        <section className="result__no-message" style={{display: showResult ? 'none' : 'flex'}}>
          <img className="toy-image" src={toy} alt="Alura Toy" />
          <p className="no-message">No message to show yet! 🫤</p>
          <p className="type-message">Type a message and click on the buttons to encrypt or decrypt it! 😉</p>
        </section>
        <section className="result__message" style={{display: showResult ? 'block' : 'none'}}>
          <textarea className="message_output" value={resutText} disabled />
          <section className="container__buttons__actions__result">
            <button onClick={handleCopyButtonClick} className="btn btn-copy">Copy</button>
          </section>
        </section>
      </article>
    </main>
  );
};