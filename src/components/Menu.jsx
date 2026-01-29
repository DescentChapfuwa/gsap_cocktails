"use client";

import React from "react";
import { useState } from "react";
import { sliderLists } from "../constants";
import { useRef } from "react";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCocktails = sliderLists.length;

  const contentRef = useRef();

  const gotoSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;

    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return sliderLists[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50  border-white/50"
              }`}
              onClick={() => gotoSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => gotoSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              aria-hidden="true"
              alt="right-arrow"
            />
          </button>

          <button
            className="text-left"
            onClick={() => gotoSlide(currentIndex - 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              aria-hidden="true"
              alt="left-arrow"
            />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} alt="" className="object-contain" />
        </div>

        <div className="recipe lg:mr-40">
          <div className="info" ref={contentRef}>
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
        </div>

        <div className="details">
          <h2>{currentCocktail.title}</h2>
          <p>{currentCocktail.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
