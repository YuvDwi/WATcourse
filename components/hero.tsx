"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Sparkles, Upload, X } from "lucide-react"
import FloatingPaper from "@/components/floating-paper"
import RoboAnimation from "@/components/robo-animation"
import { useState } from "react"

export default function Hero() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <FloatingPaper x={200} y={100} delay={0} />
          <FloatingPaper x={800} y={200} delay={1} />
          <FloatingPaper x={1200} y={400} delay={2} />
          <FloatingPaper x={400} y={600} delay={3} />
          <FloatingPaper x={1000} y={700} delay={4} />
          <FloatingPaper x={150} y={500} delay={5} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Smarter Course Planning Starts
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-yellow to-orange-500">
              {" "}Here.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Upload your transcript and let our reccomendation engine reccomend courses personalized to your strenghts and weaknesses.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="bg-custom-yellow hover:bg-custom-yellow/80 text-black font-medium px-8"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <FileText className="mr-2 h-5 w-5" />
              Upload Transcript
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-custom-yellow hover:bg-custom-yellow/20"
              onClick={() => window.location.href = '/how-it-works'}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              How it works
            </Button>

          </motion.div>
        </div>
      </div>

      {/* Robot animation */}
      <RoboAnimation />

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
  )
}

// Upload Modal Component
function UploadModal({ onClose }: { onClose: () => void }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [uploadResults, setUploadResults] = useState<any[]>([])
  const [processingStep, setProcessingStep] = useState<string>("")
  const [showFullScreenLoading, setShowFullScreenLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'application/pdf'
    )
    
    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(file => 
      file.type === 'application/pdf'
    )
    
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const simulateProcessingSteps = async () => {
    const steps = [
      "Analyzing transcript structure...",
      "Extracting course information...",
      "Processing course codes...",
      "Generating AI recommendations...",
      "Finalizing results..."
    ]
    
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i])
      // Smoother transitions with longer delays between steps
      await new Promise(resolve => setTimeout(resolve, 800))
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setShowFullScreenLoading(true)
    setUploadStatus("Starting PDF analysis...")
    setUploadResults([])
    setProcessingStep("")

    try {
      // Start the fake processing steps
      simulateProcessingSteps()
      
      // Wait for 3 seconds total
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setShowFullScreenLoading(false)
      setUploadStatus("Processing transcript...")
      
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('http://localhost:8000/upload-pdf', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
      })

      const results = await Promise.all(uploadPromises)
      console.log('Upload results:', results)
      
      setUploadResults(results)
      setShowSuccess(true)
      
      // Store results in localStorage and navigate to analytics page
      localStorage.setItem('analyticsResults', JSON.stringify(results))
      
      // Show success for 2 seconds, then redirect to analytics page
      setTimeout(() => {
        window.location.href = '/analytics'
      }, 2000)

    } catch (error) {
      console.error('Upload error:', error)
      
      // Check if it's a PDF parsing error and show friendly message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      if (errorMessage.includes('PDF') || errorMessage.includes('parse') || errorMessage.includes('extract')) {
        setUploadStatus("Are you sure this is a University of Waterloo transcript?")
      } else {
        setUploadStatus(`Analysis failed: ${errorMessage}`)
      }
      
      setProcessingStep("")
      setShowFullScreenLoading(false)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        {/* Full Screen Loading Overlay */}
        {showFullScreenLoading && (
          <FullScreenLoading processingStep={processingStep} />
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-8">
                <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                    Analysis Complete!
                  </h2>
              <p className="text-green-400 text-lg mb-2">
                Successfully processed your transcript
              </p>
              <p className="text-gray-400 text-lg">
                Redirecting to detailed analytics...
              </p>
            </div>
          </div>
        )}

        {/* Regular Modal Content */}
        <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Upload Transcript</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-custom-yellow bg-custom-yellow/10' 
                  : isUploading
                  ? 'border-custom-yellow bg-custom-yellow/5'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Upload className="w-12 h-12 text-custom-yellow mx-auto mb-4" />
                  </div>
                  <p className="text-custom-yellow text-lg font-medium">
                    Processing your transcript...
                  </p>
                  <p className="text-gray-400 text-sm">
                    Please wait while we analyze your document
                  </p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg mb-2">
                    Drag and drop your PDF transcripts here
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    or click the button below to browse files
                  </p>
                  
                  <label className="inline-flex items-center px-4 py-2 bg-custom-yellow hover:bg-custom-yellow/80 text-black font-medium rounded-lg cursor-pointer transition-colors">
                    <FileText className="w-4 h-4 mr-2" />
                    Choose Files
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-medium mb-3">Selected Files:</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-custom-yellow mr-3" />
                        <span className="text-gray-300">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isUploading}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                className="bg-custom-yellow hover:bg-custom-yellow/80 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Analyzing...
                  </div>
                ) : (
                  `Analyze ${files.length > 0 && `(${files.length})`}`
                )}
              </Button>
            </div>

            {/* Overall Progress Bar */}
            {isUploading && !showFullScreenLoading && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Processing transcript...</span>
                  <span>AI analysis in progress</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-custom-yellow to-orange-500 h-2 rounded-full transition-all duration-1000 ease-out animate-pulse" style={{width: '85%'}}></div>
                </div>
              </div>
            )}

            {/* Upload Status */}
            {uploadStatus && (
              <div className={`mt-4 text-center ${
                uploadStatus.includes("Are you sure") 
                  ? "text-orange-400" 
                  : uploadStatus.includes("failed") 
                  ? "text-red-400" 
                  : "text-green-400"
              }`}>
                {uploadStatus}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Full Screen Loading Overlay Component
function FullScreenLoading({ processingStep }: { processingStep: string }) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Loading Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            {/* Animated Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-custom-yellow rounded-full animate-spin"></div>
            {/* Inner Content */}
            <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-custom-yellow rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -left-4 w-4 h-4 bg-custom-yellow rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute -top-4 -right-4 w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-custom-yellow rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Analyzing Transcript
        </h2>

        {/* Current Step */}
        <div className="mb-6">
          <motion.p 
            key={processingStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-custom-yellow text-lg font-medium mb-2"
          >
            {processingStep}
          </motion.p>
          <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto">
            <div className="bg-gradient-to-r from-custom-yellow to-orange-500 h-1 rounded-full transition-all duration-500 ease-out animate-pulse" style={{width: '70%'}}></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg">
          Our AI is processing your academic history
        </p>
        
        {/* Additional Info */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-custom-yellow rounded-full animate-pulse"></div>
            <span>PDF Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <span>Course Extraction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-custom-yellow rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <span>AI Analysis</span>
          </div>
        </div>
      </div>
    </div>
  )
}


function AnalyticsPage({ results, onBack }: { results: any[], onBack: () => void }) {
  const totalCourses = results.reduce((acc, r) => acc + (r.total_courses_found || 0), 0)
  const totalRecommendations = results.reduce((acc, r) => acc + (r.total_recommendations || 0), 0)

  return (
    <div className="fixed inset-0 bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden z-50">
      {/* Background ambient effect */}
      <div className="h-full w-full absolute inset-0 z-0"></div>
      
      <div className="relative z-10 h-full overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">📊 Course Analytics Dashboard</h1>
                <p className="text-gray-400 text-lg">Comprehensive analysis of your academic transcript</p>
              </div>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Back to Upload
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">📊 Course Analytics Dashboard</h2>
            <p className="text-gray-400">Comprehensive analysis of your academic transcript</p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Back to Upload
          </button>
        </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-l-4 border-l-custom-yellow">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-custom-yellow/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-custom-yellow" />
                </div>
                <div>
                  <p className="text-gray-400 text-lg">Transcripts Analyzed</p>
                  <p className="text-4xl font-bold text-white">{results.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-l-4 border-l-green-500">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-3xl">📚</span>
                </div>
                <div>
                  <p className="text-gray-400 text-lg">Courses Found</p>
                  <p className="text-4xl font-bold text-white">{totalCourses}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-l-4 border-l-orange-500">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-lg">AI Recommendations</p>
                  <p className="text-4xl font-bold text-white">{totalRecommendations}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-8">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{result.filename}</h2>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-lg">
                    {result.status}
                  </span>
                </div>

                {/* Course Recommendations - Show First */}
                {result.recommendations && result.recommendations.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-6 h-6 text-custom-yellow" />
                      <h3 className="text-white font-bold text-2xl">🎯 AI Course Recommendations</h3>
                      <span className="text-gray-400 text-lg">({result.total_recommendations})</span>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {result.recommendations.map((rec: any, recIndex: number) => (
                      <div key={recIndex} className="bg-gray-700 rounded-lg p-4 border-l-4 border-custom-yellow hover:bg-gray-650 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-custom-yellow font-bold text-xl">
                            {rec.course_code}
                          </span>
                          <div className="text-right">
                            <span className="text-gray-400 text-sm">AI Score</span>
                            <p className="text-lg font-bold text-white">{(rec.score * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                        
                        {rec.course_info && rec.course_info.course_description && (
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {rec.course_info.course_description}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Liked</p>
                            <p className="text-sm font-semibold text-green-400">
                              {rec.course_info?.liked_percentage || 'N/A'}%
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Useful</p>
                            <p className="text-sm font-semibold text-blue-400">
                              {rec.course_info?.useful_percentage || 'N/A'}%
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Easy</p>
                            <p className="text-sm font-semibold text-orange-400">
                              {rec.course_info?.easy_percentage || 'N/A'}%
                            </p>
                          </div>
                        </div>
                        
                        {rec.course_info && rec.course_info.url && (
                          <a 
                            href={rec.course_info.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block w-full text-center py-2 bg-custom-yellow hover:bg-custom-yellow/80 text-black font-medium rounded-lg transition-colors"
                          >
                            View Course Details →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

                {/* Extracted Courses - Show Second */}
                {result.extracted_courses && result.extracted_courses.length > 0 && (
                  <div className="border-t border-gray-700 pt-8">
                    <div className="flex items-center gap-3 mb-6">
                      <FileText className="w-6 h-6 text-gray-400" />
                      <h3 className="text-gray-300 font-bold text-2xl">📋 Courses from Transcript</h3>
                      <span className="text-gray-500 text-lg">({result.total_courses_found})</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {result.extracted_courses.map((course: string, courseIndex: number) => (
                        <span 
                          key={courseIndex}
                          className="px-4 py-3 bg-gray-700/50 text-gray-300 rounded-xl border border-gray-600 hover:bg-gray-700/70 transition-colors text-lg font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              
              {result.error && (
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-red-400 text-sm">Error: {result.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-gray-700">
            <button
              onClick={onBack}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors text-lg font-medium"
            >
              ← Upload Another Transcript
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-custom-yellow hover:bg-custom-yellow/80 text-black font-bold rounded-xl transition-colors text-lg"
            >
              ✨ Get More Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
