import { useState, useEffect } from 'react'
import { processText } from './textProcessor'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    if (inputText.trim()) {
      setOutputText(processText(inputText))
    } else {
      setOutputText('')
    }
  }, [inputText])

  const handleCopy = async () => {
    if (!outputText) return

    try {
      await navigator.clipboard.writeText(outputText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-base-100 p-4 pb-8" style={{
      paddingTop: 'max(1rem, env(safe-area-inset-top))',
      paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
      paddingLeft: 'max(1rem, env(safe-area-inset-left))',
      paddingRight: 'max(1rem, env(safe-area-inset-right))'
    }}>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Input</legend>
            <textarea
              className="textarea h-48 w-full"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Output</legend>
            <textarea
              className="textarea h-48 w-full"
              value={outputText}
              readOnly
            />
          </fieldset>

          <div className="text-center">
            <button
              className={`btn ${outputText ? 'btn-primary' : 'btn-disabled'} btn-lg w-full max-w-sm`}
              onClick={handleCopy}
              disabled={!outputText}
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
