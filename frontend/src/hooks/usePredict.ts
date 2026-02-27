import { useState, useEffect, useRef, useCallback } from "react";
import type { Step } from "../ThinkingProcess";

export interface Report {
  agent: string;
  report: string;
}

export function usePredict() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const handleSearch = useCallback(() => {
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    setPrediction(null);
    setReports([]);
    setSteps([
      { id: "MarketData", name: "Market Data Analysis", status: "pending" },
      {
        id: "NewsAnalysis",
        name: "News Sentiment Analysis",
        status: "pending",
      },
      {
        id: "TechnicalAnalysis",
        name: "Technical Indicators",
        status: "pending",
      },
      {
        id: "EconomicSentiment",
        name: "Global Economic Sentiment",
        status: "pending",
      },
      {
        id: "ChiefPredictor",
        name: "Final Prediction Synthesis",
        status: "pending",
      },
    ]);

    ws.current = new WebSocket("ws://localhost:8000/ws/predict");

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ query }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "status") {
        setSteps((prev) =>
          prev.map((step) =>
            step.id === data.agent
              ? { ...step, status: data.status, message: data.message }
              : step,
          ),
        );
      } else if (data.type === "partial") {
        setPrediction((prev) =>
          prev === null ? data.content : prev + data.content,
        );
      } else if (data.type === "result") {
        setPrediction(data.prediction);
        setReports(data.agent_reports);
        setSteps((prev) =>
          prev.map((step) => ({ ...step, status: "completed" })),
        );
        setIsSearching(false);
      } else if (data.type === "error") {
        console.error("Agent error:", data.message);
        setIsSearching(false);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsSearching(false);
    };

    ws.current.onclose = () => {
      setIsSearching(false);
    };
  }, [query, isSearching]);

  useEffect(() => {
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return {
    query,
    setQuery,
    isSearching,
    steps,
    prediction,
    reports,
    handleSearch,
  };
}
