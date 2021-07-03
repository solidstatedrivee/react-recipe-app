import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import React from 'react';
import Modal from 'react-modal';
import RecipeCard from './RecipeCard';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(244, 197, 174, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(91,91,91)',
    border: '1px solid rgb(56,56,56)',
    padding: '50px 25px',

  }
}

Modal.setAppElement('#root');

function App() {
  let subtitle;

  const [query, setQuery] = useState("");
  const [menuClosed, setMenuClosed] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [recipes, setrecipes] = useState([]);
  const [healthLabel, sethealthLabel] = useState("keto-friendly");


  let YOUR_APP_ID = '54c0cda2';
  let YOUR_APP_KEY = '0a336849942061bad4c6a8766ccba5f3';


  let url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}
  &health=${healthLabel}`;


  function toggleMenuState() {
    setMenuClosed(!menuClosed);
    setIsOpen(!modalIsOpen);

    menuClosed ? document.body.classList.add("freeze-view") : document.body.classList.remove("freeze-view");
  }

  function afterOpenModal() {
    subtitle.style.color = 'rgb(242, 158, 112)';
  }

  async function getRecipes() {
    let getErrorMessage = document.getElementsByClassName('error-message')[0];
    let showError = () => getErrorMessage.classList.add('show-error');
    let hideError = () => getErrorMessage.classList.remove('show-error');

    try {
      let result = await Axios.get(url);
      if (result.data.hits.length < 1 || result.data.q === "") {
        showError();
      } else {
        hideError();
        setrecipes(result.data.hits);
        console.log(result.data);
      }
    } catch (err) {
      showError();
    }

  }

  let onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }


  return (
    <div className="App">
      <div className="menu-icon-container" onClick={toggleMenuState}>
        <i className={menuClosed ? 'fad fa-bars menu-icon' : 'fad fa-times menu-icon'}></i>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel='Recipe App Menu'
      >
        <div className="modal-content-wrapper">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='menu-title'>Menu</h2>
          <div className="menu-social-links">
            <ul className='social-links'>
              <li className='social-link'><i class="fab fa-instagram"></i>Instagram</li>
              <li className='social-link'><i class="fab fa-facebook-f"></i>Facebook</li>
              <li className='social-link'><i class="fab fa-twitter"></i>Twitter</li>
              <li className='social-link'><i class="fab fa-tiktok"></i>TikTok</li>
            </ul>
          </div>
          <button className='close-modal' onClick={toggleMenuState}><i class="far fa-times"></i>Close</button>
          <p>Made by Nate Sims | 2021</p>

        </div>

      </Modal>
      <h1 className="app-title">Let us help you find a recipe! 🍳</h1>
      <form action="" className="app-search-form" onSubmit={onSubmit}>
        <div className="error-message">Sorry, we couldn't find what you were looking for 😬</div>
        <input type="text" placeholder='Raspberry Pie 🥧' className='app-search' value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="dietary-restrictions-container">
          <label htmlFor="health-labels" className="health-label-for">Dietary Restrictions?: </label>

          <select name="health-labels" id="health-labels" onChange={e => sethealthLabel(e.target.value)}>
            <option className='health-label' >keto-friendly</option>
            <option className='health-label' >dairy-free</option>
            <option className='health-label' >gluten-free</option>
            <option className='health-label' >pork-free</option>
            <option className='health-label' >vegan</option>
          </select>
        </div>

        <input type="submit" value="Find Recipes" className="app-find" />
      </form>

      <div className='recipe-cards-container'>
        {recipes.map(recipe => {
          return <RecipeCard recipe={recipe} />
        })}
      </div>

    </div>
  );
}

export default App;
