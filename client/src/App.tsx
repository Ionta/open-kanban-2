import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {KanbanBoard} from "./pages/board";

// core styles are required for all packages
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider>
      <KanbanBoard/>
    </MantineProvider>
  )
}

export default App
