import { mount } from '@vue/test-utils'
import { useQuery, useMutation } from '@vue/apollo-composable'
import TransactionsTable from '@/components/Transactions/TransactionsTable/TransactionsTable'
import BaseTable from '@/components/Base/BaseTable'
import { createI18n } from 'vue-i18n'
import { setActivePinia, createPinia } from 'pinia'

jest.mock('@vue/apollo-composable', () => ({
  __esModule: true,
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  onResult: jest.fn()
}))

useQuery.mockImplementation(() => ({
  onResult: jest.fn(),
  result: {
    transactions: [
      {
        total: 10,
        data: [
          {
            id: 'fe94536c-e5c0-4657-9b7d-79363c1eda47',
            reference: 'Intra-Company Reference',
            categoryId: '2059e527-77e3-443e-80f7-d38dc9656b55',
            category: {
              id: '2059e527-77e3-443e-80f7-d38dc9656b55',
              name: 'Unreconciled Intra-Company Transfers',
              color: '',
              __typename: 'Category'
            },
            account: {
              id: 'a3bbb581-7e91-488e-a416-8ac8f5f6f5be',
              name: 'Mr. Kevin (Household)',
              bank: 'Business SuperBank',
              __typename: 'Account'
            },
            amount: -663,
            currency: 'GBP',
            date: '2023-01-01T02:59:49.185Z',
            __typename: 'Transaction'
          },
          {
            id: 'dc997fca-6c28-448b-9a59-e42724ecc5de',
            reference: 'Day-labor Thwartly Cardiometry',
            categoryId: '350a5a32-beee-47f3-bb71-3814d4a7082a',
            category: {
              id: '350a5a32-beee-47f3-bb71-3814d4a7082a',
              name: 'Contractors',
              color: 'f6f2ab',
              __typename: 'Category'
            },
            account: {
              id: '313ac86b-337c-484f-9a81-0e1c207699aa',
              name: 'Mr. Kevin (Bills)',
              bank: 'Business SuperBank',
              __typename: 'Account'
            },
            amount: -3415,
            currency: 'EUR',
            date: '2023-01-01T02:50:23.255Z',
            __typename: 'Transaction'
          }
        ]
      }
    ]
  }
}))

useMutation.mockImplementation(() => ({
  onDone: jest.fn()
}))

test('loads and displays transactions when component is ready', () => {
  const i18n = createI18n({
    legacy: false
  })

  setActivePinia(createPinia())

  const wrapper = mount(TransactionsTable, {
    global: {
      stubs: {
        BaseBadge: {
          template: '<span />'
        },
        BaseLoading: {
          template: 'Loading...'
        },
        BasePagination: {
          template: '<span />'
        },
        Icon: {
          template: '<span />'
        },
        BaseSelect: {
          template: '<span />'
        },
        BaseTable
      },
      mocks: {
        $t: (key) => key
      },
      plugins: [i18n]
    }
  })

  expect(useQuery).toHaveBeenCalled()
  expect(
    wrapper.get(
      '[data-testid="base-table-row__fe94536c-e5c0-4657-9b7d-79363c1eda47"]'
    )
  ).toBeDefined()

  const referenceCell = wrapper.get(
    '[data-testid="base-table-cell__fe94536c-e5c0-4657-9b7d-79363c1eda47__reference"]'
  )
  expect(referenceCell).toBeDefined()
  expect(referenceCell.element.innerHTML).toContain('Intra-Company Reference')
})
