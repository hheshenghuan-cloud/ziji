/**
 * FlClash / Mihomo 配置脚本
 * 用法：在 FlClash 的脚本配置中导入本文件，然后将其应用到订阅配置。
 * 脚本接收订阅解析后的配置对象，并返回修改后的配置对象。
 * 已加入链式代理：设备 -> 链式前置 -> 链式出口 -> 网站。
 * 在两个链式组分别选择节点，再让默认代理或应用策略组选择“链式出口”。
 * 前置和出口均有 PNG 图标，固定放在所有策略组最底部。
 */
function main(config) {
  config = config || {};

  Object.assign(config, {
    'mixed-port': 7890,
    'socks-port': 7891,
    'redir-port': 7892,
    port: 7893,
    'tproxy-port': 7894,
    'allow-lan': true,
    'bind-address': '*',
    ipv6: false,
    'unified-delay': true,
    'tcp-concurrent': true,
    'log-level': 'warning',
    'keep-alive-idle': 600,
    'keep-alive-interval': 15,
    'external-controller': '0.0.0.0:9090',
    secret: 'diyhh',
    profile: {
      'store-selected': true,
      'store-fake-ip': true
    },
    sniffer: {
      enable: true,
      'force-dns-mapping': false,
      'parse-pure-ip': true,
      sniff: {
        HTTP: {
          ports: [80, '8080-8880'],
          'override-destination': false
        },
        TLS: {
          ports: [443, 8443],
          'override-destination': false
        },
        QUIC: {
          ports: [443, 8443],
          'override-destination': false
        }
      },
      'skip-domain': ['Mijia Cloud', '+.push.apple.com', 'mtalk.google.com']
    },
    tun: {
      enable: true,
      stack: 'mixed',
      'dns-hijack': ['any:53', 'tcp://any:53']
    },
    dns: {
      enable: true,
      'cache-algorithm': 'arc',
      listen: '0.0.0.0:1053',
      ipv6: false,
      'respect-rules': true,
      'enhanced-mode': 'fake-ip',
      'fake-ip-range': '198.18.0.1/16',
      'fake-ip-filter-mode': 'blacklist',
      'direct-nameserver-follow-policy': true,
      'nameserver-policy': {
        'rule-set:googlefcm': ['https://8.8.8.8/dns-query']
      },
      'default-nameserver': ['https://223.5.5.5/dns-query'],
      'proxy-server-nameserver': ['https://dns.alidns.com/dns-query', 'https://doh.pub/dns-query'],
      'direct-nameserver': ['https://dns.alidns.com/dns-query', 'https://doh.pub/dns-query'],
      nameserver: ['https://8.8.8.8/dns-query', 'https://1.1.1.1/dns-query'],
      'fake-ip-filter': ['+.push.apple.com', 'mtalk.google.com', 'rule-set:fakeipfilter_domain']
    },
    'proxy-groups': [
      {name: '默认代理', type: 'select', 'include-all': true, proxies: ['DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Rocket.png'},
      {name: 'YouTube', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png'},
      {name: 'Google', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png'},
      {name: 'GoogleFCM', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Rocket.png'},
      {name: 'ChatGPT', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ChatGPT.png'},
      {name: 'GitHub', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/GitHub.png'},
      {name: 'OneDrive', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/OneDrive.png'},
      {name: 'Microsoft', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png'},
      {name: 'TikTok', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TikTok.png'},
      {name: 'APPLE', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple.png'},
      {name: 'Telegram', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png'},
      {name: 'NETFLIX', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Netflix.png'},
      {name: 'Disney', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Disney%2B.png'},
      {name: '国内网络', type: 'select', 'include-all': true, proxies: ['DIRECT', '默认代理'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png'},
      {name: '漏网之鱼', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png'}
    ],
    rules: [
      'PROCESS-NAME,com.tencent.ig,默认代理',
      'RULE-SET,ziji,默认代理',
      'RULE-SET,private_ip,国内网络,no-resolve',
      'RULE-SET,private_domain,国内网络',
      'RULE-SET,cn_domain,国内网络',
      'RULE-SET,cn_ip,国内网络',
      'RULE-SET,zijign,国内网络',
      'RULE-SET,googlefcm,GoogleFCM',
      'RULE-SET,fakeipfilter_domain,国内网络',
      'RULE-SET,ai,ChatGPT',
      'RULE-SET,github_domain,GitHub',
      'RULE-SET,youtube_domain,YouTube',
      'RULE-SET,google_domain,Google',
      'RULE-SET,onedrive_domain,OneDrive',
      'RULE-SET,microsoft_domain,Microsoft',
      'RULE-SET,apple_domain,APPLE',
      'RULE-SET,tiktok_domain,TikTok',
      'RULE-SET,telegram_domain,Telegram',
      'RULE-SET,netflix_domain,NETFLIX',
      'RULE-SET,disney_domain,Disney',
      'RULE-SET,apple_ip,APPLE',
      'RULE-SET,google_ip,Google',
      'RULE-SET,netflix_ip,NETFLIX',
      'RULE-SET,telegram_ip,Telegram',
      'RULE-SET,proxylite,默认代理',
      'RULE-SET,geolocation-!cn,默认代理',
      'MATCH,漏网之鱼'
    ],
    'rule-providers': {
      ziji: {type: 'http', interval: 86400, behavior: 'domain', format: 'yaml', url: 'https://raw.githubusercontent.com/hheshenghuan-cloud/ziji/main/ziji.yaml'},
      zijign: {type: 'http', interval: 86400, behavior: 'domain', format: 'yaml', url: 'https://raw.githubusercontent.com/hheshenghuan-cloud/ziji/main/zijign.yaml'},
      googlefcm: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/googlefcm.mrs'},
      fakeipfilter_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/DustinWin/ruleset_geodata/mihomo-ruleset/fakeip-filter.mrs'},
      private_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs'},
      proxylite: {type: 'http', interval: 86400, behavior: 'classical', format: 'text', url: 'https://raw.githubusercontent.com/qichiyuhub/rule/main/rules/proxy.list'},
      ai: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.mrs'},
      youtube_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs'},
      google_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs'},
      github_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs'},
      telegram_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs'},
      netflix_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs'},
      onedrive_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/onedrive.mrs'},
      microsoft_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs'},
      apple_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs'},
      speedtest_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/ookla-speedtest.mrs'},
      tiktok_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs'},
      'geolocation-!cn': {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs'},
      cn_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs'},
      disney_domain: {type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/GitMetaio/rule/refs/heads/master/rule/Clash/Disney/Disney_OCD_Domain.mrs'},
      private_ip: {type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/private.mrs'},
      cn_ip: {type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs'},
      google_ip: {type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs'},
      telegram_ip: {type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs'},
      netflix_ip: {type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/netflix.mrs'},
      apple_ip: {type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo-lite/geoip/apple.mrs'}
    }
  });
  return addChainProxy(config);
}

function addChainProxy(config) {
  const ENTRY = '链式前置';
  const EXIT = '链式出口';
  const PREFIX = '【链式落地】';
  const PROVIDER_PREFIX = '__chain_exit__';
  const clone = value => JSON.parse(JSON.stringify(value));
  const groups = config['proxy-groups'];
  const reserved = new Set([
    'DIRECT', 'REJECT', 'REJECT-DROP', 'PASS', 'PASS-RULE', 'COMPATIBLE', 'GLOBAL',
    ENTRY, EXIT, ...groups.map(group => group.name)
  ]);
  const isGenerated = proxy => proxy && typeof proxy.name === 'string'
    && proxy.name.startsWith(PREFIX) && proxy['dialer-proxy'] === ENTRY;
  const original = (Array.isArray(config.proxies) ? config.proxies : []).filter(proxy => !isGenerated(proxy));
  const names = new Set();
  for (const proxy of original) {
    if (!proxy || typeof proxy.name !== 'string' || !proxy.name || names.has(proxy.name)
      || reserved.has(proxy.name) || proxy.name.startsWith(PREFIX)) {
      throw new Error('节点名为空、重复或与链式代理保留名称冲突：' + (proxy && proxy.name));
    }
    names.add(proxy.name);
    if (proxy['dialer-proxy'] || proxy['underlying-proxy'] || proxy.detour) {
      throw new Error('节点已有链式设置，请先确认原链路：' + proxy.name);
    }
  }
  // DIRECT / REJECT 等并不是远程代理，不放进前置、出口候选列表。
  const candidates = original.filter(proxy => proxy.server && proxy.port
    && !['direct', 'reject', 'dns', 'pass'].includes(proxy.type));
  const copies = candidates.map(proxy => ({
    ...clone(proxy),
    name: PREFIX + proxy.name,
    'dialer-proxy': ENTRY
  }));

  // 订阅以 proxy-providers 提供时，复制 provider，而不是给组写 dialer-proxy。
  // 保留原订阅来源；入口清除旧前置，出口副本施加独立的名字和前置设置。
  const inputProviders = config['proxy-providers'] || {};
  const providers = {};
  const entryProviders = [];
  const exitProviders = [];
  for (const providerName of Object.keys(inputProviders)) {
    const provider = inputProviders[providerName];
    if (providerName.startsWith(PROVIDER_PREFIX)) {
      const previous = provider.override || {};
      if (previous['dialer-proxy'] === ENTRY) continue;
      throw new Error('订阅名称使用了链式代理保留前缀：' + providerName);
    }
    if (!provider || !['http', 'file', 'inline'].includes(provider.type)) {
      throw new Error('不支持的节点订阅类型：' + providerName);
    }
    const overrides = provider.override || {};
    if (provider['dialer-proxy'] || overrides['dialer-proxy']) {
      throw new Error('节点订阅已有链式设置，请先确认原链路：' + providerName);
    }
    const expressions = overrides['override-expr'] || [];
    if (!Array.isArray(expressions)) {
      throw new Error('订阅 override-expr 必须为数组：' + providerName);
    }
    // 外部订阅的原始节点无法在本脚本中逐条读取；入口明确清除旧前置，
    // 避免原订阅内已有 dialer-proxy 时意外形成循环。
    const clearEntryDialer = '."dialer-proxy" = ""';
    const entryProvider = clone(provider);
    entryProvider.override = {
      ...clone(overrides),
      'override-expr': expressions.includes(clearEntryDialer) ? expressions.slice() : [...expressions, clearEntryDialer]
    };
    providers[providerName] = entryProvider;
    entryProviders.push(providerName);

    const copy = clone(provider);
    const copyName = PROVIDER_PREFIX + providerName;
    // 保留原有的重命名、UDP、TLS 等覆盖项；最后再固定前缀及链路方向。
    copy.override = {
      ...clone(overrides),
      'dialer-proxy': ENTRY,
      'override-expr': [
        ...expressions.filter(expression => expression !== clearEntryDialer),
        '.name = ' + JSON.stringify(PREFIX + providerName + ' / ') + ' + .name',
        '."dialer-proxy" = ' + JSON.stringify(ENTRY)
      ]
    };
    // HTTP 副本使用独立缓存文件；file provider 只读同一份原始节点文件。
    if (copy.type === 'http') {
      const cacheKey = providerName.split('').map(character => character.charCodeAt(0).toString(16)).join('-');
      copy.path = './proxy_providers/chain-exit-' + cacheKey + '.yaml';
    }
    providers[copyName] = copy;
    exitProviders.push(copyName);
  }

  config.proxies = [...original, ...copies];
  if (Object.keys(providers).length) config['proxy-providers'] = providers;
  const entryNames = candidates.map(proxy => proxy.name);
  const exitNames = copies.map(proxy => proxy.name);
  const normalNames = original.map(proxy => proxy.name);
  const normalGroups = groups.filter(group => group.name !== ENTRY && group.name !== EXIT);
  for (const group of normalGroups) {
    // 限定普通分组只枚举原节点，出口副本只显示在链式出口组内。
    delete group['include-all'];
    delete group['include-all-proxies'];
    delete group['include-all-providers'];
    group.proxies = [...new Set([...(group.proxies || []), EXIT, ...normalNames])];
    if (entryProviders.length) group.use = entryProviders.slice();
  }
  const entryGroup = {
    name: ENTRY,
    type: 'select',
    proxies: entryNames.length || entryProviders.length ? entryNames : ['REJECT'],
    'empty-fallback': 'REJECT',
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Rocket.png'
  };
  const exitGroup = {
    name: EXIT,
    type: 'select',
    proxies: exitNames.length || exitProviders.length ? exitNames : ['REJECT'],
    'empty-fallback': 'REJECT',
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png'
  };
  if (entryProviders.length) entryGroup.use = entryProviders;
  if (exitProviders.length) exitGroup.use = exitProviders;
  // 显示顺序：原有全部分组 -> 链式前置 -> 链式出口。
  config['proxy-groups'] = [...normalGroups, entryGroup, exitGroup];
  return config;
}
