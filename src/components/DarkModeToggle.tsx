import React from 'react';

type Props = {
  dark: boolean,
  setDark: (d: boolean) => void
};

export default function DarkModeToggle({ dark, setDark }: Props) {
  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}