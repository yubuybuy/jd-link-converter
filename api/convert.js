export default async function handler(req, res) {
  // 设置 CORS 和 Content-Type
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

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

    res.status(200).json({
      success: true,
      original: url,
      converted: convertedUrl,
      activityId: pathname.split('/')[3] || 'unknown'
    });

  } catch (error) {
    console.error('转换失败:', error);
    res.status(500).json({ error: '转换失败: ' + error.message });
  }
}
