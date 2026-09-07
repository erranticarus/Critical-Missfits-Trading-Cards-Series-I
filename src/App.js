/** @format */

import React from "react";
import Card from "./Card";
import cardsData from "./data";
import "./App.css";

function App() {
        return (
                <div className="app">
                        <header className="app-header">
                                <h1>CRITICAL MISSFITS</h1>
                                <p>TRADING CARD COLLECTION • SERIES I • 2026</p>
                        </header>

                        <main className="app-container">
                                {cardsData.map((card) => (
                                        <Card key={card.id} data={card} />
                                ))}
                        </main>
                </div>
        );
}

export default App;