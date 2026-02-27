const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 35684;

// 中间件：解析 JSON 请求体
app.use(express.json());

// 定义 token 存储路径
const TOKEN_DIR = path.join(__dirname, 'tokens');

// 确保 tokens 目录存在
if (!fs.existsSync(TOKEN_DIR)) {
    fs.mkdirSync(TOKEN_DIR, { recursive: true });
}

// 接口：保存 token
app.post('/save-token', (req, res) => {
    const { userId, token } = req.body;

    if (!userId || !token) {
        return res.status(400).json({ error: '缺少 userId 或 token' });
    }

    const tokenFilePath = path.join(TOKEN_DIR, `${userId}.txt`);
    fs.writeFileSync(tokenFilePath, token, 'utf8');

    res.json({ message: 'Token 保存成功' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`本地服务器运行在 http://localhost:${PORT}`);
});
