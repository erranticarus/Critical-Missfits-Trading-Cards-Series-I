/** @format */

import React from "react";
import Card from "./Card";
import cardsData from "./data";
import "./App.css";

const smokeWisps = [
  {
    className: "smoke-wisp-1",
    style: {
      "--duration": "23s",
      "--delay": "-8s",
    },
  },
  {
    className: "smoke-wisp-2",
    style: {
      "--duration": "29s",
      "--delay": "-17s",
    },
  },
  {
    className: "smoke-wisp-3",
    style: {
      "--duration": "26s",
      "--delay": "-4s",
    },
  },
  {
    className: "smoke-wisp-4",
    style: {
      "--duration": "32s",
      "--delay": "-21s",
    },
  },
  {
    className: "smoke-wisp-5",
    style: {
      "--duration": "27s",
      "--delay": "-13s",
    },
  },
  {
    className: "smoke-wisp-6",
    style: {
      "--duration": "35s",
      "--delay": "-26s",
    },
  },
];

const embers = [
  {
    left: "8%",
    bottom: "-5%",
    duration: "13s",
    delay: "-4s",
    drift: "7vw",
    size: "2.5px",
  },
  {
    left: "19%",
    bottom: "-4%",
    duration: "15s",
    delay: "-7s",
    drift: "9vw",
    size: "2.5px",
  },
  {
    left: "31%",
    bottom: "-6%",
    duration: "14s",
    delay: "-2s",
    drift: "5vw",
    size: "2.5px",
  },
  {
    left: "43%",
    bottom: "-5%",
    duration: "16s",
    delay: "-9s",
    drift: "6vw",
    size: "2.5px",
  },
  {
    left: "55%",
    bottom: "-7%",
    duration: "18s",
    delay: "-5s",
    drift: "8vw",
    size: "2.5px",
  },
  {
    left: "67%",
    bottom: "-9%",
    duration: "20s",
    delay: "-17s",
    drift: "5vw",
    size: "2.5px",
  },
  {
    left: "13%",
    bottom: "-8%",
    duration: "17s",
    delay: "-11s",
    drift: "-4vw",
    size: "2px",
  },
  {
    left: "25%",
    bottom: "-10%",
    duration: "21s",
    delay: "-16s",
    drift: "-6vw",
    size: "2px",
  },
  {
    left: "37%",
    bottom: "-9%",
    duration: "19s",
    delay: "-13s",
    drift: "-8vw",
    size: "2px",
  },
  {
    left: "49%",
    bottom: "-12%",
    duration: "23s",
    delay: "-19s",
    drift: "-5vw",
    size: "2px",
  },
  {
    left: "73%",
    bottom: "-6%",
    duration: "14s",
    delay: "-3s",
    drift: "-9vw",
    size: "2px",
  },
  {
    left: "85%",
    bottom: "-5%",
    duration: "17s",
    delay: "-8s",
    drift: "-5vw",
    size: "2px",
  },
];

const Atmosphere = () => {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="smoke-layer">
        {smokeWisps.map((wisp) => (
          <div
            key={wisp.className}
            className={`smoke-wisp ${wisp.className}`}
            style={wisp.style}
          />
        ))}
      </div>

      <div className="ember-layer">
        {embers.map((ember, index) => (
          <span
            key={index}
            className="ember"
            style={{
              left: ember.left,
              bottom: ember.bottom,
              "--duration": ember.duration,
              "--delay": ember.delay,
              "--drift": ember.drift,
              "--size": ember.size,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const GalleryBanner = ({ src, alt = "" }) => {
  return (
    <div className="gallery-banner">
      <img
        src={src}
        className="gallery-banner-image"
        alt={alt}
      />

      <div
        className="gallery-banner-shine"
        style={{
          "--banner-mask": `url(${src})`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

function App() {
  const sections = [1, 2, 3];

  return (
    <div className="app">
      <Atmosphere />

      <header className="app-header">
        <GalleryBanner
          src="./assets/banner.png"
          alt="Critical Missfits Trading Cards"
        />

        <p className="card-instructions">
          Press F11 to toggle full-screen mode • Scroll down to explore the cards
          <br />
          Single-click a card to flip it over • Double-click to zoom in •
          Click anywhere outside the card to zoom back out
        </p>
      </header>

      <section className="gallery-section section-zero">
        <div className="app-container">
          {cardsData
            .filter((card) => card.section === 0)
            .map((card) => (
              <Card key={card.id} data={card} />
            ))}
        </div>
      </section>

      {sections.map((section) => {
        const sectionCards = cardsData.filter(
          (card) => card.section === section
        );

        return (
          <section
            className={`gallery-section section-${section}`}
            key={section}
          >
            <GalleryBanner
              src={`./assets/banner_${String.fromCharCode(
                96 + section
              )}.png`}
            />

            <div className="app-container">
              {sectionCards.map((card) => (
                <Card key={card.id} data={card} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default App;