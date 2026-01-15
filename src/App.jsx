import React from 'react';
import { PipelineToolbar } from './components/pipeline/PipelineToolbar';
import { PipelineCanvas } from './components/pipeline/PipelineCanvas';
import { PipelineSubmit } from './components/pipeline/PipelineSubmit';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineCanvas />
      <PipelineSubmit />
    </div>
  );
}

export default App;