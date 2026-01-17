import { PipelineSubmit } from './toolbarElements/pipelineSubmit/PipelineSubmit';
import { NodePalette } from './toolbarElements/NodePalette/NodePalette';

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        background: 'white',
        // borderBottom: '1px solid #878e9b2d',
      }}
    >
      <PipelineSubmit/>
       <NodePalette />
     
    </div>
  );
};