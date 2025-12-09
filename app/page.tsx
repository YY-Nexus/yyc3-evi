"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)
  const [message, setMessage] = useState("")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = () => {
    if (message.trim()) {
      router.push(`/chat?message=${encodeURIComponent(message)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: backgroundImage
          ? `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 58, 138, 0.8)), url(${backgroundImage})`
          : "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: "1px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 300 - 150],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="absolute top-6 right-6 z-20">
        <label className="cursor-pointer bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-colors">
          <input type="file" accept="image/*" onChange={handleBackgroundUpload} className="hidden" />
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </label>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {showContent && (
          <>
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Image
                  src="/images/yyc3-logo-white.png"
                  alt="YYC³ Logo"
                  width={40}
                  height={40}
                  className="drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">YYC³ EasyVizAI</h1>
                <p className="text-cyan-200 text-sm">智能可视化助手已就绪</p>
              </div>
            </motion.div>

            <motion.div
              className="w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <motion.p
                  className="text-lg text-blue-200 mb-4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  请输入您的学习问题或需求...
                </motion.p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/20 shadow-xl">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="请输入您的学习问题或需求..."
                    className="flex-1 bg-white/10 border border-cyan-400/30 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    发送
                  </motion.button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  <motion.div
                    className="w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-cyan-300 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                  />
                </div>
              </div>

              <p className="text-center text-blue-300 text-sm mt-4">
                🎯 无界面智能交互 · 🎨 情感化视觉反馈 · 🔊 沉浸式音效体验
              </p>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}
