'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface CalculatorProps {
  onExit: () => void;
}

export default function Calculator({ onExit }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const secretBufferRef = useRef('');
  const secretTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Secret code: 6777 unlocks and exits
  const SECRET_CODE = '6777';

  const checkSecretCode = useCallback(() => {
    if (secretBufferRef.current.includes(SECRET_CODE)) {
      secretBufferRef.current = '';
      if (secretTimerRef.current) clearTimeout(secretTimerRef.current);
      onExit();
      return true;
    }
    return false;
  }, [onExit]);

  const feedBuffer = useCallback((key: string) => {
    secretBufferRef.current += key;
    if (secretTimerRef.current) clearTimeout(secretTimerRef.current);
    secretTimerRef.current = setTimeout(() => { secretBufferRef.current = ''; }, 2000);
    if (secretBufferRef.current.length > 20) {
      secretBufferRef.current = secretBufferRef.current.slice(-10);
    }
    checkSecretCode();
  }, [checkSecretCode]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      feedBuffer(e.key);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [feedBuffer]);

  const handleCalcButton = (btn: string) => {
    feedBuffer(btn);

    if (btn >= '0' && btn <= '9') {
      if (waitingForOperand) { setDisplay(btn); setWaitingForOperand(false); }
      else setDisplay(display === '0' ? btn : display + btn);
    } else if (btn === '.') {
      if (waitingForOperand) { setDisplay('0.'); setWaitingForOperand(false); }
      else if (!display.includes('.')) setDisplay(display + '.');
    } else if (btn === 'C') {
      setDisplay('0'); setPrevValue(null); setOperator(null); setWaitingForOperand(false);
    } else if (btn === '+-') {
      setDisplay(String(parseFloat(display) * -1));
    } else if (btn === '%') {
      setDisplay(String(parseFloat(display) / 100));
    } else if (['+', '-', '\u00d7', '\u00f7'].includes(btn)) {
      const inputValue = parseFloat(display);
      if (prevValue === null) setPrevValue(inputValue);
      else if (operator) {
        let result = 0;
        switch (operator) {
          case '+': result = prevValue + inputValue; break;
          case '-': result = prevValue - inputValue; break;
          case '\u00d7': result = prevValue * inputValue; break;
          case '\u00f7': result = inputValue !== 0 ? prevValue / inputValue : 0; break;
        }
        setPrevValue(result);
        setDisplay(String(result));
      }
      setWaitingForOperand(true);
      setOperator(btn);
    } else if (btn === '=') {
      const inputValue = parseFloat(display);
      if (prevValue !== null && operator) {
        let result = 0;
        switch (operator) {
          case '+': result = prevValue + inputValue; break;
          case '-': result = prevValue - inputValue; break;
          case '\u00d7': result = prevValue * inputValue; break;
          case '\u00f7': result = inputValue !== 0 ? prevValue / inputValue : 0; break;
        }
        setPrevValue(result);
        setDisplay(String(result));
      }
      setWaitingForOperand(true);
      setOperator(null);
    }
  };

  const buttons = [
    [{ label: 'C', type: 'clear' }, { label: '+-', type: 'fn' }, { label: '%', type: 'fn' }, { label: '\u00f7', type: 'op' }],
    [{ label: '7', type: 'num' }, { label: '8', type: 'num' }, { label: '9', type: 'num' }, { label: '\u00d7', type: 'op' }],
    [{ label: '4', type: 'num' }, { label: '5', type: 'num' }, { label: '6', type: 'num' }, { label: '-', type: 'op' }],
    [{ label: '1', type: 'num' }, { label: '2', type: 'num' }, { label: '3', type: 'num' }, { label: '+', type: 'op' }],
    [{ label: '0', type: 'num', span: 2 }, { label: '.', type: 'num' }, { label: '=', type: 'eq' }],
  ];

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'clear': return 'bg-red-500 text-white font-bold hover:bg-red-600 active:bg-red-700';
      case 'op': return 'bg-sky-500 text-white font-bold hover:bg-sky-600 active:bg-sky-700';
      case 'eq': return 'bg-emerald-500 text-white font-bold hover:bg-emerald-600 active:bg-emerald-700';
      case 'fn': return 'bg-slate-600 text-white font-semibold hover:bg-slate-500 active:bg-slate-400';
      default: return 'bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-600';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#0a0f1a] flex flex-col">
      {/* Status bar area */}
      <div className="flex-shrink-0 pt-12 pb-2 px-6 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium tracking-wider uppercase">Calculator</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
            <span className="text-[10px] text-slate-600">On</span>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="flex-shrink-0 px-6 pb-6 max-w-md mx-auto w-full">
        <div className="text-right">
          <p className="text-sm text-slate-500 mb-1 h-5">
            {prevValue !== null && operator ? `${prevValue} ${operator}` : '\u00a0'}
          </p>
          <p className="text-5xl font-extralight text-white tracking-tight leading-none transition-all duration-100">
            {display.length > 12 ? parseFloat(display).toExponential(6) : display}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex-1 px-4 pb-10 flex flex-col gap-3 max-w-md mx-auto w-full">
        {buttons.map((row, i) => (
          <div key={i} className="flex gap-3 flex-1">
            {row.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleCalcButton(btn.label)}
                className={`flex-1 rounded-2xl text-2xl font-medium flex items-center justify-center cursor-pointer transition-all duration-100 active:scale-95 border border-white/5 min-h-[60px] ${getButtonStyle(btn.type)}`}
                style={btn.span === 2 ? { gridColumn: 'span 1', maxWidth: 'calc(50% - 6px)' } : {}}
              >
                {btn.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Subtle hint at bottom */}
      <div className="text-center pb-4">
        <p className="text-[10px] text-slate-700 tracking-wide">
          Standard Calculator
        </p>
      </div>
    </div>
  );
}
