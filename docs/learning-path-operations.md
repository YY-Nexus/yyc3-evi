# YYC³ EasyVizAI 学习路径系统操作文档

## 系统概述

YYC³ EasyVizAI 学习路径系统是一个基于知识图谱和AI算法的个性化学习规划平台，能够根据用户画像、学习目标和偏好自动生成最优的学习路径。

## 核心功能

### 1. 智能学习路径生成器

#### 功能特性
- **个性化分析**: 基于用户画像（学习水平、风格、时间、兴趣）进行个性化推荐
- **知识图谱驱动**: 使用PageRank算法分析知识点依赖关系
- **多算法融合**: 结合协同过滤、内容推荐等多种算法
- **实时优化**: 根据学习进度动态调整路径

#### 操作流程
1. **配置用户画像**
   - 设置当前学习水平（初级/中级/高级）
   - 选择学习风格（视觉型/听觉型/动手型/阅读型）
   - 输入每周可用学习时间
   - 标记兴趣领域和已完成主题

2. **选择学习目标**
   - 浏览可用学习目标列表
   - 查看目标详情（描述、时长、技能点、优先级）
   - 多选感兴趣的学习目标
   - 系统自动分析目标间的依赖关系

3. **生成学习路径**
   - 点击"生成路径"按钮启动AI算法
   - 系统执行5步生成流程：
     - 分析用户画像和学习目标
     - 构建知识依赖图谱
     - 应用个性化推荐算法
     - 优化学习路径序列
     - 生成详细学习计划

4. **查看生成结果**
   - 路径统计信息（节点数、时长、置信度）
   - 算法元数据（算法类型、适应性、个性化程度）
   - 学习节点预览（概念/练习/项目/评估）
   - 资源推荐（视频/文章/练习/项目）

### 2. 知识图谱可视化

#### 功能特性
- **交互式图谱**: 支持缩放、搜索、筛选操作
- **多维度关系**: 展示前置、相关、扩展三种知识关系
- **重要性计算**: 基于PageRank算法计算节点重要性
- **进度追踪**: 实时显示学习进度和完成状态

#### 操作指南
1. **图谱导航**
   - 使用鼠标滚轮缩放图谱
   - 拖拽移动视图区域
   - 点击节点查看详细信息

2. **搜索和筛选**
   - 输入关键词搜索特定知识点
   - 选择视图模式（全部/学习路径/已完成）
   - 切换连接线显示/隐藏

3. **节点交互**
   - 点击节点查看详情弹窗
   - 标记节点完成状态
   - 查看前置要求和相关技能

### 3. 智能报告生成

#### 功能特性
- **分模块生成**: 概览、进度、分析、推荐四大模块
- **AI驱动分析**: 智能分析学习表现和薄弱环节
- **多格式导出**: 支持PDF、HTML、邮件等格式
- **实时更新**: 根据学习进度动态更新报告内容

#### 使用方法
1. **生成报告内容**
   - 逐个生成各模块内容
   - 或一键生成完整报告
   - 查看生成进度和状态

2. **报告预览**
   - 查看完整报告布局
   - 检查数据准确性
   - 调整报告配置

3. **导出和分享**
   - 选择导出格式（PDF/HTML）
   - 生成分享链接
   - 发送邮件报告

## 技术架构

### 算法实现

