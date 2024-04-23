import React, { useState, useRef, useEffect } from 'react';

interface CommandOutput {
  command: string;
  output: string;
}

const Bash: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [output, setOutput] = useState<CommandOutput[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  const handleCommand = (command: string) => {
    const newOutput: CommandOutput[] = [...output, { command, output: 'Command not recognized.' }];
    setOutput(newOutput);
  };

  return (
    <div className="text-white font-mono w-full  flex flex-col items-center p-2">
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-zinc-950 p-3 rounded-xl">
        <div className="w-full max-w-md overflow-y-auto" style={{ maxHeight: '10vh', minHeight:'10vh' }} ref={outputRef}>
          {output.map((item, index) => (
            <div key={index} className="mb-2 flex items-center justify-center sm:justify-start">
              <span className="text-green-400 mr-2">$</span>
              <span className="mr-2">{item.command}</span>
              <span>{item.output}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full sm:justify-start">
          <span className="text-green-400 mr-2">$</span>
          <input
            type="text"
            className="bg-transparent outline-none border-none text-white sm:flex-1"
            placeholder="Enter a command..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
          />
        </div>
      </div>
    </div>
  );
};

export default Bash;
