import AccountSettings from '../components/AccountSettings.vue'
import AccountSafe from '../components/AccountSafe.vue'
import AccountBank from '../components/AccountBank.vue'
import PasswordManage from '../components/PasswordManage.vue'

import CompanyForm from '../components/teamMessage/companyForm'   // 企业
 export const commonRouters = [
       { // 团队个人设置
          path: '/companyForm',
          name: 'CompanyForm',
          component: CompanyForm,
          meta: {
            requiresAuth: 2
          }
        },
        {
          path: '/accountSettings',  //账户设置
          component: AccountSettings,
          meta: {
            requiresAuth: 2
          }
        },
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
        }
      ]