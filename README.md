## nodejs-gateway
nodejs 应用网关

### 1. 特性介绍
- path 重写
- header 配置

```json
{
  "path": "/api",
  "target": "http://localhost:3001",
  "rewrite": {
    "^/api/v1": "/v1",
    "^/api/v2": "/v2"
  },
  "headers": {
    "power-by": "nodejs-gateway"
  }
}
```

### 2. path 重写
- rewrite path `'^/old/api' : '/new/api'`
- remove path `'^/remove/api' : ''`
- add base path `{'^/' : '/base_path/'}`

### 3. header 配置
- 支持增加以及修改，不支持删除