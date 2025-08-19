'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { FileText, Sparkles, X } from 'lucide-react'

function AnalyticsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get results from URL params or localStorage
    const resultsParam = searchParams.get('results')
    if (resultsParam) {
      try {
        const parsedResults = JSON.parse(decodeURIComponent(resultsParam))
        setResults(parsedResults)
      } catch (e) {
        console.error('Error parsing results:', e)
      }
    } else {
      // Fallback to localStorage if no URL params
      const storedResults = localStorage.getItem('analyticsResults')
      if (storedResults) {
        try {
          setResults(JSON.parse(storedResults))
        } catch (e) {
          console.error('Error parsing stored results:', e)
        }
      }
    }
    setLoading(false)
  }, [searchParams])

  const handleBack = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="h-full w-full absolute inset-0 z-0"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-custom-yellow mx-auto mb-8"></div>
            <h2 className="text-3xl font-bold text-white mb-4">Loading Analytics...</h2>
            <p className="text-gray-400 text-lg">Preparing your course insights</p>
          </div>
        </div>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="h-full w-full absolute inset-0 z-0"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-8">
              <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No Analytics Data</h2>
            <p className="text-gray-400 text-lg mb-8">Please upload a transcript first to view analytics</p>
            <button
              onClick={handleBack}
              className="px-8 py-4 bg-custom-yellow hover:bg-custom-yellow/80 text-black font-bold rounded-xl transition-colors text-lg"
            >
              ← Back to Upload
            </button>
          </div>
        </div>
      </div>
    )
  }

  const totalCourses = results.reduce((acc, r) => acc + (r.total_courses_found || 0), 0)
  const totalRecommendations = results.reduce((acc, r) => acc + (r.total_recommendations || 0), 0)

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Background ambient effect */}
      <div className="h-full w-full absolute inset-0 z-0"></div>
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
          <div className="container mx-auto px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-semibold text-white mb-4">Course Analytics Dashboard</h1>
                <p className="text-gray-400 text-xl leading-relaxed">Comprehensive analysis of your academic transcript and AI-powered course recommendations</p>
              </div>
              <button
                onClick={handleBack}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors flex items-center gap-3 text-lg font-medium"
              >
                <X className="w-6 h-6" />
                Back to Upload
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-8 py-12">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
          <div className="space-y-12">
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
                        <div key={recIndex} className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600 border-l-4 border-l-custom-yellow hover:bg-gray-700/70 transition-all duration-300 transform hover:scale-105">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-custom-yellow font-bold text-2xl">
                              {rec.course_code}
                            </span>
                            <div className="text-right">
                              <span className="text-gray-400 text-sm">AI Score</span>
                              <p className="text-xl font-bold text-white">{(rec.score * 100).toFixed(1)}%</p>
                            </div>
                          </div>
                          
                          {rec.course_info && rec.course_info.course_description && (
                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                              {rec.course_info.course_description}
                            </p>
                          )}
                          
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="text-center bg-gray-800/50 rounded-lg p-2">
                              <p className="text-xs text-gray-400">Liked</p>
                              <p className="text-lg font-bold text-green-400">
                                {rec.course_info?.liked_percentage || 'N/A'}%
                              </p>
                            </div>
                            <div className="text-center bg-gray-800/50 rounded-lg p-2">
                              <p className="text-xs text-gray-400">Useful</p>
                              <p className="text-lg font-bold text-blue-400">
                                {rec.course_info?.useful_percentage || 'N/A'}%
                              </p>
                            </div>
                            <div className="text-center bg-gray-800/50 rounded-lg p-2">
                              <p className="text-xs text-gray-400">Easy</p>
                              <p className="text-lg font-bold text-orange-400">
                                {rec.course_info?.easy_percentage || 'N/A'}%
                              </p>
                            </div>
                          </div>
                          
                          {rec.course_info && rec.course_info.url && (
                            <a 
                              href={rec.course_info.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block w-full text-center py-3 bg-custom-yellow hover:bg-custom-yellow/80 text-black font-bold rounded-lg transition-colors"
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
                  <div className="border-t border-gray-700 pt-8">
                    <p className="text-red-400 text-lg">Error: {result.error}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 mt-16 pt-12 border-t border-gray-700">
            <button
              onClick={handleBack}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors text-lg font-medium"
            >
              ← Upload Another Transcript
            </button>
            <button
              onClick={handleBack}
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

export default function AnalyticsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="h-full w-full absolute inset-0 z-0"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-custom-yellow mx-auto mb-8"></div>
            <h2 className="text-3xl font-bold text-white mb-4">Loading Analytics...</h2>
            <p className="text-gray-400 text-lg">Preparing your course insights</p>
          </div>
        </div>
      </div>
    }>
      <AnalyticsContent />
    </Suspense>
  )
}
