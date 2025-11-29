"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import AstraButton from "./ui/astra-button";
import { toast } from "sonner";
import { VoicePoweredOrb } from "@/components/ui/voice-powered-orb";

const allWords = [
  { word: "CAT", image: "🐱" },
  { word: "DOG", image: "🐶" },
  { word: "SUN", image: "☀️" },
  { word: "CAR", image: "🚗" },
  { word: "BALL", image: "⚽" },
  { word: "TREE", image: "🌳" },
];

export default function ReadingGame() {
  const [roundWords, setRoundWords] = useState<{ word: string; image: string }[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [supportError, setSupportError] = useState<string | null>(null);
  const [lastHeard, setLastHeard] = useState<string>("");

  const recognitionRef = useRef<any>(null);

  // Pick 3–4 random simple words when component mounts
  useEffect(() => {
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * 2) + 3; // 3 or 4 words
    setRoundWords(shuffled.slice(0, count));
  }, []);

  const currentWord = roundWords[currentWordIndex];

  const cleanupRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      cleanupRecognition();
    };
  }, []);

  const startListeningForWord = (wordIndex: number) => {
    const wordToMatch = roundWords[wordIndex];
    if (!wordToMatch) {
      console.log("No word to match at index:", wordIndex);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupportError("Your browser does not support speech recognition.");
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    // Create new recognition instance
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript: string = event.results[0][0].transcript;
      const confidence: number = event.results[0][0].confidence || 0;

      const cleaned = transcript.trim().toUpperCase();
      const target = wordToMatch.word.toUpperCase();

      setLastHeard(`${transcript} (${Math.round(confidence * 100)}%)`);

      // Allow small phrases like "A CAT", "THE DOG", etc.
      const normalized = cleaned.replace(/[^A-Z\s]/g, "");
      const wordsInSpeech = normalized.split(/\s+/).filter(Boolean);

      const matched = wordsInSpeech.includes(target);

      if (matched) {
        // Trigger confetti celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#06b6d4", "#22d3ee", "#10b981", "#22c55e", "#f59e0b", "#ec4899"],
        });

        toast.success(`Great reading! You said ${target}!`);
        // Move to next word
        const nextIndex = wordIndex + 1;
        if (nextIndex < roundWords.length) {
          setCurrentWordIndex(nextIndex);
          // Start listening for next word after delay
          setTimeout(() => {
            startListeningForWord(nextIndex);
          }, 1500);
        } else {
          // Finished all words
          setTimeout(() => {
            window.open(
              "https://play.google.com/store/apps/details?id=com.scribblesense.app",
              "_blank"
            );
          }, 1000);
        }
      } else {
        toast.message("Let's try that again. Say the word clearly.");
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error === "aborted" || event.error === "no-speech") {
        setIsListening(false);
        return;
      }
      toast.error("Oops, I couldn't hear that. Try again!");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
      setSupportError(null);
      setLastHeard("");
      console.log("Started listening for:", wordToMatch.word);
    } catch (err) {
      console.error("Failed to start recognition:", err);
      setIsListening(false);
    }
  };

  const startListening = () => {
    cleanupRecognition();
    setTimeout(() => {
      startListeningForWord(currentWordIndex);
    }, 100);
  };

  const goToNextWord = () => {
    cleanupRecognition();
    const nextIndex = currentWordIndex + 1;
    if (nextIndex < roundWords.length) {
      setCurrentWordIndex(nextIndex);
      setTimeout(() => {
        startListeningForWord(nextIndex);
      }, 1500);
    } else {
      setTimeout(() => {
        window.open(
          "https://play.google.com/store/apps/details?id=com.scribblesense.app",
          "_blank"
        );
      }, 1000);
    }
  };

  const handleStartGame = () => {
    if (!roundWords.length) return;
    setIsGameActive(true);
    toast.success("Reading game started! Say the word you see.");
    startListening();
  };

  const handleTryAgain = () => {
    if (!currentWord) return;
    toast.message("Okay, let's try that word again.");
    startListening();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-card rounded-3xl shadow-cyan border-2 border-secondary/20">
      <h3 className="text-3xl font-bold text-center mb-4 bg-gradient-cyan bg-clip-text text-transparent">
        Reading Game
      </h3>

      {!isGameActive || !currentWord ? (
        <div className="text-center py-12">
          <p className="text-lg mb-6 text-muted-foreground">
            Click start to begin the voice reading game. Say the word you see on the screen!
          </p>
          <AstraButton
            label="Start Game"
            variant="cyan"
            onClick={handleStartGame}
            className="text-lg px-12 py-4"
          />
          {supportError && (
            <p className="mt-4 text-sm text-red-500">
              {supportError}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Word + emoji */}
          <motion.div
            key={currentWord.word}
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <div className="text-[120px] mb-4">{currentWord.image}</div>
            <div className="text-6xl font-bold mb-4 bg-gradient-cyan bg-clip-text text-transparent">
              {currentWord.word}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Say this word clearly into your microphone.
            </p>
            {lastHeard && (
              <p className="text-xs text-muted-foreground">
                You said: <span className="font-semibold">{lastHeard}</span>
              </p>
            )}
          </motion.div>

          {/* Voice orb + controls */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="w-48 h-48 md:w-56 md:h-56">
              <VoicePoweredOrb
                enableVoiceControl={isListening}
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <AstraButton
                label={isListening ? "Listening..." : "Try Again"}
                variant="cyan"
                onClick={handleTryAgain}
                className="text-sm px-6 py-3"
              />
              <AstraButton
                label="Next Word →"
                variant="cyan"
                onClick={goToNextWord}
                className="text-sm px-6 py-3"
              />
            </div>

            <p className="text-xs text-muted-foreground text-center max-w-sm">
              The glowing orb reacts to your voice. Say the word you see. If it&apos;s correct,
              we&apos;ll move on to the next one!
            </p>
          </div>
        </>
      )}
    </div>
  );
}
