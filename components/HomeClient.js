"use client";
import { useState } from 'react';
import { Upload, File, Settings, ArrowRight, CheckCircle, XCircle, Loader } from 'lucide-react';
import { extractTextFromPDF } from '../utils/parseFileClient';
import { extractTextFromPPTX } from '../utils/extractTextFromPPTX';
import { useSession } from 'next-auth/react';
import AuthStatus from './AuthStatus';
import SEO from './SEO';
import ConnectSection from './ConnectSection';

export default function HomeClient() {
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
              {/* ...rest of the UI code... */}
            </div>
          </div>
          {/* ...rest of the UI code... */}
        </main>
      </div>
      <ConnectSection />
    </div>
  );
} 