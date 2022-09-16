import React, { useState } from 'react'

import "./RecipeCard.css"

let fileExtensionRegex = /^.*\.(jpe?g|JPE?G|png)$/


function RecipeCard({ recipe }) {
    const [show, setshow] = useState(true);

    let toggleShow = () => {
        setshow(!show);
    }
    return (
        recipe["recipe"]["image"].match(fileExtensionRegex) != null &&
        (<div className="recipe-ingredients-container">
            <div className='recipe-card' style={{ background: `url(${recipe["recipe"]["image"]}) center` }}>
                <h2 className='recipe-label'>{recipe["recipe"]["label"]}</h2>
                {recipe["recipe"]["cuisineType"] != null && (
                    <div className="cuisine-type-container">
                        <i class="fad fa-utensils-alt"></i>
                        <div className="cuisine-type">Cuisine: {recipe["recipe"]["cuisineType"]}</div>
                    </div>
                )}
                <div className="calories">{Math.floor(recipe["recipe"]["calories"])}cal</div>
                <div className="show-container" onClick={toggleShow}>
                    <i class={show ? "fad fa-angle-double-down" : "fad fa-minus"}></i>
                    <div className="show">{show ? 'Show More' : 'Show Less'}</div>
                </div>
            </div>
            <div className={`ingredients-container ${!show ? 'ingredients-visible' : ''}`}>
                <h3>Ingredients</h3>
                <ul>
                    {recipe["recipe"]["ingredients"].map(ingredient => {
                        return (
                            <li>• {ingredient["text"]}</li>)
                    })}

                </ul>
                <a href={recipe["recipe"]["url"]} target="_blank" rel="noreferrer" className="recipe-link"><i class="fad fa-link"></i>View Recipe</a>
            </div>
        </div>
        ))
}

export default RecipeCard
