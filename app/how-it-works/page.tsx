'use client'

import Link from 'next/link'
import { ArrowLeft, Play, BookOpen, Zap, Target, Users } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              How does WATcourse work?
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              WATcourse leverages data extracted from your transcript to recommend you courses based on your strengths, interests, prior knowledge, student reviews and overall easiness and usefullness 
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-gray-700">
            <div className="text-center">
              <div className="w-24 h-24 bg-custom-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-12 h-12 text-custom-yellow" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Watch How It Works</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                The demo is gonna be here in no time, trust.
              </p>
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <p className="text-gray-300 mb-4">📹 Video Link Placeholder</p>
                <p className="text-sm text-gray-500">
                  Insert your video URL here: <code className="bg-gray-800 px-2 py-1 rounded text-custom-yellow">Demo Video Coming Soon</code>
                </p>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-16 mb-16">
            <div className="flex items-start space-x-8">
              <div className="w-16 h-16 bg-custom-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-custom-yellow" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Step 1: Upload Your Transcript</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  After you upload your transcript, WATcourse parses the PDF and looks for relevant courses and grades, to understand what areas you're strongest and weakest in.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mt-4">
                  None of your personal data is extracted, and the transcript is deleted right after the analysis is done.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-8">
              <div className="w-16 h-16 bg-custom-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-8 h-8 text-custom-yellow" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Step 2: Data-Driven Analysis</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                    The next step is to factor in extra details from student reviews using natural language processing to understand more nuanced details about courses you performed well in, so that we can recommend you hyper-personalized courses that are a good fit for you.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mt-4">
                  These reviews were gathered from UWflow and then fed into a  model to extract the most relevant information.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-8">
              <div className="w-16 h-16 bg-custom-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-8 h-8 text-custom-yellow" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Step 3: Get Personalized Recommendations</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  After considering reviews, your strengths, weaknesses, and interests, we can recommend you courses that are a good fit for you.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mt-4">
                  You can also see what courses were factored in from your transcript, how good of a match you were to these courses and also visit the course page on UWflow to see more details about the course.
                </p>
              </div>
            </div>
          </div>

         

          {/* Technical Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">Technical Details</h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-white mb-3">Machine Learning Engine</h4>
                <p className="text-gray-400 leading-relaxed">
                  We use vector embeddings to represent courses and grades, and then use cosine similarity to find the most similar courses to your transcript, in addition to using natural language processing to extract the most relevant information from student reviews.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-3">Application Architecture</h4>
                <p className="text-gray-400 leading-relaxed">
                  The data is processed on the server side using FastAPI and Python, and the frontend is built with Next.js and Tailwind UI.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-3">Security & Privacy</h4>
                <p className="text-gray-400 leading-relaxed">
                  None of your personal data is stored, and the transcript is deleted right after the analysis is done.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                WATcourse is a free and open-source project, and you can find the source code on <a href="https://github.com/yuvdwi/CoursePick" className="text-custom-yellow hover:text-custom-yellow/80 transition-colors">GitHub</a>.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-custom-yellow hover:bg-custom-yellow/80 text-black font-bold rounded-xl transition-colors text-lg"
            >
              Try WATcourse? Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
