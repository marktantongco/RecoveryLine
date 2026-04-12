'use client';

import React, { useState, useRef, useCallback } from 'react';

interface CalculatorProps {
  onExit: () => void;
}

export default function Calculator({ onExit }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const lastTapRef = useRef<number>(0);
  const tapCountRef = useRef<number>(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTripleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 500) {
      tapCountRef.current++;
      if (tapCountRef.current >= 3) {
        onExit();
        tapCountRef.current = 0;
        lastTapRef.current = 0;
        if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
        return;
      }
    } else {
      tapCountRef.current = 1;
    }
    lastTapRef.current = now;

    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 600);
  }, [onExit]);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const val = parseFloat(display);
    setDisplay(String(val * -1));
  };

  const inputPercent = () => {
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      let result = 0;
      switch (operator) {
        case '+': result = prevValue + inputValue; break;
        case '-': result = prevValue - inputValue; break;
        case '×': result = prevValue * inputValue; break;
        case '÷': result = inputValue !== 0 ? prevValue / inputValue : 0; break;
      }
      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOp === '=' ? null : nextOp);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const getButtonClass = (btn: string) => {
    if (btn === 'C') return 'calc-btn calc-btn-clear';
    if (['+', '-', '×', '÷'].includes(btn)) return 'calc-btn calc-btn-op';
    if (btn === '=') return 'calc-btn calc-btn-eq';
    if (btn === '0') return 'calc-btn col-span-2';
    return 'calc-btn';
  };

  const handleButton = (btn: string) => {
    if (btn >= '0' && btn <= '9') inputDigit(btn);
    else if (btn === '.') inputDot();
    else if (btn === 'C') clearAll();
    else if (btn === '±') toggleSign();
    else if (btn === '%') inputPercent();
    else if (['+', '-', '×', '÷', '='].includes(btn)) performOperation(btn);
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-[#0a0f1a] flex flex-col"
      onClick={handleTripleTap}
    >
      {/* Display */}
      <div className="flex-shrink-0 px-6 pt-16 pb-4">
        <p className="text-xs text-slate-500 text-right mb-1">
          {prevValue !== null && operator ? `${prevValue} ${operator}` : ''}
        </p>
        <p className="text-4xl font-light text-white text-right tracking-tight">
          {display.length > 12 ? parseFloat(display).toExponential(6) : display}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex-1 px-4 pb-8 flex flex-col gap-3 max-w-md mx-auto w-full">
        {buttons.map((row, i) => (
          <div key={i} className="flex gap-3 flex-1">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={(e) => { e.stopPropagation(); handleButton(btn); }}
                className={getButtonClass(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
