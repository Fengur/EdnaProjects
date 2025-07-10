// 测试函数 - 验证JavaScript是否正常加载
window.testFunction = function() {
    console.log('JavaScript文件已正常加载');
    alert('JavaScript文件已正常加载');
};

// API申请弹窗函数
window.showApiApplyModal = function() {
    console.log('showApiApplyModal 被调用');
    const modal = document.getElementById('api-apply-modal');
    console.log('找到的modal元素:', modal);
    if (modal) {
        modal.style.display = 'block';
        console.log('弹窗已显示');
    } else {
        console.error('未找到api-apply-modal元素');
        alert('弹窗元素未找到');
    }
};

window.closeApiApplyModal = function() {
    const modal = document.getElementById('api-apply-modal');
    if (modal) {
        modal.style.display = 'none';
        // 清空表单
        document.getElementById('api-apply-form').reset();
    }
};

window.submitApiApply = function() {
    // 获取表单数据
    const phone = document.getElementById('apply-phone').value;
    const email = document.getElementById('apply-email').value;
    const organization = document.getElementById('apply-organization').value;
    const accountType = document.querySelector('input[name="account-type"]:checked').value;
    const purpose = document.getElementById('apply-purpose').value;
    
    // 验证必填字段
    if (!phone || !email || !organization || !purpose) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('请输入有效的邮箱地址');
        return;
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert('请输入有效的手机号码');
        return;
    }
    
    // 根据账号类型显示不同的提示
    if (accountType === 'trial') {
        alert('申请已提交！申请通过后将会以邮件形式发送给您，请查收～');
    } else if (accountType === 'formal') {
        alert('申请已提交！我们的商务团队将会尽快联系您，请注意接听电话。');
    }
    
    // 关闭弹窗
    closeApiApplyModal();
    
    // 这里可以添加实际的表单提交逻辑
    console.log('API申请数据:', {
        phone,
        email,
        organization,
        accountType,
        purpose
    });
};

// 全局函数定义
window.showModelDetail = function(modelId, icon, name, tags, publisher, introduction) {
    console.log('=== showModelDetail 开始执行 ===');
    console.log('参数:', {modelId, icon, name, tags, publisher, introduction});
    
    // 存储当前模型ID
    window.currentModelId = modelId;
    
    // 查找元素
    const modelsGrid = document.querySelector('.models-grid');
    const sectionHeader = document.querySelector('.section-header');
    const searchFilter = document.querySelector('.search-filter');
    const detailSection = document.getElementById('model-detail');
    
    console.log('找到的元素:', {
        modelsGrid: !!modelsGrid,
        sectionHeader: !!sectionHeader,
        searchFilter: !!searchFilter,
        detailSection: !!detailSection
    });
    
    // 如果找不到详情区域，直接返回
    if (!detailSection) {
        console.error('详情区域未找到');
        alert('详情区域未找到，请检查HTML结构');
        return;
    }
    
    // 隐藏其他区域
    if (modelsGrid) modelsGrid.style.display = 'none';
    if (sectionHeader) sectionHeader.style.display = 'none';
    if (searchFilter) searchFilter.style.display = 'none';
    
    // 显示详情区域
    detailSection.style.display = 'block';
    console.log('详情区域已显示');
    
    // 设置模型信息
    const iconElement = document.getElementById('detail-model-icon');
    const nameElement = document.getElementById('detail-model-name');
    const publisherElement = document.getElementById('detail-model-publisher');
    const introductionElement = document.getElementById('detail-model-introduction');
    
    console.log('找到的信息元素:', {
        iconElement: !!iconElement,
        nameElement: !!nameElement,
        publisherElement: !!publisherElement,
        introductionElement: !!introductionElement
    });
    
    if (iconElement) iconElement.textContent = icon;
    if (nameElement) nameElement.textContent = name;
    if (publisherElement) publisherElement.textContent = publisher;
    if (introductionElement) introductionElement.textContent = introduction;
    
    // 设置标签
    const tagsContainer = document.getElementById('detail-model-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
    }
    
    // 初始化版本显示
    setTimeout(() => {
        const versions = getModelVersions(modelId);
        displayVersionNames(versions);
        
        // 默认显示第一个版本
        if (versions.length > 0) {
            showVersionDetail(versions[0].id);
        }
    }, 100);
    
    // 绑定详情标签切换事件
    bindDetailTabs();
    console.log('=== showModelDetail 执行完成 ===');
};

