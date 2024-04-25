import React, { useState, useRef, useEffect } from 'react';

interface CommandOutput {
  command: string;
  output: string;
}

 
  const Bash: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [output, setOutput] = useState<CommandOutput[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);
  const commands = 
  {
   "clear": (params: string[]) => clear(params),
   "chbg": (params: string[]) => changeBgColor(params),
   "txtcl":(params: string[]) => changeTextColor(params),
   "help":(params: string[]) => help(params),
   "dark": (params: string[]) => setDarkMode(params), 
  "light": (params: string[]) => setLightMode(params), 
  };
  function setDarkMode(params: string[]) {
    const rootElement = document.querySelector('#root') as HTMLElement;
    if (rootElement) {
      rootElement.style.backgroundColor = 'black';
      rootElement.style.color = 'white';
    }
  }
  
  function setLightMode(params: string[]) {
    const rootElement = document.querySelector('#root') as HTMLElement;
    if (rootElement) {
      rootElement.style.backgroundColor = 'white';
      rootElement.style.color = 'black';
    }
    
  }

  function help(params: string[]) {
    const newOutput: CommandOutput[] = [...output, { command: 'help', output: 'Available commands: clear, chbg, txtcl, dark, light' }];
    setOutput(newOutput)
  
  }
  function changeTextColor(params: string[]) {
    const rootElement = document.querySelector('#root') as HTMLElement;
    if (rootElement) {
      rootElement.style.color = params[0];
    }
  }

  function clear(params: string[]) {
    setOutput([])
  }
  function changeBgColor(params: string[]) {
    const rootElement = document.querySelector('#root') as HTMLElement;
    if (rootElement) {
      rootElement.style.backgroundColor = params[0];
    }
  }
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
    const commandParts = command.split(' ');

    const params = commandParts.slice(1);
   if(commands[commandParts[0] as keyof typeof commands]){
    commands[commandParts[0] as keyof typeof commands](params);
    return;
  }
   defaultCommand(command);
  };

  const defaultCommand = (command: string) => {
    const newOutput: CommandOutput[] = [...output, { command, output: 'Command not recognized.' }];
    setOutput(newOutput)
  }

  return (
    <div className="font-mono w-full  flex flex-col items-center p-2">

      <div className="flex flex-col items-center justify-center w-full max-w-md bg-zinc-950 p-3 rounded-xl box-border text-white">
        <div className="w-full max-w-md overflow-y-auto" style={{ maxHeight: '10vh', minHeight:'10vh' }} ref={outputRef}>
          {output.map((item, index) => (
          <div key={index} className="mb-2 flex items-center justify-center sm:justify-start flex-wrap">
          <span className="text-green-400 mr-2">$</span>
          <span className="mr-2 break-words overflow-ellipsis overflow-hidden ">{item.command}</span>
          <span className="break-words overflow-ellipsis overflow-hidden ">{item.output}</span>
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
      <h1 className='opacity-15'>use command help for command list</h1>
    </div>
  );
};

export default Bash;
