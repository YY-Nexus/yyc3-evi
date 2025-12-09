"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Globe, BarChart3, Users, Settings, Maximize2, Volume2, Mic, Camera, Sparkles } from "lucide-react"
import MultimodalInteractionHub from "@/components/multimodal-interaction-hub"
import AdvancedEmotionalSystem from "@/components/advanced-emotional-system"

// 大屏数据可视化组件
function BigScreenVisualization() {
  const [activeDataLayer, setActiveDataLayer] = useState("overview")
  const [realTimeData, setRealTimeData] = useState({
    users: 1247,
    interactions: 8934,
    aiRequests: 2156,
    satisfaction: 94.2,
  })

  useEffect(() => {
    // 模拟实时数据更新
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        users: prev.users + Math.floor(Math.random() * 10 - 5),
        interactions: prev.interactions + Math.floor(Math.random() * 50),
        aiRequests: prev.aiRequests + Math.floor(Math.random() * 20),
        satisfaction: Math.max(90, Math.min(100, prev.satisfaction + (Math.random() - 0.5) * 2)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">在线用户</p>
                <motion.p
                  className="text-3xl font-bold text-blue-900"
                  key={realTimeData.users}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {realTimeData.users.toLocaleString()}
                </motion.p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">智能交互</p>
                <motion.p
                  className="text-3xl font-bold text-emerald-900"
                  key={realTimeData.interactions}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {realTimeData.interactions.toLocaleString()}
                </motion.p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">AI请求</p>
                <motion.p
                  className="text-3xl font-bold text-purple-900"
                  key={realTimeData.aiRequests}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {realTimeData.aiRequests.toLocaleString()}
                </motion.p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">满意度</p>
                <motion.p
                  className="text-3xl font-bold text-amber-900"
                  key={realTimeData.satisfaction}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {realTimeData.satisfaction.toFixed(1)}%
                </motion.p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// 智能交互控制面板
function IntelligentInteractionPanel() {
  const [activeMode, setActiveMode] = useState<"voice" | "gesture" | "ar" | null>(null)
  const [interactionHistory, setInteractionHistory] = useState<
    Array<{
      type: string
      action: string
      timestamp: number
    }>
  >([])

  const handleInteraction = (type: string, data: any) => {
    console.log("[v0] 多模态交互:", type, data)

    const newInteraction = {
      type,
      action: data.action || "未知操作",
      timestamp: Date.now(),
    }

    setInteractionHistory((prev) => [newInteraction, ...prev.slice(0, 4)])
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          智能交互控制中心
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 交互模式选择 */}
          <div className="space-y-4">
            <h4 className="font-medium text-muted-foreground">交互模式</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={activeMode === "voice" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode(activeMode === "voice" ? null : "voice")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Mic className="w-4 h-4" />
                <span className="text-xs">语音</span>
              </Button>
              <Button
                variant={activeMode === "gesture" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode(activeMode === "gesture" ? null : "gesture")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs">手势</span>
              </Button>
              <Button
                variant={activeMode === "ar" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode(activeMode === "ar" ? null : "ar")}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Camera className="w-4 h-4" />
                <span className="text-xs">AR</span>
              </Button>
            </div>
          </div>

          {/* 交互历史 */}
          <div className="space-y-4">
            <h4 className="font-medium text-muted-foreground">交互记录</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {interactionHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground">暂无交互记录</p>
              ) : (
                interactionHistory.map((interaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-sm p-2 bg-muted rounded"
                  >
                    <Badge variant="outline" className="text-xs">
                      {interaction.type}
                    </Badge>
                    <span className="flex-1">{interaction.action}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(interaction.timestamp).toLocaleTimeString()}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 多模态交互中心 */}
        <MultimodalInteractionHub onInteraction={handleInteraction} />
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 顶部导航栏 */}
      <motion.header
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">YYC³ EasyVizAI</h1>
                <p className="text-sm text-gray-600">可视化AI智能交互平台</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 大屏数据可视化 */}
        <BigScreenVisualization />

        {/* 智能交互控制面板 */}
        <IntelligentInteractionPanel />

        {/* 情感化交互系统 */}
        <AdvancedEmotionalSystem />
      </main>
    </motion.div>
  )
}
