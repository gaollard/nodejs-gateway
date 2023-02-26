import { IConfig } from "../types/IConfigItem";

// !TODO 目前仅仅支持前缀匹配
function mathRewrite(_reg: string, value: string, url: string) {
  let reg = new RegExp(_reg);
  if (url.match(reg)) {
    return value + url.substr(_reg.length);
  }
  return url;
}

// 目前仅仅支持前缀匹配
function proxyReqPathResolver(item: IConfig, req: any) {
  if (!item.rewrite) {
    return req.url;
  }

  let key,
    reg,
    keys = Object.keys(item.rewrite);

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    reg = new RegExp(item.rewrite[key]);
    if (req.url.match(reg)) {
      return item.rewrite[key] + req.url.substr(key.length);
    }
  }

  return req.url;
}
