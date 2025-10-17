const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// 链接转换 API
app.post('/api/convert', (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: '请提供京东链接' });
    }

    // 解析 URL
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      return res.status(400).json({ error: '无效的链接格式' });
    }

    // 检查是否是京东链接
    if (!parsedUrl.hostname.includes('jd.com')) {
      return res.status(400).json({ error: '请提供京东链接' });
    }

    // 提取路径（包含活动 ID）
    const pathname = parsedUrl.pathname;

    // 生成新的时间戳
    const timestamp = Date.now();

    // 构建转换后的链接
    const convertedUrl = `https://h5static.m.jd.com${pathname}?_ts=dc_${timestamp}`;

    res.json({
      success: true,
      original: url,
      converted: convertedUrl,
      activityId: pathname.split('/')[3] || 'unknown'
    });

  } catch (error) {
    console.error('转换失败:', error);
    res.status(500).json({ error: '转换失败: ' + error.message });
  }
});

// 批量转换 API
app.post('/api/batch-convert', (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: '请提供链接数组' });
    }

    const results = urls.map(url => {
      try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const timestamp = Date.now();
        const convertedUrl = `https://h5static.m.jd.com${pathname}?_ts=dc_${timestamp}`;

        return {
          success: true,
          original: url,
          converted: convertedUrl
        };
      } catch (e) {
        return {
          success: false,
          original: url,
          error: '无效的链接'
        };
      }
    });

    res.json({
      success: true,
      count: results.length,
      results: results
    });

  } catch (error) {
    console.error('批量转换失败:', error);
    res.status(500).json({ error: '批量转换失败: ' + error.message });
  }
});

// 本地开发时启动服务器
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✓ 服务运行在 http://localhost:${PORT}`);
  });
}

// 导出给 Vercel Serverless
module.exports = app;
