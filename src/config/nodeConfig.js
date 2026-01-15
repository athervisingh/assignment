export const NODE_CONFIG = {
  customInput: {
    label: '📥 Input',
    handles: { inputs: [], outputs: [{ id: 'value' }] },
    style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  },
  customOutput: {
    label: '📤 Output',
    handles: { inputs: [{ id: 'value' }], outputs: [] },
    style: { background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  },
  llm: {
    label: '🤖 LLM',
    handles: {
      inputs: [{ id: 'system', top: '33%' }, { id: 'prompt', top: '66%' }],
      outputs: [{ id: 'response' }],
    },
    style: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', height: 100 },
  },
  text: {
    label: '📝 Text',
    handles: { inputs: [{ id: 'input' }], outputs: [{ id: 'output' }] },
    style: { background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  },
  calculator: {
    label: '🧮 Calculator',
    handles: {
      inputs: [{ id: 'a', top: '33%' }, { id: 'b', top: '66%' }],
      outputs: [{ id: 'result' }],
    },
    style: { background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  },
  number: {
    label: '🔢 Number',
    handles: { inputs: [], outputs: [{ id: 'value' }] },
    style: { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', height: 160 },
  },
  conditional: {
    label: '🔀 Conditional',
    handles: {
      inputs: [{ id: 'valueA', top: '25%' }, { id: 'valueB', top: '50%' }],
      outputs: [{ id: 'true', top: '33%' }, { id: 'false', top: '66%' }],
    },
    style: { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', height: 120 },
  },
  transform: {
    label: '🔄 Transform',
    handles: { inputs: [{ id: 'input' }], outputs: [{ id: 'output' }] },
    style: { background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  },
  api: {
    label: '🌐 API',
    handles: {
      inputs: [{ id: 'body', top: '40%' }, { id: 'headers', top: '70%' }],
      outputs: [{ id: 'response' }],
    },
    style: { background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', height: 140 },
  },
  merge: {
    label: '🔗 Merge',
    handles: {
      inputs: [{ id: 'input1', top: '25%' }, { id: 'input2', top: '50%' }, { id: 'input3', top: '75%' }],
      outputs: [{ id: 'merged' }],
    },
    style: { background: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', height: 140 },
  },
};