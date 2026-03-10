<template>
  <div class="container">
    <header class="header">
      <span>📊 养基宝助手</span>
      <div v-if="isLoggedIn">
        <button @click="logout" class="btn-logout">退出</button>
      </div>
    </header>

    <div v-if="!isLoggedIn" class="login-panel">
      <div class="card">
        <h3>微信扫码登录</h3>
        <div v-if="qrUrl" class="qr-box">
          <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`" />
          <p class="blink-text">{{ loginStatusText }}</p>
        </div>
        <button v-else @click="getQrCode" class="btn-primary" :disabled="loading">
          {{ loading ? '获取中...' : '获取登录二维码' }}
        </button>
      </div>
    </div>

    <div v-else class="main-panel">
      <div class="fixed-top-area">
        <div v-if="currentView === 'accounts'" class="account-tab-header">
          <div class="account-tabs">
            <div v-for="(acc, index) in accountList" :key="acc.id" class="tab-item"
              :class="{ active: selectedAccId === acc.id }" @click="selectAccount(acc.id)">
              <div class="acc-title">{{ acc.title }}</div>
            </div>
          </div>
          <div class="btn-refresh-mini" @click="refreshAccountData">🔄</div>
        </div>

        <div v-if="currentView === 'accounts' && holdings.length" class="account-summary-strip !justify-between">
          <div class="flex items-center">
            <span>账户资产：</span>
            <span>{{ isHidden ? '**' : account_assets }}</span>
            <img class="w-[16px] h-[16px] ml-2" src="../../public/assets/look.png" @click="hide" />
          </div>
          <div>
            <span class="label mr-2">预估收益:</span>
            <span class="value" :class="getColorClass(totalEstimatedIncome)">
              {{ formatValue(totalEstimatedIncome) }}
            </span>
          </div>
        </div>
      </div>

      <div class="scrollable-wrapper">
        <div v-if="loading" class="loading-overlay">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-if="currentView === 'accounts' && selectedAccId" class="detail-section">
          <table v-show="!loading" class="sticky-table">
            <thead>
              <tr>
                <th class="col-name">
                  <div class="header-container">
                    <span>基金名称</span>
                    <div class="sort-buttons">
                      <!-- 动态绑定图标 -->
                      <img :src="getSortIcon('money', 'asc')" @click="sortColumn('money', 'asc')" class="sort-btn" />
                      <img :src="getSortIcon('money', 'desc')" @click="sortColumn('money', 'desc')" class="sort-btn" />
                    </div>
                  </div>
                </th>

                <th class="col-rate">
                  <div class="header-container">
                    <span>日涨幅</span>
                    <div class="sort-buttons">
                      <img :src="getSortIcon('rate', 'asc')" @click="sortColumn('rate', 'asc')" class="sort-btn" />
                      <img :src="getSortIcon('rate', 'desc')" @click="sortColumn('rate', 'desc')" class="sort-btn" />
                    </div>
                  </div>
                </th>

                <th class="col-earn">
                  <div class="header-container">
                    <span>日收益</span>
                    <div class="sort-buttons">
                      <img :src="getSortIcon('earn', 'asc')" @click="sortColumn('earn', 'asc')" class="sort-btn" />
                      <img :src="getSortIcon('earn', 'desc')" @click="sortColumn('earn', 'desc')" class="sort-btn" />
                    </div>
                  </div>
                </th>

                <th class="col-hold">
                  <div class="header-container">
                    <span>持有收益</span>
                    <div class="sort-buttons">
                      <img :src="getSortIcon('hold', 'asc')" @click="sortColumn('hold', 'asc')" class="sort-btn" />
                      <img :src="getSortIcon('hold', 'desc')" @click="sortColumn('hold', 'desc')" class="sort-btn" />
                    </div>
                  </div>
                </th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="f in holdings" :key="f.code">
                <td>
                  <div class="f-name">{{ f.short_name }}</div>
                  <div class="f-code">{{ f.code }} 💰{{ isHidden ? '**' : f.money }}</div>
                </td>
                <td :class="getColorClass(getGszzl(f))">{{ formatValue(getGszzl(f)) }}%</td>
                <td class="text-center" :class="getColorClass(calcEarn(f))">{{
                  isHidden ? '**' : formatValue(calcEarn(f))
                }}
                </td>
                <td class="text-center flex flex-col" :class="getColorClass(f.hold_earn)">
                  <span class="font-bold">{{ isHidden ? '**' : formatValue(f.hold_earn) }}</span>
                  <span class="text-[13px]" :class="getColorClass(calcRate(f))">{{
                    formatValue(calcRate(f)) + '%'
                  }}</span>

                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!loading && !holdings.length" class="empty-state">该账户暂无持仓</div>
        </div>

        <div v-if="currentView === 'dashboard'" class="dashboard-content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_BASE = '/api';
const SECRET = "YxmKSrQR4uoJ5lOoWIhcbd7SlUEh9OOc";
const originalHoldings = ref([]);
const isLoggedIn = ref(!!localStorage.getItem('yjb_token'));
const currentView = ref('accounts');
const loading = ref(false);
const qrUrl = ref('');
const loginStatusText = ref('');
const accountList = ref([]);
const selectedAccId = ref(null);
const isHidden = ref(false);
const hide = () => {
  isHidden.value = !isHidden.value;
};

const holdings = ref([]);
// 排序状态管理
const sortState = ref({
  name: null, // null: 默认, 'asc': 升序, 'desc': 降序
  rate: null,
  earn: null,
  hold: null
});

// 修改 selectAccount 函数，同时更新 originalHoldings
const selectAccount = async (id) => {
  selectedAccId.value = id;
  const data = await request('get', `/fund_hold?account_id=${id}`) || [];
  holdings.value = [...data]; // 更新当前显示的数据
  originalHoldings.value = [...data]; // 保存原始数据
};

// 多级排序规则数组
const multiSortRules = ref([]);

const sortColumn = (column, direction) => {
  // 判断是否点击了相同的排序规则
  const isSameRule = multiSortRules.value.length > 0 &&
    multiSortRules.value[0].column === column &&
    multiSortRules.value[0].direction === direction;

  if (isSameRule) {
    // 如果点击了相同的排序规则，恢复原始默认排序
    multiSortRules.value = [];
    holdings.value = [...originalHoldings.value];
  } else {
    // 否则，清空之前的排序规则，只保留当前点击的排序规则
    multiSortRules.value = [{ column, direction }];
    applyMultiSort();
  }
};

// 多级排序函数
const applyMultiSort = () => {
  // 克隆原始数据以避免污染原数据
  holdings.value = [...originalHoldings.value];

  // 按照排序规则逐个应用排序
  multiSortRules.value.forEach(rule => {
    const { column, direction } = rule;

    holdings.value.sort((a, b) => {
      let valueA, valueB;

      switch (column) {
        case 'name':
          valueA = a.short_name;
          valueB = b.short_name;
          break;
        case 'rate':
          valueA = parseFloat(getGszzl(a));
          valueB = parseFloat(getGszzl(b));
          break;
        case 'earn':
          valueA = parseFloat(calcEarn(a));
          valueB = parseFloat(calcEarn(b));
          break;
        case 'hold':
          valueA = parseFloat(a.hold_earn);
          valueB = parseFloat(b.hold_earn);
          break;
        case 'money':
          valueA = parseFloat(a.money);
          valueB = parseFloat(b.money);
          break;
        default:
          return 0;
      }

      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  });
};


// 获取排序图标路径
const getSortIcon = (column, direction) => {
  // 判断当前列是否在排序规则中
  const isActive = multiSortRules.value.some(
    rule => rule.column === column && rule.direction === direction
  );

  if (direction === 'asc') {
    return isActive ? '/assets/u.png' : '/assets/u1.png'; // 高亮/默认向上图标
  } else {
    return isActive ? '/assets/d.png' : '/assets/d1.png'; // 高亮/默认向下图标
  }
};


const generateSign = (path, token, timestamp) => {
  const tokenStr = token || "";
  const signPath = path.split('?')[0];
  return CryptoJS.MD5(signPath + tokenStr + timestamp + SECRET).toString();
};
const account_assets = computed(() => {
  // 如果 holdings 为空，返回 0
  if (!holdings.value || holdings.value.length === 0) {
    return 0;
  }

  // 计算总账户资产
  const totalAssets = holdings.value.reduce((sum, fund) => {
    const share = fund.hold_share || 0; // 持有份额
    const netValue = fund.last_net || 0; // 最新净值
    return sum + share * netValue;
  }, 0);

  return totalAssets.toFixed(2); // 保留两位小数
});

/**
 * 封装请求
 * @param {string} method
 * @param {string} path
 * @param {boolean} silent 是否静默请求（不触发全局loading）
 */
const request = async (method, path, silent = false) => {
  if (!silent) loading.value = true;
  try {
    const token = localStorage.getItem('yjb_token') || "";
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = generateSign(path, token, timestamp);
    const res = await axios({
      method,
      url: API_BASE + path,
      headers: {
        'Request-Time': timestamp,
        'Request-Sign': sign,
        'Authorization': token
      }
    });
    return res.data.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  } finally {
    if (!silent) loading.value = false;
  }
};

const getQrCode = async () => {
  const res = await request('get', '/qr_code');
  qrUrl.value = res.url;
  loginStatusText.value = '养基宝公众号授权...';

  const timer = setInterval(async () => {
    try {
      // 轮询扫码状态使用 silent=true，避免界面不停闪烁loading
      const s = await request('get', `/qr_code_state/${res.id}`, true);
      if (s.state == 2) {
        clearInterval(timer);
        localStorage.setItem('yjb_token', s.token);
        isLoggedIn.value = true;
        fetchAccounts();
      }
    } catch (e) {
      clearInterval(timer);
    }
  }, 3000);
};

const fetchAccounts = async () => {
  const res = await request('get', '/user_account');
  accountList.value = res.list || [];
  if (accountList.value.length > 0) {
    selectAccount(selectedAccId.value || accountList.value[0].id);
  }
};


const refreshAccountData = () => fetchAccounts();

const logout = () => {
  localStorage.clear()
  isLoggedIn.value = false;
  qrUrl.value = '';
};

// 工具函数
const getGszzl = (f) => f.nv_info?.gszzl || f.nv_info?.vgszzl || 0;
const calcEarn = (f) => ((f.hold_share || 0) * (f.last_net || 0) * (getGszzl(f) / 100)).toFixed(2);
const calcRate = (f) => (f.hold_share * f.hold_cost) === 0 ? 0 : ((f.hold_earn / (f.hold_share * f.hold_cost)) * 100).toFixed(2);
const getColorClass = (value) => {
  const num = parseFloat(value);
  if (num > 0) return 'txt-red';
  if (num < 0) return 'txt-green';
  return '';
};
const formatValue = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
};

const totalEstimatedIncome = computed(() =>
  holdings.value.reduce((sum, f) => sum + parseFloat(calcEarn(f)), 0)
);

onMounted(() => {
  if (isLoggedIn.value) fetchAccounts();
});
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f4f7f9;
}

.header {
  flex-shrink: 0;
  background: #1890ff;
  color: #fff;
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
}

/* 表头容器：水平排列标题和按钮 */
.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  /* 标题与按钮之间的间距 */
}

/* 排序按钮容器：垂直排列两个按钮 */
.sort-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  /* 按钮之间的间距 */
}

/* 排序按钮样式 */
.sort-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  margin-left: 2px;
  width: 13px;
  height: 13px;
}

.main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}


.fixed-top-area {
  flex-shrink: 0;
  background: #fff;
  z-index: 100;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  color: #1890ff;
  font-size: 14px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.account-tab-header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.account-tabs {
  display: flex;
  overflow-x: auto;
  flex: 1;
  gap: 8px;
  scrollbar-width: none;
}

.account-tabs::-webkit-scrollbar {
  display: none;
}

.tab-item {
  padding: 6px 15px;
  border: 1px solid #eee;
  border-radius: 20px;
  white-space: nowrap;
  font-size: 12px;
  background: #fafafa;
  cursor: pointer;
}

.tab-item.active {
  border-color: #1890ff;
  background: #e6f7ff;
  color: #1890ff;
}

.account-summary-strip {
  padding: 12px 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.scrollable-wrapper {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;
}

.sticky-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.sticky-table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8f9fa;
  padding: 10px 0;
  color: #999;
  font-size: 13px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.sticky-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #f9f9f9;
  font-size: 14px;
}

.login-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 80%;
}

.qr-box img {
  width: 180px;
  height: 180px;
  margin: 0 auto 10px;
}

.blink-text {
  color: #666;
  font-size: 13px;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}

.col-name {
  width: 40%;
}

.col-rate {
  width: 18%;
}

.col-earn {
  width: 21%;
}

.f-name {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
}

.f-code {
  margin-top: 2px;
  font-size: 13px;
  color: #999;
}

.txt-red {
  color: #f5222d;
}

.txt-green {
  color: #52c41a;
}

.btn-refresh-mini {
  padding-left: 10px;
  font-size: 20px;
  color: #1890ff;
  cursor: pointer;
}

.btn-logout {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.btn-primary {
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}

.btn-primary:disabled {
  background: #bfbfbf;
}

.empty-state {
  padding: 60px;
  text-align: center;
  color: #ccc;
}
</style>