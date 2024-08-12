import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import "./FlashcardList.css";
import prev from "./left.png";
import next from "./right.png";
import { Link } from 'react-router-dom';
import right from "./hand-right.png";
// Extracted Button component
const NavigationButton = React.memo(({ onClick, src, alt }) => (
  <button onClick={onClick}>
    <img src={src} alt={alt} />
  </button>
));

// Extracted FlashcardContent component
const FlashcardContent = React.memo(({ isFlipped, flashcard }) => (
  <div className="flashcard-content">
    {isFlipped ? (
      <>
        <h4 style={{ color: "red" }}>Answer:</h4>
        <h3>{flashcard.Answer_Content}</h3>
        <h2 className="ID">ID: {flashcard.id}</h2>
      </>
    ) : (
      <>
        <h4 style={{ color: "red" }}>Question:</h4>
        <h3>{flashcard.Question_Content}</h3>
        <h2 className="ID">ID: {flashcard.id}</h2>
      </>
    )}
  </div>
));

function FlashcardCarousel() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://flashbackend-9904.onrender.com/fetch');
                setFlashcards(response.data);
            } catch (error) {
                console.error("Failed to fetch flashcards:", error);
            }
        };

        fetchData();
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setIsFlipped((prev) => false);
    }, [flashcards.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setIsFlipped((prev) =>false);
    }, [flashcards.length]);

    const handleFlip = useCallback(() => {
        setIsFlipped((prev) => !prev);
    }, []);

    if (flashcards.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main">
            <h1 className="titl">Flashcards</h1>
            <div className="Admin">
                <img className="RightHand" src={right}></img>
                <button>
                    <Link to="/edit">Admin Page</Link>
                </button>
            </div>
            <div className="FlashCards">
                <div className="prev">
                    <NavigationButton onClick={goToPrev} src={prev} alt="Previous" />
                </div>
                <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                    <FlashcardContent isFlipped={isFlipped} flashcard={flashcards[currentIndex]} />
                </div>
                <div className="next">
                    <NavigationButton onClick={goToNext} src={next} alt="Next" />
                </div>
            </div>
        </div>
    );
}

export default FlashcardCarousel;
