import React from 'react';

export default function About(): JSX.Element {
  return (
    <div>
      <h2>About example.</h2>
      <label htmlFor="ttsInput">TTS:</label>&nbsp;
      <input type="text" id="ttsInput" name="ttsInput" />
    </div>
  );
}
