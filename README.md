# AIGC START
# EdnaProjects

这是一个包含多个HTML原型项目的仓库。

## 🚀 快速在线预览

### 方法1：GitHub Pages（推荐）

1. 进入GitHub仓库设置：https://github.com/Fengur/EdnaProjects/settings
2. 点击左侧菜单中的 **Pages**
3. 在 **Source** 部分选择 **Deploy from a branch**
4. 在 **Branch** 中选择 **main**，文件夹选择 **/yuanxing**
5. 点击 **Save**

几分钟后，你的网站将在以下地址可用：
- **主页面**：https://fengur.github.io/EdnaProjects/
- **导航页面**：https://fengur.github.io/EdnaProjects/yuanxing/

### 方法2：在线预览服务

如果GitHub Pages暂时不可用，可以使用以下服务：

1. **HTML Preview**：https://htmlpreview.github.io/
   - 将HTML文件拖拽到该网站即可预览

2. **Raw GitHack**：https://raw.githack.com/
   - 将GitHub文件链接转换为可预览的链接

### 方法3：本地预览

```bash
# 克隆仓库
git clone https://github.com/Fengur/EdnaProjects.git
cd EdnaProjects

# 启动本地服务器
python3 -m http.server 8000

# 访问 http://localhost:8000/yuanxing/
```

## 📁 项目结构

```
yuanxing/
├── index.html                    # 导航页面
├── 仓颉大模型平台/               # 仓颉大模型平台项目
│   ├── index.html               # 首页
│   ├── login.html               # 登录页面
│   ├── maas.html                # MaaS服务页面
│   ├── api-docs.html            # API文档
│   ├── about.html               # 关于我们
│   ├── cooperation.html         # 合作页面
│   └── model-detail-qwen72b.html # 模型详情
└── 模型评测榜单/                 # 模型评测榜单项目
    └── 模型评测榜单/
        ├── index.html           # 评测首页
        ├── chat.html            # 聊天评测
        ├── apply.html           # 应用评测
        └── dataset.html         # 数据集评测
```

## 🎨 特色功能

- 📱 响应式设计，支持移动端
- 🎯 现代化UI界面
- 🔗 便捷的导航系统
- ⚡ 快速加载

## 📝 更新日志

- 2024-01-XX：添加GitHub Pages部署配置
- 2024-01-XX：创建项目导航页面
- 2024-01-XX：初始项目上传
# AIGC END