window.getModelVersions = function(modelId) {
    const versionData = {
        'cangjie8b': [
            {
                name: '仓颉大模型 8B v2.1.0',
                date: '2024-03-15',
                id: 'cangjie-8b-v2.1.0',
                description: '最新稳定版本，优化了推理速度和准确性',
                contextLength: '32K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v2.0.0推理速度提升15%，准确率提升8%',
                features: '新增汽车专业知识库，支持多轮对话优化'
            },
            {
                name: '仓颉大模型 8B v2.0.0',
                date: '2024-01-20',
                id: 'cangjie-8b-v2.0.0',
                description: '首个正式发布版本，具备基础对话和推理能力',
                contextLength: '32K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v1.0.0性能提升显著',
                features: '支持中文对话，汽车领域知识问答'
            },
            {
                name: '仓颉大模型 8B v1.0.0',
                date: '2023-12-01',
                id: 'cangjie-8b-v1.0.0',
                description: '初始版本，基础功能完整',
                contextLength: '16K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0'
            }
        ],
        'cangjie32b': [
            {
                name: '仓颉大模型 32B v1.2.0',
                date: '2024-03-10',
                id: 'cangjie-32b-v1.2.0',
                description: '高性能版本，专为复杂推理任务优化',
                contextLength: '128K tokens',
                mode: '推理模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v1.1.0推理能力提升25%，支持更长上下文',
                features: '新增多模态理解能力，支持图像和文本联合推理'
            },
            {
                name: '仓颉大模型 32B v1.1.0',
                date: '2024-01-15',
                id: 'cangjie-32b-v1.1.0',
                description: '增强推理版本，提升复杂问题解决能力',
                contextLength: '64K tokens',
                mode: '推理模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v1.0.0推理能力提升40%',
                features: '优化汽车技术文档理解，增强专业术语处理'
            },
            {
                name: '仓颉大模型 32B v1.0.0',
                date: '2023-12-15',
                id: 'cangjie-32b-v1.0.0',
                description: '首个32B参数版本，强大的推理能力',
                contextLength: '64K tokens',
                mode: '推理模式',
                openSource: '是',
                license: 'Apache 2.0'
            }
        ],
        'qwen72b': [
            {
                name: '通义千问 Qwen-72B v3.0.0',
                date: '2024-03-20',
                id: 'qwen-72b-v3.0.0',
                description: '最新旗舰版本，实现思考模式和非思考模式的有效融合',
                contextLength: '128K tokens + 8K tokens',
                mode: '混合模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '推理能力显著超过QwQ、通用能力显著超过Qwen2.5-72B-Instruct，达到同规模业界SOTA水平',
                features: '支持思考模式切换，增强多语言理解，优化汽车行业应用'
            },
            {
                name: '通义千问 Qwen-72B v2.5.0',
                date: '2024-01-25',
                id: 'qwen-72b-v2.5.0',
                description: '稳定版本，多语言能力突出',
                contextLength: '128K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v2.0.0多语言能力提升30%',
                features: '支持100+语言，增强汽车专业术语多语言理解'
            },
            {
                name: '通义千问 Qwen-72B v2.0.0',
                date: '2023-12-20',
                id: 'qwen-72b-v2.0.0',
                description: '基础版本，具备强大的通用能力',
                contextLength: '128K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0'
            }
        ],
        'qwen1.8b': [
            {
                name: '通义千问 Qwen-1.8B v2.1.0',
                date: '2024-03-18',
                id: 'qwen-1.8b-v2.1.0',
                description: '轻量级优化版本，适合移动端和边缘计算',
                contextLength: '8K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v2.0.0响应速度提升20%，内存占用减少15%',
                features: '新增量化支持，优化移动端部署，支持离线运行'
            },
            {
                name: '通义千问 Qwen-1.8B v2.0.0',
                date: '2024-01-30',
                id: 'qwen-1.8b-v2.0.0',
                description: '轻量级版本，快速响应',
                contextLength: '8K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v1.0.0速度提升50%',
                features: '优化推理速度，减少资源消耗'
            },
            {
                name: '通义千问 Qwen-1.8B v1.0.0',
                date: '2023-12-10',
                id: 'qwen-1.8b-v1.0.0',
                description: '初始轻量版本',
                contextLength: '8K tokens',
                mode: '对话模式',
                openSource: '是',
                license: 'Apache 2.0'
            }
        ],
        'deepseekv2': [
            {
                name: 'DeepSeek-V2 v2.1.0',
                date: '2024-03-25',
                id: 'deepseek-v2-v2.1.0',
                description: '多模态增强版本，支持图像和文本联合理解',
                contextLength: '256K tokens',
                mode: '多模态模式',
                openSource: '是',
                license: 'MIT',
                performance: '相比v2.0.0多模态理解能力提升35%',
                features: '新增图像识别能力，支持汽车零件图片分析，增强视觉推理'
            },
            {
                name: 'DeepSeek-V2 v2.0.0',
                date: '2024-02-01',
                id: 'deepseek-v2-v2.0.0',
                description: '多模态推理版本',
                contextLength: '256K tokens',
                mode: '多模态模式',
                openSource: '是',
                license: 'MIT',
                performance: '相比v1.0.0推理能力提升60%',
                features: '支持文本和图像输入，适合复杂场景分析'
            },
            {
                name: 'DeepSeek-V2 v1.0.0',
                date: '2023-12-25',
                id: 'deepseek-v2-v1.0.0',
                description: '初始多模态版本',
                contextLength: '256K tokens',
                mode: '多模态模式',
                openSource: '是',
                license: 'MIT'
            }
        ],
        'deepseekmoe': [
            {
                name: 'DeepSeek-MoE v1.3.0',
                date: '2024-03-22',
                id: 'deepseek-moe-v1.3.0',
                description: '高效推理版本，MoE架构优化',
                contextLength: '128K tokens',
                mode: '高效模式',
                openSource: '是',
                license: 'MIT',
                performance: '相比v1.2.0推理效率提升40%，支持更高并发',
                features: '优化专家路由，新增动态负载均衡，支持大规模部署'
            },
            {
                name: 'DeepSeek-MoE v1.2.0',
                date: '2024-02-15',
                id: 'deepseek-moe-v1.2.0',
                description: 'MoE架构稳定版本',
                contextLength: '128K tokens',
                mode: '高效模式',
                openSource: '是',
                license: 'MIT',
                performance: '相比v1.0.0效率提升80%',
                features: 'Mixture-of-Experts架构，推理高效'
            },
            {
                name: 'DeepSeek-MoE v1.0.0',
                date: '2023-12-30',
                id: 'deepseek-moe-v1.0.0',
                description: '首个MoE架构版本',
                contextLength: '128K tokens',
                mode: '高效模式',
                openSource: '是',
                license: 'MIT'
            }
        ],
        'glm4': [
            {
                name: '智谱GLM-4 v2.0.0',
                date: '2024-03-28',
                id: 'glm-4-v2.0.0',
                description: '最新通用大模型，代码生成能力突出',
                contextLength: '128K tokens',
                mode: '通用模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v1.5.0代码生成能力提升45%，推理能力提升30%',
                features: '增强代码理解，支持多种编程语言，优化汽车软件开发场景'
            },
            {
                name: '智谱GLM-4 v1.5.0',
                date: '2024-02-20',
                id: 'glm-4-v1.5.0',
                description: '代码生成增强版本',
                contextLength: '128K tokens',
                mode: '通用模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v1.0.0代码生成能力提升60%',
                features: '支持Python、JavaScript、Java等多种编程语言'
            },
            {
                name: '智谱GLM-4 v1.0.0',
                date: '2024-01-10',
                id: 'glm-4-v1.0.0',
                description: '初始通用版本',
                contextLength: '128K tokens',
                mode: '通用模式',
                openSource: '是',
                license: 'Apache 2.0'
            }
        ],
        'qianfan': [
            {
                name: '千帆文心一言 v3.2.0',
                date: '2024-03-30',
                id: 'qianfan-wenxin-v3.2.0',
                description: '百度千帆平台最新主力大模型',
                contextLength: '128K tokens',
                mode: '多语言模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v3.1.0多语言能力提升25%，知识问答准确率提升15%',
                features: '支持50+语言，增强汽车专业知识库，优化内容生成质量'
            },
            {
                name: '千帆文心一言 v3.1.0',
                date: '2024-02-25',
                id: 'qianfan-wenxin-v3.1.0',
                description: '多语言能力增强版本',
                contextLength: '128K tokens',
                mode: '多语言模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v3.0.0多语言理解能力提升40%',
                features: '支持多语言对话，增强跨语言知识迁移'
            },
            {
                name: '千帆文心一言 v3.0.0',
                date: '2024-01-20',
                id: 'qianfan-wenxin-v3.0.0',
                description: '基础多语言版本',
                contextLength: '128K tokens',
                mode: '多语言模式',
                openSource: '是',
                license: 'Apache 2.0'
            }
        ],
        'glm4code': [
            {
                name: '智谱GLM-4 Code v2.1.0',
                date: '2024-03-25',
                id: 'glm-4-code-v2.1.0',
                description: '专业代码生成模型，专注于开发场景',
                contextLength: '128K tokens',
                mode: '代码模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v2.0.0代码生成质量提升35%，支持更多编程语言',
                features: '新增汽车软件开发专用代码库，支持车载系统开发，增强代码审查能力'
            },
            {
                name: '智谱GLM-4 Code v2.0.0',
                date: '2024-02-28',
                id: 'glm-4-code-v2.0.0',
                description: '代码生成专业版本',
                contextLength: '128K tokens',
                mode: '代码模式',
                openSource: '是',
                license: 'Apache 2.0',
                performance: '相比v1.0.0代码生成能力提升80%',
                features: '支持Python、C++、Java、JavaScript等主流语言'
            },
            {
                name: '智谱GLM-4 Code v1.0.0',
                date: '2024-01-15',
                id: 'glm-4-code-v1.0.0',
                description: '初始代码生成版本',
                contextLength: '128K tokens',
                mode: '代码模式',
                openSource: '是',
                license: 'Apache 2.0'
            }
        ]
    };
    
    return versionData[modelId] || [];
};

