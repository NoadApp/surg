'use strict';
const ini = require('ini');
module.exports = config => {
  const surge = ini.parse(config);
  const surg = {};
  // General parse
  surg.General = surge.General;
  // Proxy parse
  surg.Proxy = [];
  const proxyKeys = Object.keys(surge.Proxy);
  for (let key of proxyKeys) {
    const proxyConfig = surge.Proxy[key].split(',');
    if (proxyConfig.length < 3) break;
    const proxy = {
      type: proxyConfig[0]
    };
    switch (proxy.type) {
      case 'custom':
      case 'socks5':
      case 'http':
      case 'https':
        proxy.name = key;
        proxy.server = proxyConfig[1];
        proxy.port = proxyConfig[2];
        if (proxyConfig.length >= 5) {
          proxy.username = proxyConfig[3];
          proxy.password = proxyConfig[4];
        }
        if (proxyConfig.length >= 6) proxy.module = proxyConfig[5];
        surg.Proxy.push(proxy);
        break;
    }
  }
  // Rule parse
  surg.Rule = [];
  const ruleKeys = Object.keys(surge.Rule);
  for (let key of ruleKeys) {
    const ruleConfig = key.split(',');
    if (ruleConfig.length < 2) break;
    const rule = {
      type: ruleConfig[0]
    };
    switch (rule.type) {
      case 'DOMAIN-SUFFIX':
      case 'DOMAIN-KEYWORD':
      case 'DOMAIN':
      case 'GEOIP':
      case 'IP-CIDR':
        if (ruleConfig.length < 3) break;
        rule.value = ruleConfig[1];
        rule.policy = ruleConfig[2];
        surg.Rule.push(rule);
        break;
      case 'FINAL':
        rule.policy = ruleConfig[1];
        surg.FINAL = rule;
    }
  }
  return surg;
};
