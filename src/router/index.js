import AccountSettings from '../components/AccountSettings.vue'
import AccountSafe from '../components/AccountSafe.vue'
import AccountBank from '../components/AccountBank.vue'
import PasswordManage from '../components/PasswordManage.vue'
// import CompanyForm from '../components/teamMessage/companyForm'   // 企业
import myAccount from '../components/finance/myAccount'
import deposit from '../components/finance/deposit'
import withdraw from '../components/finance/withdraw'
import tradingRecord from '../components/finance/tradingRecord'

export const commonRouters = [
  // {
  //   path: '/accountSettings',  //账户设置
  //   component: AccountSettings,
  //   meta: {
  //     requiresAuth: 2
  //   }
  // },
  {
    path: '/accountSafe',  //账户安全
    name: AccountSafe,
    component: AccountSafe,
    meta: {
      requiresAuth: 1
    }
  },
  {
    path: '/accountBank',  //账户设置
    component: AccountBank,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/passwordManage',  //账户设置
    component: PasswordManage,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/myAccount',  // 财务
    component: myAccount,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/deposit',  // 财务
    component: deposit,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/withdraw',  // 财务
    component: withdraw,
    meta: {
      requiresAuth: 2
    }
  },
  {
    path: '/tradingRecord',  // 财务
    component: tradingRecord,
    meta: {
      requiresAuth: 2
    }
  },

]