export const NODE_CONFIG = {
  customInput: {
    label: 'Input',
    description: 'Starting point where pipeline data enters the workflow',
    icon: '/pngs/input.png',
    handles: { inputs: [], outputs: [{ id: 'value' }] },
    style: { 
      background: 'white',
      width: 200,
      height: 100 
    },
  },
  customOutput: {
    label: 'Output',
    description: 'Final destination where processed pipeline results are collected',
    icon: '/pngs/output.png',
    handles: { inputs: [{ id: 'value' }], outputs: [] },
    style: { 
      background: 'white',
      width: 200,
      height: 100 
    },
  },
  llm: {
    label: 'LLM',
    description: 'Generates AI responses using language models with system & prompt inputs',
    icon: '/pngs/llm.png',
    handles: {
      inputs: [{ id: 'system', top: '33%' }, { id: 'prompt', top: '66%' }],
      outputs: [{ id: 'response' }],
    },
    style: { 
      background: 'white',
      width: 220,
      height: 160 
    },
  },
  text: {
    label: 'Text',
    description: 'Processes, modifies, and transforms text data between nodes',
    icon: '/pngs/text.png',
    handles: { inputs: [{ id: 'input' }], outputs: [{ id: 'output' }] },
    style: { 
      background: 'white',
      width: 200,
      height: 120 
    },
  },
  calculator: {
    label: 'Calculator',
    description: 'Performs arithmetic operations (add, subtract, multiply, divide) on numbers',
    icon: '/pngs/calculator.png',
    handles: {
      inputs: [{ id: 'a', top: '33%' }, { id: 'b', top: '66%' }],
      outputs: [{ id: 'result' }],
    },
    style: { 
      background: 'white',
      width: 200,
      height: 140 
    },
  },
  number: {
    label: 'Number',
    description: 'Generates configurable numeric values with min/max constraints',
    icon: '/pngs/number.png',
    handles: { inputs: [], outputs: [{ id: 'value' }] },
    style: { 
      background: 'white',
      width: 200,
      height: 160 
    },
  },
  conditional: {
    label: 'Conditional',
    description: 'Branches workflow based on comparison between two input values',
    icon: '/pngs/conditional.png',
    handles: {
      inputs: [{ id: 'valueA', top: '25%' }, { id: 'valueB', top: '50%' }],
      outputs: [{ id: 'true', top: '33%' }, { id: 'false', top: '66%' }],
    },
    style: { 
      background: 'white',
      width: 220,
      height: 140 
    },
  },
  transform: {
    label: 'Transform',
    description: 'Converts data between formats (JSON, string, object, array, etc.)',
    icon: '/pngs/transform.png',
    handles: { inputs: [{ id: 'input' }], outputs: [{ id: 'output' }] },
    style: { 
      background: 'white',
      width: 200,
      height: 120 
    },
  },
  api: {
    label: 'API',
    description: 'Makes HTTP requests with customizable body and headers configuration',
    icon: '/pngs/api.png',
    handles: {
      inputs: [{ id: 'body', top: '40%' }, { id: 'headers', top: '70%' }],
      outputs: [{ id: 'response' }],
    },
    style: { 
      background: 'white',
      width: 220,
      height: 160 
    },
  },
  merge: {
    label: 'Merge',
    description: 'Combines data from up to three input streams into single output',
    icon: '/pngs/merge.png',
    handles: {
      inputs: [{ id: 'input1', top: '25%' }, { id: 'input2', top: '50%' }, { id: 'input3', top: '75%' }],
      outputs: [{ id: 'merged' }],
    },
    style: { 
      background: 'white',
      width: 220,
      height: 160 
    },
  },
};