window.selectVersion = function(modelId, versionId) {
    console.log('选择版本:', modelId, versionId);
    // 这里可以添加跳转到体验中心的逻辑
    alert(`已选择 ${modelId} 的 ${versionId} 版本`);
};

window.showModelGrid = function() {
    const modelsGrid = document.querySelector('.models-grid');
    const sectionHeader = document.querySelector('.section-header');
    const searchFilter = document.querySelector('.search-filter');
    const detailSection = document.getElementById('model-detail');
    
    if (modelsGrid) modelsGrid.style.display = 'grid';
    if (sectionHeader) sectionHeader.style.display = 'block';
    if (searchFilter) searchFilter.style.display = 'block';
    if (detailSection) detailSection.style.display = 'none';
};

// 版本管理功能 - 全局函数
window.showVersionDetail = function(versionId) {
    const currentModelId = window.currentModelId;
    if (!currentModelId) return;
    
    const versions = getModelVersions(currentModelId);
    const selectedVersion = versions.find(v => v.id === versionId);
    
    if (selectedVersion) {
        displayVersionDetail(selectedVersion);
        
        // 更新版本名称列表的选中状态
        const versionItems = document.querySelectorAll('.version-name-item');
        versionItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.versionId === versionId) {
                item.classList.add('active');
            }
        });
    }
};

