import { PipelineToolbar } from './components/pipeline/pipelineToolbar/PipelineToolbar';
import { PipelineCanvas } from './components/pipeline/pipelineCanvas/PipelineCanvas';
// import { PipelineSubmit } from './components/pipeline/PipelineSubmit';

function App() {
  return (
    <div className='app-wrapper'>
      <PipelineToolbar />
      <PipelineCanvas />
      {/* <PipelineSubmit /> */}
    </div>
  );
}

export default App;