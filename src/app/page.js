'use client';

import { useState } from 'react';
import { Upload, File, Settings, ArrowRight, CheckCircle, XCircle, Loader } from 'lucide-react';
import { extractTextFromPDF } from '../../utils/parseFileClient';
import { extractTextFromPPTX } from '../../utils/extractTextFromPPTX';
import { useSession } from 'next-auth/react';
import AuthStatus from '../../components/AuthStatus';
import SEO from '../../components/SEO';
export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedText, setParsedText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [error, setError] = useState('');

  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium'); // default

  const [showFormButton, setShowFormButton] = useState(false);
  const [formLink, setFormLink] = useState('');

  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setError('');
    setParsedText('');
    setProcessComplete(false);
    setShowFormButton(false);
    setFormLink('');
    setSelectedFile(null);

    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        setError('Please select a valid PDF or PPTX file.');
      }
    }
  };

  const handleProcessFile = async () => {
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }
    if (status === 'loading') {
      setError('Authentication status loading, please wait.');
      return;
    }
    if (!accessToken) {
      setError('You must be signed in with a Google account.');
      return;
    }

    setIsUploading(true);
    setError('');
    setParsedText('');
    setProcessComplete(false);
    setShowFormButton(false);
    setFormLink('');

    try {
      let text = '';

      if (selectedFile.type === 'application/pdf') {
        text = await extractTextFromPDF(selectedFile);
      } else if (
        selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ) {
        const buffer = await selectedFile.arrayBuffer();
        text = await extractTextFromPPTX(buffer);
      } else if (selectedFile.type === 'application/vnd.ms-powerpoint') {
        setError(
          'Legacy PPT (.ppt) format is not supported. Please upload a PPTX file.'
        );
        setIsUploading(false);
        return;
      } else {
        setError('Unsupported file type. Please upload a PDF or PPTX file.');
        setIsUploading(false);
        return;
      }

      setParsedText(text || 'No text found in the file.');

      const response1 = await fetch('/api/GetResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parsedResume: text,
          numQuestions: Number(numQuestions),
          difficulty: difficulty.toLowerCase(),
        }),
      });

      if (!response1.ok) {
        const errorData = await response1.json();
        throw new Error(errorData.error || `API error ${response1.status}`);
      }

      const data1 = await response1.json();
      console.log('API GetResponse:', data1);

      if (!data1.quiz || !Array.isArray(data1.quiz)) {
        throw new Error('No questions array returned from GetResponse API');
      }

      const validQuestions = data1.quiz.every(
        (q) => q.question && Array.isArray(q.options) && q.answer
      );

      if (!validQuestions) {
        throw new Error('Invalid question format returned from GetResponse API');
      }

      const response2 = await fetch('/api/generate-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Generated Quiz',
          questions: data1.quiz,
          accessToken: accessToken,
        }),
      });

      if (!response2.ok) {
        const errorData = await response2.json();
        throw new Error(errorData.error || `API error ${response2.status}`);
      }

      const data2 = await response2.json();
      console.log('API generate-form:', data2);

      setFormLink(data2.formUrl || '');
      setShowFormButton(true);
      setProcessComplete(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Error: ' + err.message);
      setShowFormButton(false);
      setFormLink('');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans overflow-hidden">
    <SEO
  title="Convert PDF  to Google Form Quiz | AI Quiz App by Nithin N Mysore"
  description="Easily convert PDF and PPTX files to Google Form quizzes using Gemini AI. Developed by Nithin N Mysore, VIT Bhopal."
  url="https://ai-quiz-app-nu.vercel.app/"
/>


      <div className="absolute top-6 right-8 z-50">
        <AuthStatus />
      </div>

      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 pb-2">
            AI-Powered Quiz Generator
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Upload a PDF or PPTX and instantly generate a quiz.
          </p>
        </header>

        <main className="max-w-4xl mx-auto bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700 animate-fade-in-up">
          <div className="mb-8">
            <label
              htmlFor="file-upload"
              className="block mb-3 text-lg font-bold uppercase text-gray-300 tracking-wide"
            >
              1. Upload Your Document
            </label>
            <div
              className={`relative w-full h-48 flex flex-col items-center justify-center
                border-2 border-dashed border-gray-600 rounded-xl p-4 cursor-pointer
                ${selectedFile ? 'border-gray-500' : 'hover:border-gray-500 hover:bg-gray-700/50'}
                transition duration-300 ease-in-out`}
            >
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.pptx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              {selectedFile ? (
                <div className="text-center">
                  <File className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-center text-gray-300 font-medium px-4 break-words">
                    <span className="font-bold">Selected:</span> {selectedFile.name}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setError('');
                      setParsedText('');
                      setProcessComplete(false);
                      setShowFormButton(false);
                      setFormLink('');
                      const fileInput = document.getElementById('file-upload');
                      if (fileInput) fileInput.value = '';
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors p-1"
                    title="Clear selected file"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload
                    className="h-10 w-10 text-gray-500 mb-3"
                    aria-label="Upload Icon"
                  />
                  <p className="text-lg font-semibold">
                    Drag & Drop or <span className="underline">Click to Upload</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">(PDF or PPTX files only)</p>
                </>
              )}
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-400 font-semibold mt-3">
                <XCircle />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-7 w-7 text-gray-400" />
              <h2 className="text-lg font-bold uppercase tracking-wide text-gray-300">
                2. Customize Your Quiz
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="num-questions"
                  className="block mb-2 font-medium uppercase text-gray-400 text-sm"
                >
                  Number of Questions
                </label>
                <input
                  id="num-questions"
                  type="number"
                  min="1"
                  max="20"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  disabled={isUploading}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-500 transition duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="difficulty"
                  className="block mb-2 font-medium uppercase text-gray-400 text-sm"
                >
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  disabled={isUploading}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-500 transition duration-300 appearance-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleProcessFile}
              disabled={!selectedFile || isUploading}
              className="w-full max-w-xs mx-auto py-3 px-6 bg-white text-black font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isUploading ? (
                <>
                  <Loader className="animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate Quiz</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {processComplete && (
              <div className="flex items-center justify-center space-x-2 text-green-400 font-semibold p-3 bg-green-900/20 rounded-lg">
                <CheckCircle />
                <p>File processed successfully! Your quiz is ready.</p>
              </div>
            )}

            {showFormButton && formLink && (
              <div className="text-center">
                <button
                  onClick={() => window.open(formLink, '_blank')}
                  className="w-full max-w-xs mx-auto py-3 px-6 bg-black border border-gray-600 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Open Generated Form</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>


          {parsedText && (
            <div className="mt-8">
              <h3 className="text-gray-400 font-semibold mb-2">Extracted Text:</h3>
              <div className="bg-gray-900 rounded-lg p-4 max-h-48 overflow-y-auto text-sm whitespace-pre-wrap text-gray-300 font-mono border border-gray-700">
                {parsedText}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Connect with me section at the very bottom */}
      <div className="flex flex-col items-center gap-2 mt-16 mb-6">
        <span className="text-gray-400 text-sm">Connect with me</span>
        <div className="flex gap-4 mt-1">
          <a
            href="https://www.linkedin.com/in/nithin-n-a4b837275/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:scale-110 transition-transform"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#0077B5"/>
              <path d="M7.75 8.5C8.44036 8.5 9 7.94036 9 7.25C9 6.55964 8.44036 6 7.75 6C7.05964 6 6.5 6.55964 6.5 7.25C6.5 7.94036 7.05964 8.5 7.75 8.5Z" fill="white"/>
              <path d="M8.5 10H7V18H8.5V10Z" fill="white"/>
              <path d="M12.5 10H11V18H12.5V14.5C12.5 13.3954 13.3954 12.5 14.5 12.5C15.6046 12.5 16.5 13.3954 16.5 14.5V18H18V14.25C18 12.1789 16.0711 10.5 14 10.5C13.2044 10.5 12.4413 10.8161 11.8787 11.3787C11.3161 11.9413 11 12.7044 11 13.5V18H12.5V10Z" fill="white"/>
            </svg>
          </a>
          <a
            href="https://github.com/Nithin9585"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:scale-110 transition-transform"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#181717"/>
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z" fill="white"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}