#### 1. PageRank知识重要性计算
\`\`\`python
def calculate_pagerank(knowledge_graph, damping=0.85, max_iter=100):
    """
    计算知识图谱中每个节点的PageRank值
    """
    nodes = list(knowledge_graph.nodes())
    n = len(nodes)
    
    # 初始化PageRank值
    pagerank = {node: 1.0/n for node in nodes}
    
    for _ in range(max_iter):
        new_pagerank = {}
        for node in nodes:
            rank = (1 - damping) / n
            for predecessor in knowledge_graph.predecessors(node):
                out_degree = knowledge_graph.out_degree(predecessor)
                if out_degree > 0:
                    rank += damping * pagerank[predecessor] / out_degree
            new_pagerank[node] = rank
        
        pagerank = new_pagerank
    
    return pagerank
\`\`\`

#### 2. 个性化推荐算法
\`\`\`python
def generate_personalized_path(user_profile, learning_goals, knowledge_graph):
    """
    基于用户画像和学习目标生成个性化学习路径
    """
    # 1. 分析用户特征
    user_features = extract_user_features(user_profile)
    
    # 2. 计算目标相似度
    goal_similarity = calculate_goal_similarity(learning_goals, user_features)
    
    # 3. 构建学习序列
    learning_sequence = build_learning_sequence(
        goals=learning_goals,
        graph=knowledge_graph,
        user_level=user_profile.current_level,
        time_constraint=user_profile.available_time
    )
    
    # 4. 优化路径顺序
    optimized_path = optimize_path_order(
        sequence=learning_sequence,
        user_style=user_profile.learning_style,
        difficulty_preference=user_profile.preferred_difficulty
    )
    
    return optimized_path
\`\`\`

### 数据结构

#### 学习节点定义
\`\`\`typescript
interface LearningNode {
  id: string                    // 节点唯一标识
  title: string                 // 节点标题
  description: string           // 详细描述
  type: NodeType               // 节点类型（概念/练习/项目/评估）
  difficulty: number           // 难度系数 (0-1)
  estimatedTime: number        // 预计学习时间（分钟）
  prerequisites: string[]      // 前置要求节点ID列表
  skills: string[]             // 涉及技能列表
  resources: Resource[]        // 学习资源列表
  metadata: NodeMetadata       // 元数据信息
}
\`\`\`

#### 用户画像模型
\`\`\`typescript
interface UserProfile {
  currentLevel: LearningLevel          // 当前学习水平
  learningStyle: LearningStyle         // 学习风格偏好
  availableTime: number                // 每周可用时间
  interests: string[]                  // 兴趣领域
  completedTopics: string[]            // 已完成主题
  weakAreas: string[]                  // 薄弱环节
  preferredDifficulty: DifficultyMode  // 难度偏好
  learningHistory: LearningRecord[]    // 学习历史记录
}
\`\`\`

## 最佳实践

### 1. 用户画像配置建议
- **准确评估当前水平**: 建议通过测试题或自评确定真实水平
- **明确学习目标**: 设置具体、可衡量的学习目标
- **合理安排时间**: 根据实际情况设置每周学习时间
- **定期更新画像**: 随着学习进展及时更新用户画像

### 2. 学习路径优化策略
- **循序渐进**: 遵循知识依赖关系，避免跳跃式学习
- **劳逸结合**: 合理安排概念学习和实践练习的比例
- **及时反馈**: 定期检查学习进度，调整路径规划
- **多样化学习**: 结合多种学习资源和方式

### 3. 系统使用技巧
- **充分利用可视化**: 通过知识图谱了解知识结构
- **关注推荐置信度**: 优先选择高置信度的学习路径
- **定期生成报告**: 通过学习报告了解进展和问题
- **积极参与互动**: 利用多模态交互功能提升学习体验

## 故障排除

### 常见问题及解决方案

1. **路径生成失败**
   - 检查是否选择了学习目标
   - 确认用户画像信息完整
   - 重新刷新页面重试

2. **知识图谱显示异常**
   - 调整浏览器缩放比例
   - 清除浏览器缓存
   - 检查网络连接状态

3. **报告生成缓慢**
   - 等待AI分析完成
   - 避免频繁点击生成按钮
   - 检查系统负载情况

4. **导出功能异常**
   - 确认浏览器支持下载功能
   - 检查弹窗拦截设置
   - 尝试不同的导出格式

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 基础学习路径生成功能
- 知识图谱可视化
- 智能报告生成

### v1.1.0 (2024-01-15)
- 新增多模态交互支持
- 优化个性化推荐算法
- 增强用户画像分析
- 改进界面交互体验

### v1.2.0 (2024-02-01)
- 集成情感化交互系统
- 添加协作学习功能
- 支持更多导出格式
- 性能优化和bug修复

## 技术支持

如需技术支持或反馈问题，请联系：
- 邮箱: support@yyc3-easyvizai.com
- 文档: https://docs.yyc3-easyvizai.com
- 社区: https://community.yyc3-easyvizai.com
