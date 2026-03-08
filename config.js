function main(config, profileName) {
  const next = { ...(config || {}) };

  Object.assign(next, {
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
    'global-client-fingerprint': 'chrome',
    'keep-alive-idle': 600,
    'keep-alive-interval': 15,
    'external-controller': '0.0.0.0:9090',
    secret: 'diyhh'
  });

  next.profile = {
    'store-selected': true,
    'store-fake-ip': true
  };

  next.sniffer = {
    enable: true,
    sniff: {
      HTTP: {
        ports: [80, '8080-8880'],
        'override-destination': true
      },
      TLS: {
        ports: [443, 8443]
      },
      QUIC: {
        ports: [443, 8443]
      }
    },
    'skip-domain': ['Mijia Cloud', '+.push.apple.com', 'mtalk.google.com']
  };

  next.tun = {
    enable: true,
    stack: 'mixed',
    'dns-hijack': ['any:53', 'tcp://any:53'],
    'auto-route': false,
    'auto-redirect': false,
    'auto-detect-interface': false
  };

  next.dns = {
    enable: true,
    'cache-algorithm': 'arc',
    listen: '0.0.0.0:1053',
    ipv6: false,
    'respect-rules': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'fake-ip-filter-mode': 'blacklist',
    'default-nameserver': ['https://223.5.5.5/dns-query'],
    'proxy-server-nameserver': ['https://dns.alidns.com/dns-query', 'https://doh.pub/dns-query'],
    'direct-nameserver': ['https://dns.alidns.com/dns-query', 'https://doh.pub/dns-query'],
    nameserver: ['https://8.8.8.8/dns-query'],
    'fake-ip-filter': [
      '+.push.apple.com',
      'mtalk.google.com',
      'rule-set:fakeipfilter_domain',
      'rule-set:private_domain',
      'rule-set:cn_domain',
      'rule-set:zijign'
    ]
  };

  next['proxy-groups'] = [
    { name: '默认代理', type: 'select', 'include-all': true, proxies: ['DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Rocket.png' },
    { name: 'YouTube', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png' },
    { name: 'Google', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png' },
    { name: 'GoogleFCM', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Rocket.png' },
    { name: 'ChatGPT', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ChatGPT.png' },
    { name: 'GitHub', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/GitHub.png' },
    { name: 'OneDrive', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/OneDrive.png' },
    { name: 'Microsoft', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Microsoft.png' },
    { name: 'TikTok', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TikTok.png' },
    { name: 'APPLE', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple.png' },
    { name: 'Telegram', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram.png' },
    { name: 'NETFLIX', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Netflix.png' },
    { name: 'Disney', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Disney%2B.png' },
    { name: '国内网络', type: 'select', 'include-all': true, proxies: ['DIRECT', '默认代理'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png' },
    { name: '漏网之鱼', type: 'select', 'include-all': true, proxies: ['默认代理', 'DIRECT'], icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png' }
  ];

  next.rules = [
    'RULE-SET,ziji,默认代理',
    'RULE-SET,private_ip,国内网络,no-resolve',
    'RULE-SET,private_domain,国内网络',
    'RULE-SET,cn_domain,国内网络',
    'RULE-SET,cn_ip,国内网络',
    'RULE-SET,zijign,国内网络',
    'RULE-SET,googlefcm,GoogleFCM',
    'DOMAIN-SUFFIX,push.apple.com,GoogleFCM',
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
  ];

  next['rule-providers'] = {
    ziji: { type: 'http', interval: 86400, behavior: 'domain', format: 'yaml', url: 'https://raw.githubusercontent.com/hheshenghuan-cloud/ziji/main/ziji.yaml' },
    zijign: { type: 'http', interval: 86400, behavior: 'domain', format: 'yaml', url: 'https://raw.githubusercontent.com/hheshenghuan-cloud/ziji/main/zijign.yaml' },
    googlefcm: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/googlefcm.mrs' },
    fakeipfilter_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/DustinWin/ruleset_geodata/mihomo-ruleset/fakeip-filter.mrs' },
    private_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs' },
    proxylite: { type: 'http', interval: 86400, behavior: 'classical', format: 'text', url: 'https://raw.githubusercontent.com/qichiyuhub/rule/refs/heads/main/proxy.list' },
    ai: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.mrs' },
    youtube_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs' },
    google_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs' },
    github_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs' },
    telegram_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs' },
    netflix_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs' },
    onedrive_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/onedrive.mrs' },
    microsoft_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs' },
    apple_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs' },
    speedtest_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/ookla-speedtest.mrs' },
    tiktok_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs' },
    'geolocation-!cn': { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs' },
    cn_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs' },
    disney_domain: { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs', url: 'https://raw.githubusercontent.com/GitMetaio/rule/refs/heads/master/rule/Clash/Disney/Disney_OCD_Domain.mrs' },
    private_ip: { type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/private.mrs' },
    cn_ip: { type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs' },
    google_ip: { type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs' },
    telegram_ip: { type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs' },
    netflix_ip: { type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/netflix.mrs' },
    apple_ip: { type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs', url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo-lite/geoip/apple.mrs' }
  };

  return next;
}


