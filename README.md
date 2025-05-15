# 智能记账 (AccountingLife)  开发中

<div align="center">
  <img src="AccountingLifeApp/assets/icon.png" alt="智能记账 Logo" width="120" height="120" />
  <h3>一款功能强大的个人记账应用</h3>
</div>

## 📱 应用概述

智能记账是一款基于React Native开发的跨平台移动应用，旨在帮助用户轻松管理个人财务、追踪收支、设置预算并获取财务洞察。应用采用了现代化的UI设计和流畅的用户体验，支持深色模式，并提供了丰富的数据可视化功能。

## ✨ 主要功能

- **交易记录管理**：轻松记录日常收支，支持分类、备注和附件
- **数据可视化**：通过饼图和趋势图直观展示财务状况
- **预算管理**：设置和追踪不同类别的预算
- **分类管理**：自定义收支分类，灵活管理财务数据
- **数据导入导出**：支持从微信支付、支付宝导入数据，以及导出为Excel、CSV和PDF格式
- **家庭共享**：与家人共享财务数据，协同管理家庭财务
- **深色模式**：支持浅色/深色主题切换，保护眼睛
- **本地存储**：所有数据存储在本地，保护隐私安全

## 🛠️ 技术栈

- **React Native**：跨平台移动应用开发框架
- **Expo**：简化React Native开发的工具和服务
- **React Navigation**：页面导航管理
- **React Native Paper**：Material Design组件库
- **AsyncStorage**：本地数据持久化存储
- **React Native Vector Icons**：图标库
- **React Native Chart Kit**：数据可视化图表

## 📊 应用截图

<div align="center">
  <img src="screenshots/home.png" alt="首页" width="200" />
  <img src="screenshots/statistics.png" alt="统计" width="200" />
  <img src="screenshots/budget.png" alt="预算" width="200" />
  <img src="screenshots/categories.png" alt="分类" width="200" />
</div>

## 🚀 快速开始

### 前置要求

- Node.js (>= 14.0.0)
- npm 或 yarn
- Expo CLI
- Android模拟器（或实体设备）

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/AccountingLife.git
cd AccountingLife/AccountingLifeApp
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 启动应用

```bash
npm start
# 或
yarn start
```

4. 在模拟器或设备上运行

- 按 `i` 在iOS模拟器上运行
- 按 `a` 在Android模拟器上运行
- 使用Expo Go应用扫描二维码在实体设备上运行

## 📁 项目结构

```
AccountingLifeApp/
├── assets/             # 图片、字体等静态资源
├── components/         # 可复用组件
│   ├── ui/             # 基础UI组件
│   └── ...             # 其他组件
├── constants/          # 常量定义
├── context/            # React Context
├── docs/               # 文档
├── models/             # 数据模型和类型定义
├── navigation/         # 导航配置
├── screens/            # 页面组件
├── services/           # 服务层
├── theme/              # 主题配置
└── utils/              # 工具函数
```

## 🔄 数据导入导出

### 导入数据

应用支持从以下来源导入数据：

- **微信支付账单**：支持导入微信支付导出的账单文件
- **支付宝账单**：支持导入支付宝导出的账单文件
- **Excel文件**：支持导入符合特定格式的Excel文件

### 导出数据

应用支持将数据导出为以下格式：

- **Excel**：包含交易记录、分类、预算和月度统计的完整数据
- **CSV**：简化的交易记录数据
- **PDF**：包含摘要、交易记录和图表的格式化报告

详细的导入导出格式说明请参考 [导出格式文档](AccountingLifeApp/docs/ExportFormat.md)。

## 📝 开发计划

- [ ] 添加云同步功能
- [ ] 实现多币种支持
- [ ] 添加财务目标设置
- [ ] 优化数据分析算法
- [ ] 添加自定义报表功能
- [ ] 支持更多数据导入来源

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎贡献代码、报告问题或提出新功能建议！请先查阅 [贡献指南](CONTRIBUTING.md)。

## 📧 联系方式

如有任何问题或建议，请通过以下方式联系我：

- 电子邮件：<douzhanshengyan@gmail.com>
- GitHub Issues：[提交问题](https://github.com/DOUZHANSHENGYANG/AccountingLife/issues)

---

<div align="center">
  <p>© 2025 DOUZHANSHENGYANG 保留所有权利.</p>
</div>
