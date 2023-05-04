import React from 'react';
import { Button } from 'react-bootstrap';

const Favbutton = () => {
  return (
    <div>
      <div className="btns">
        <Button onClick={Toggle1} id="btnh1" className="btn">
          <i className="fas fa-heart"></i>
        </Button>
        <Button onClick={Toggle2} id="btnh2" className="btn">
          <i className="far fa-heart"></i>
        </Button>
        <Button onClick={Toggle3} id="btnh3" className="btn">
          <i className="fab fa-gratipay"></i>
        </Button>
      </div>
    </div>
  );
};

export default Favbutton;

// JavaScript code
function Toggle1() {
  var btnvar1 = document.getElementById('btnh1');
  if (btnvar1.style.color === 'red') {
    btnvar1.style.color = 'grey';
  } else {
    btnvar1.style.color = 'red';
  }
}

function Toggle2() {
  var btnvar2 = document.getElementById('btnh2');
  if (btnvar2.style.color === 'red') {
    btnvar2.style.color = 'grey';
  } else {
    btnvar2.style.color = 'red';
  }
}

function Toggle3() {
  var btnvar3 = document.getElementById('btnh3');
  if (btnvar3.style.color === 'red') {
    btnvar3.style.color = 'grey';
  } else {
    btnvar3.style.color = 'red';
  }
}
