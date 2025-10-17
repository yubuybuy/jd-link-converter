# 京东领券链接转换工具 🎁

一键转换京东推广链接为纯净领券链接，去除所有推广参数，点击即可领取优惠券。

## ✨ 功能特点

- 🔗 **自动去除推广参数** - 去除 utm_*, gxd, gx, rid 等所有推广参数
- 🎯 **一键点亮领券** - 转换后的链接点击即可领取，无需多次点击
- 📦 **支持批量转换** - 一次性转换多个链接
- 📋 **快速复制** - 一键复制转换后的链接
- 🚀 **极速转换** - 毫秒级响应

## 🎬 使用方法

### 单个链接转换

1. 复制京东推广链接
2. 粘贴到输入框
3. 点击"立即转换"
4. 复制转换后的纯净链接

### 批量转换

1. 复制多个京东推广链接
2. 粘贴到文本框（每行一个）
3. 点击"批量转换"
4. 一键复制所有转换后的链接

## 📝 转换示例

**原始推广链接：**
```
https://pro.m.jd.com/mall/active/4DMKncedT4nRR9RnEdwf9xmXhRRC/index.html?utm_user=plusmember&_ts=1759024546267&ad_od=share&gxd=RnAowmYKPGXfnp4Sq4B_W578vOMp4E7JgUugKDcomXTOIlSPI-BCnvuytD0G7kc&gx=RnAomTM2bjKMyckW-Y10D0A7T-Z3_Ys&rid=32040&cu=true&utm_source=lianmeng__10__kong&utm_medium=jingfen&utm_campaign=t_1001868668_&utm_term=b357cc894d004dfab39819e9c891cc9a
```

**转换后纯净链接：**
```
https://h5static.m.jd.com/mall/active/4DMKncedT4nRR9RnEdwf9xmXhRRC/index.html?_ts=dc_1760634385862
```

## 🔧 转换规则

1. 域名转换：`pro.m.jd.com` → `h5static.m.jd.com`
2. 保留活动 ID 路径：`/mall/active/活动ID/index.html`
3. 只保留必要参数：`_ts=dc_时间戳`
4. 去除所有推广参数

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动服务
npm start

# 访问
http://localhost:3000
```

## 📦 部署

### Vercel 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/你的用户名/jd-link-converter)

### 手动部署

1. Fork 本项目
2. 在 Vercel 导入项目
3. 点击部署
4. 完成！

## 🛠️ 技术栈

- **后端**: Node.js + Express
- **前端**: 纯 HTML + CSS + JavaScript
- **部署**: Vercel Serverless

## 📄 API 文档

### 单个链接转换

**POST** `/api/convert`

```json
{
  "url": "https://pro.m.jd.com/mall/active/..."
}
```

**响应：**
```json
{
  "success": true,
  "original": "原始链接",
  "converted": "转换后链接",
  "activityId": "活动ID"
}
```

### 批量链接转换

**POST** `/api/batch-convert`

```json
{
  "urls": [
    "https://pro.m.jd.com/mall/active/...",
    "https://pro.m.jd.com/mall/active/..."
  ]
}
```

**响应：**
```json
{
  "success": true,
  "count": 2,
  "results": [
    {
      "success": true,
      "original": "原始链接",
      "converted": "转换后链接"
    }
  ]
}
```

## ⚠️ 注意事项

- 转换后的链接有效期与原始活动有效期一致
- 部分活动可能需要登录京东账号才能领取
- 建议在活动有效期内使用转换后的链接

## 📝 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⭐ 如果觉得有用，请给个 Star！