window.sortVersions = function() {
    const currentModelId = window.currentModelId;
    if (!currentModelId) return;
    
    const versions = getModelVersions(currentModelId);
    const sortSelect = document.getElementById('version-sort');
    const sortValue = sortSelect.value;
    
    const sortedVersions = sortVersionsBy(versions, sortValue);
    displayVersionNames(sortedVersions);
};

function sortVersionsBy(versions, sortValue) {
    return [...versions].sort((a, b) => {
        switch (sortValue) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });
}

function displayVersionNames(versions) {
    const versionNamesList = document.getElementById('version-names-list');
    const versionCount = document.getElementById('version-count');
    
    console.log('显示版本名称列表:', versions);
    
    if (versionNamesList) {
        versionNamesList.innerHTML = '';
        
        versions.forEach((version, index) => {
            const versionItem = document.createElement('div');
            versionItem.className = 'version-name-item';
            versionItem.dataset.versionId = version.id;
            versionItem.onclick = () => showVersionDetail(version.id);
            versionItem.innerHTML = `
                <div class="version-name">${version.name}</div>
                <div class="version-date">${version.date}</div>
            `;
            versionNamesList.appendChild(versionItem);
        });
    }
    
    if (versionCount) {
        versionCount.textContent = `共 ${versions.length} 个版本`;
    }
}

function displayVersionDetail(version) {
    const detailContent = document.getElementById('version-detail-content');
    
    console.log('显示版本详情:', version);
    
    if (detailContent) {
        detailContent.innerHTML = `
            <div class="version-detail">
                <div class="version-detail-header">
                    <h3>${version.name}</h3>
                    <span class="version-date">${version.date}</span>
                    <button class="select-version-btn" onclick="selectVersion('${window.currentModelId}', '${version.id}')">选择此版本</button>
                </div>
                <div class="version-detail-info">
                    <p><strong>版本说明：</strong>${version.description}</p>
                    <p><strong>版本ID：</strong>${version.id}</p>
                    <p><strong>上下文长度：</strong>${version.contextLength}</p>
                    <p><strong>输入输出模式：</strong>${version.mode}</p>
                    <p><strong>是否开源：</strong>${version.openSource}</p>
                    <p><strong>开源协议：</strong>${version.license}</p>
                    ${version.performance ? `<p><strong>性能提升：</strong>${version.performance}</p>` : ''}
                    ${version.features ? `<p><strong>新增功能：</strong>${version.features}</p>` : ''}
                </div>
            </div>
        `;
    }
}

