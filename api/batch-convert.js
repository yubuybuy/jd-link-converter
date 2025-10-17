module.exports = (req, res) => {
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

    res.status(200).json({
      success: true,
      count: results.length,
      results: results
    });

  } catch (error) {
    console.error('批量转换失败:', error);
    res.status(500).json({ error: '批量转换失败: ' + error.message });
  }
};
