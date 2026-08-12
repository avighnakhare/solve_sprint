"use client";

import { useEffect, useState } from "react";
import { SiteMark } from "@/components/site-brand";

const successQuotes = [
  {
    quote: "Genius is one percent inspiration, ninety-nine percent perspiration.",
    author: "Thomas Edison"
  },
  {
    quote: "If there is no struggle, there is no progress.",
    author: "Frederick Douglass"
  },
  {
    quote:
      "Success is to be measured not so much by the position one has reached in life as by the obstacles one has overcome.",
    author: "Booker T. Washington"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "Try to become not a man of success, but try rather to become a man of value.",
    author: "Albert Einstein"
  },
  {
    quote: "We must have perseverance and above all confidence in ourselves.",
    author: "Marie Curie"
  },
  {
    quote: "It always seems impossible until it’s done.",
    author: "Nelson Mandela"
  },
  {
    quote:
      "We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard.",
    author: "John F. Kennedy"
  },
  {
    quote: "Never give in except to convictions of honour and good sense.",
    author: "Winston Churchill"
  },
  {
    quote: "It is hard to fail, but it is worse never to have tried to succeed.",
    author: "Theodore Roosevelt"
  },
  {
    quote: "With ordinary talent and extraordinary perseverance, all things are attainable.",
    author: "Thomas Fowell Buxton"
  },
  {
    quote: "Perseverance is not a long race; it is many short races one after another.",
    author: "Walter Elliott"
  },
  {
    quote: "Perseverance is a great element of success.",
    author: "Henry Wadsworth Longfellow"
  },
  {
    quote: "Victory belongs to the most persevering.",
    author: "Napoleon Bonaparte"
  },
  {
    quote: "Nothing great was ever achieved without enthusiasm.",
    author: "Ralph Waldo Emerson"
  },
  {
    quote: "I’m not afraid of storms, for I’m learning how to sail my ship.",
    author: "Louisa May Alcott"
  },
  {
    quote: "Optimism is the faith that leads to achievement; nothing can be done without hope.",
    author: "Helen Keller"
  },
  {
    quote: "I think perseverance is one of the key qualities.",
    author: "George Lucas"
  },
  {
    quote: "The secret of success is constancy of purpose.",
    author: "Benjamin Disraeli"
  },
  {
    quote: "Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.",
    author: "Samuel Beckett"
  }
] as const;

const QUOTE_INTERVAL_MS = 3600;

export function RouteLoadingScreen() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % successQuotes.length);
    }, QUOTE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  const currentQuote = successQuotes[quoteIndex];

  return (
    <div className="route-loader" role="status" aria-live="polite" aria-busy="true">
      <div className="route-loader__sky" aria-hidden="true" />

      <div className="route-loader__content">
        <div className="route-loader__mark" aria-hidden="true">
          <span className="route-loader__orbit route-loader__orbit--outer" />
          <span className="route-loader__orbit route-loader__orbit--inner" />
          <span className="route-loader__core"><SiteMark priority /></span>
        </div>

        <p className="route-loader__label">Preparing the next sprint</p>

        <figure className="route-loader__quote" key={quoteIndex}>
          <blockquote>“{currentQuote.quote}”</blockquote>
          <figcaption>— {currentQuote.author}</figcaption>
        </figure>

        <div className="route-loader__progress" aria-hidden="true">
          <span />
        </div>
        <p className="route-loader__count" aria-hidden="true">
          {String(quoteIndex + 1).padStart(2, "0")} / {successQuotes.length}
        </p>
      </div>
    </div>
  );
}