// 绑定详情标签切换事件
function bindDetailTabs() {
    const tabs = document.querySelectorAll('.detail-tab');
    const panels = document.querySelectorAll('.detail-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // 添加活动状态
            tab.classList.add('active');
            const targetPanel = document.getElementById(targetTab + '-content');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// MaaS平台交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 侧边栏菜单切换
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            menuItems.forEach(mi => mi.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            const targetSection = this.getAttribute('data-section');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // 模型卡片交互 - 只保留立即体验和API参考按钮的事件监听
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        const primaryBtn = card.querySelector('.action-btn.primary');
        const apiBtn = card.querySelectorAll('.action-btn.secondary')[1];
        
        // 立即体验按钮
        primaryBtn.addEventListener('click', function() {
            // 切换到体验中心
            menuItems.forEach(mi => mi.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            document.querySelector('[data-section="experience"]').classList.add('active');
            document.getElementById('experience').classList.add('active');
        });
        
        // API调用按钮
        apiBtn.addEventListener('click', function() {
            const modelName = card.querySelector('h3').textContent;
            showApiInfo(modelName);
        });
    });

    // 聊天功能
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const modelSelect = document.querySelector('.model-select');

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        const paragraph = document.createElement('p');
        paragraph.textContent = content;
        messageContent.appendChild(paragraph);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        // 添加用户消息
        addMessage(message, true);
        chatInput.value = '';
        // 联动高级设置参数
        let config = window.lastConfig || {
            model: modelSelect ? modelSelect.options[modelSelect.selectedIndex].text : '',
            system: '',
            top_p: 0.9,
            temperature: 1.0,
            enable_search: false,
            thinking_budget: 2048,
            max_tokens: 2048,
            presence_penalty: 0.0,
            frequency_penalty: 0.0,
            stream: false,
            user: '',
            stop: []
        };
        // 在实际请求前打印参数
        console.log('对话请求参数:', config);
        // 模拟AI回复
        setTimeout(() => {
            const selectedModel = modelSelect.value;
            const responses = {
                'car-expert': [
                    '根据您的描述，这可能是发动机积碳的问题。建议您检查火花塞和节气门，必要时进行清洗。',
                    '新能源汽车的电池寿命通常在8-10年，具体取决于使用习惯和充电方式。建议避免频繁快充。',
                    '这个故障码通常表示氧传感器问题，建议检查传感器连接和更换损坏的传感器。'
                ],
                'repair-diagnosis': [
                    '根据故障现象，建议按以下步骤检查：1.检查机油液位 2.检查机油质量 3.检查发动机异响',
                    '这个维修项目大约需要2-3小时，费用在800-1200元之间，具体取决于配件价格。',
                    '建议您先检查制动液液位和制动片磨损情况，如果都正常，可能是制动系统有空气。'
                ],
                'data-analysis': [
                    '根据数据分析，您的车辆油耗偏高，建议检查轮胎气压和驾驶习惯。',
                    '从历史数据看，这个故障在冬季出现频率较高，可能与温度有关。',
                    '根据使用模式分析，建议您调整保养周期，当前间隔可能过短。'
                ],
                'multimodal': [
                    '根据您提供的图片，这确实是发动机漏油的问题，建议尽快维修。',
                    '从语音描述和图片来看，这是典型的变速箱故障，需要专业检测。',
                    '综合分析您的描述和图片，建议检查冷却系统，可能是水泵故障。'
                ]
            };
            const modelResponses = responses[selectedModel] || responses['car-expert'];
            const randomResponse = modelResponses[Math.floor(Math.random() * modelResponses.length)];
            addMessage(randomResponse, false);
        }, 1000 + Math.random() * 2000);
    }

    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 高级设置滑块
    const temperatureSlider = document.getElementById('temperature');
    const maxLengthSlider = document.getElementById('max-length');
    const temperatureValue = temperatureSlider.nextElementSibling;
    const maxLengthValue = maxLengthSlider.nextElementSibling;

    temperatureSlider.addEventListener('input', function() {
        temperatureValue.textContent = this.value;
    });

    maxLengthSlider.addEventListener('input', function() {
        maxLengthValue.textContent = this.value;
    });

    // 过滤器标签
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent;
            filterModels(filter);
        });
    });

    function filterModels(filter) {
        const modelCards = document.querySelectorAll('.model-card');
        
        modelCards.forEach(card => {
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
            
            if (filter === '全部' || tags.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // AppKey管理
    const createKeyBtn = document.querySelector('.create-key-btn');
    const appkeyItems = document.querySelectorAll('.appkey-item');

    createKeyBtn.addEventListener('click', function() {
        showCreateKeyModal();
    });

    appkeyItems.forEach(item => {
        const copyBtn = item.querySelector('.action-btn');
        const editBtn = item.querySelectorAll('.action-btn')[1];
        const deleteBtn = item.querySelector('.action-btn.danger');
        
        copyBtn.addEventListener('click', function() {
            const keyValue = item.querySelector('.key-value').textContent;
            navigator.clipboard.writeText(keyValue).then(() => {
                showToast('Key已复制到剪贴板', 'success');
            });
        });
        
        editBtn.addEventListener('click', function() {
            const keyName = item.querySelector('.key-name').textContent;
            showEditKeyModal(keyName);
        });
        
        deleteBtn.addEventListener('click', function() {
            const keyName = item.querySelector('.key-name').textContent;
            showDeleteConfirm(keyName, item);
        });
    });

    // 搜索功能
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const container = this.closest('.content-section');
            
            if (container.id === 'models') {
                searchModels(searchTerm);
            } else if (container.id === 'appkey') {
                searchAppKeys(searchTerm);
            }
        });
    });

    function searchModels(term) {
        const modelCards = document.querySelectorAll('.model-card');
        
        modelCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.model-description').textContent.toLowerCase();
            
            if (title.includes(term) || description.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function searchAppKeys(term) {
        const appkeyItems = document.querySelectorAll('.appkey-item');
        
        appkeyItems.forEach(item => {
            const name = item.querySelector('.key-name').textContent.toLowerCase();
            const value = item.querySelector('.key-value').textContent.toLowerCase();
            
            if (name.includes(term) || value.includes(term)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // 模型详情数据
    const MODEL_DETAIL_MAP = {
        '仓颉大模型 8B': {
            logo: '��',
            name: '仓颉大模型 8B',
            tags: ['通用', '对话'],
            source: '仓颉',
            desc: '支持多轮对话、知识问答、文本生成，适用于企业级智能客服、内容创作、行业知识问答等多场景。',
            limit: '',
            versions: [
                {name: 'v2.1.0', desc: '相比v2.0.0性能更好', id: 'amv-5tkhr3d1dkxi', context: '128K tokens + 8K tokens', mode: '对话模式', open: '是', license: 'Apache 2.0', update: '2024-06-01'},
                {name: 'v2.0.0', desc: '基础版本', id: 'amv-5tkhr3d1dkxj', context: '64K tokens', mode: '对话模式', open: '是', license: 'Apache 2.0', update: '2024-05-01'}
            ]
        },
        '通义千问 Qwen-72B': {
            logo: '🤖',
            name: '通义千问 Qwen-72B',
            tags: ['通用', '多语言'],
            source: '通义千问',
            desc: '实现思考模式和非思考模式的有效融合，可在对话中切换模式。推理能力显著超过QwQ、通用能力显著超过Qwen2.5-72B-Instruct，达到同规模业界SOTA水平。',
            limit: '通义千问3-235B-A22B模型来源于第三方，百度智能云千帆大模型平台不保证其合规性，请您在使用前慎重考虑，确保合法合规使用并遵守第三方的要求。使用模型前请在"版本列表"中查看模型的开源协议，了解使用限制。如您发现模型/数据集/文件等有任何问题，请及时联系我们处理。',
            versions: [
                {name: 'A22B', desc: '相比A21B推理能力提升', id: 'amv-qwen-a22b', context: '128K tokens + 8K tokens', mode: '对话模式', open: '是', license: 'Apache 2.0', update: '2024-06-10'},
                {name: 'A21B', desc: '基础版本', id: 'amv-qwen-a21b', context: '64K tokens', mode: '对话模式', open: '是', license: 'Apache 2.0', update: '2024-05-10'}
            ]
        },
        // ... 其他模型 ...
    };

    function handleExperience(modelId) {
        // 判断登录，未登录跳转login.html，已登录跳转体验中心
        const isLogin = window.isLogin || false;
        if(!isLogin){
            window.location.href = 'login.html';
        }else{
            window.location.href = 'experience.html?model=' + encodeURIComponent(modelId);
        }
    }

    function showApiInfo(modelName) {
        const modal = createModal(`
            <h2>${modelName} API</h2>
            <div class="api-info-content">
                <div class="code-block">
                    <h3>请求示例</h3>
                    <pre><code>curl -X POST "https://api.yuanxing.ai/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${modelName.toLowerCase().replace(/\s+/g, '-')}",
    "messages": [
      {"role": "user", "content": "汽车发动机异响怎么办？"}
    ]
  }'</code></pre>
                </div>
                <div class="api-params">
                    <h3>参数说明</h3>
                    <ul>
                        <li><strong>model:</strong> 模型名称</li>
                        <li><strong>messages:</strong> 对话消息数组</li>
                        <li><strong>temperature:</strong> 温度参数 (0-2)</li>
                        <li><strong>max_tokens:</strong> 最大输出长度</li>
                    </ul>
                </div>
            </div>
        `);
        document.body.appendChild(modal);
    }

    function showCreateKeyModal() {
        const modal = createModal(`
            <h2>创建新的API Key</h2>
            <form class="create-key-form">
                <div class="form-group">
                    <label>Key名称</label>
                    <input type="text" placeholder="例如：生产环境Key" required>
                </div>
                <div class="form-group">
                    <label>权限设置</label>
                    <div class="permissions">
                        <label><input type="checkbox" checked> 读取权限</label>
                        <label><input type="checkbox" checked> 写入权限</label>
                        <label><input type="checkbox"> 管理权限</label>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal').remove()">取消</button>
                    <button type="submit" class="btn-primary">创建</button>
                </div>
            </form>
        `);
        document.body.appendChild(modal);
    }

    function showEditKeyModal(keyName) {
        const modal = createModal(`
            <h2>编辑API Key</h2>
            <form class="edit-key-form">
                <div class="form-group">
                    <label>Key名称</label>
                    <input type="text" value="${keyName}" required>
                </div>
                <div class="form-group">
                    <label>状态</label>
                    <select>
                        <option>活跃</option>
                        <option>禁用</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal').remove()">取消</button>
                    <button type="submit" class="btn-primary">保存</button>
                </div>
            </form>
        `);
        document.body.appendChild(modal);
    }

    function showDeleteConfirm(keyName, item) {
        const modal = createModal(`
            <h2>确认删除</h2>
            <p>您确定要删除 "${keyName}" 吗？此操作不可撤销。</p>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="this.closest('.modal').remove()">取消</button>
                <button type="button" class="btn-danger" onclick="deleteKey('${keyName}', this)">删除</button>
            </div>
        `);
        document.body.appendChild(modal);
    }

    function createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                ${content}
            </div>
        `;
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
        });
        
        return modal;
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        
        toast.style.background = colors[type] || colors.info;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // 全局函数
    window.deleteKey = function(keyName, button) {
        // 模拟删除操作
        showToast(`${keyName} 已删除`, 'success');
        button.closest('.modal').remove();
        
        // 在实际应用中，这里会调用API删除key
        // 然后从DOM中移除对应的元素
    };

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            z-index: 1;
        }
        
        .modal-content h2 {
            margin-bottom: 20px;
            color: #1E293B;
        }
        
        .form-group {
            margin-bottom: 16px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #374151;
        }
        
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #E2E8F0;
            border-radius: 6px;
            font-size: 14px;
        }
        
        .permissions {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .permissions label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: normal;
        }
        
        .form-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 24px;
        }
        
        .btn-primary,
        .btn-secondary,
        .btn-danger {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #1E40AF;
            color: white;
        }
        
        .btn-secondary {
            background: #F1F5F9;
            color: #64748B;
        }
        
        .btn-danger {
            background: #EF4444;
            color: white;
        }
        
        .model-detail-content,
        .api-info-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .detail-section h3 {
            margin-bottom: 12px;
            color: #1E293B;
        }
        
        .detail-section ul {
            padding-left: 20px;
        }
        
        .detail-section li {
            margin-bottom: 4px;
            color: #64748B;
        }
        
        .code-block {
            background: #F8FAFC;
            border-radius: 8px;
            padding: 16px;
        }
        
        .code-block pre {
            margin: 0;
            overflow-x: auto;
        }
        
        .code-block code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #1E293B;
        }
        
        .api-params ul {
            list-style: none;
            padding: 0;
        }
        
        .api-params li {
            margin-bottom: 8px;
            color: #64748B;
        }
    `;
    document.head.appendChild(style);

    // 高级配置弹窗交互注册
    window.openConfigModal = function(modelName) {
        // 联动体验中心模型选择
        if (!modelName) {
            var select = document.querySelector('.model-select');
            if (select) modelName = select.options[select.selectedIndex].text;
        }
        document.getElementById('config-model-name').textContent = modelName || '—';
        document.getElementById('config-system').value = '';
        document.getElementById('config-top_p').value = 0.9;
        document.getElementById('slider-top_p').value = 0.9;
        document.getElementById('config-temperature').value = 1.0;
        document.getElementById('slider-temperature').value = 1.0;
        document.getElementById('config-enable_search').checked = false;
        document.getElementById('config-thinking_budget').value = 2048;
        document.getElementById('slider-thinking_budget').value = 2048;
        document.getElementById('config-max_tokens').value = 2048;
        document.getElementById('slider-max_tokens').value = 2048;
        document.getElementById('config-presence_penalty').value = 0.0;
        document.getElementById('slider-presence_penalty').value = 0.0;
        document.getElementById('config-frequency_penalty').value = 0.0;
        document.getElementById('slider-frequency_penalty').value = 0.0;
        document.getElementById('config-stream').checked = false;
        document.getElementById('config-user').value = '';
        document.getElementById('stop-list').innerHTML = '';
        addStopItem();
        document.getElementById('advanced-config-modal').style.display = 'block';
    };
    window.closeConfigModal = function() {
        document.getElementById('advanced-config-modal').style.display = 'none';
    };
    window.confirmConfigModal = function() {
        document.getElementById('advanced-config-modal').style.display = 'none';
        // 保存配置到window.lastConfig
        window.lastConfig = {
            model: document.getElementById('config-model-name').textContent,
            system: document.getElementById('config-system').value,
            top_p: parseFloat(document.getElementById('config-top_p').value),
            temperature: parseFloat(document.getElementById('config-temperature').value),
            enable_search: document.getElementById('config-enable_search').checked,
            thinking_budget: parseInt(document.getElementById('config-thinking_budget').value),
            max_tokens: parseInt(document.getElementById('config-max_tokens').value),
            presence_penalty: parseFloat(document.getElementById('config-presence_penalty').value),
            frequency_penalty: parseFloat(document.getElementById('config-frequency_penalty').value),
            stream: document.getElementById('config-stream').checked,
            user: document.getElementById('config-user').value,
            stop: Array.from(document.querySelectorAll('#stop-list input')).map(i=>i.value).filter(Boolean)
        };
        showToast('已设置', 'success');
    };
    window.addStopItem = function(val) {
        const list = document.getElementById('stop-list');
        const div = document.createElement('div');
        div.className = 'stop-item';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.marginBottom = '4px';
        div.innerHTML = `<input type='text' maxlength='20' value='${val||''}' style='width:140px;margin-right:4px;'><button type='button' class='action-btn secondary' style='padding:2px 8px;margin-left:2px;' onclick='this.parentNode.remove()'>删除</button>`;
        list.appendChild(div);
    };
    // 联动滑动条与输入框
    function bindSliderInput(id1, id2, min, max) {
        document.getElementById(id1).addEventListener('input', function(){
            let v = this.value;
            if (min!==undefined && parseFloat(v)<min) v=min;
            if (max!==undefined && parseFloat(v)>max) v=max;
            this.value = v;
            document.getElementById(id2).value = v;
        });
        document.getElementById(id2).addEventListener('input', function(){
            let v = this.value;
            if (min!==undefined && parseFloat(v)<min) v=min;
            if (max!==undefined && parseFloat(v)>max) v=max;
            this.value = v;
            document.getElementById(id1).value = v;
        });
    }
    bindSliderInput('config-top_p', 'slider-top_p', 0.0001, 1);
    bindSliderInput('config-temperature', 'slider-temperature', 0, 1.9999);
    bindSliderInput('config-thinking_budget', 'slider-thinking_budget', 1, 32768);
    bindSliderInput('config-max_tokens', 'slider-max_tokens', 1, 32768);
    bindSliderInput('config-presence_penalty', 'slider-presence_penalty', -2, 2);
    bindSliderInput('config-frequency_penalty', 'slider-frequency_penalty', -2, 2);
}); 