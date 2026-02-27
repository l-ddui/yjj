// 使用 import 替代 require
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 10086;

// 中间件：解析 JSON 请求体
app.use(express.json());

// 处理登录后的 token 存储
app.post('/save-token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    // 将 token 写入文件
    const filePath = path.join(process.cwd(), 'tokens.txt'); // 使用 process.cwd() 获取当前工作目录
    fs.appendFileSync(filePath, `${token}\n`);

    res.status(200).json({ message: 'Token saved successfully' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
