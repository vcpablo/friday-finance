import { shallowMount } from '@vue/test-utils'
import BaseTable from '@/components/Base/BaseTable'

const setup = ({ props } = {}) =>
  shallowMount(BaseTable, {
    global: {
      stubs: {
        Icon: {
          template: '<span />'
        },
        BaseLoading: {
          template: 'Loading...'
        },
        BasePagination: {
          template: '<span />'
        }
      },
      mocks: {
        $t: (key) => key
      }
    },
    props: {
      columns: [
        {
          key: 'id',
          label: '#'
        },
        {
          key: 'name',
          label: 'Name'
        }
      ],
      items: [
        {
          id: 1,
          name: 'Friday'
        },
        {
          id: 2,
          name: 'Finance'
        }
      ],
      sortBy: {
        key: 'id',
        direction: 'desc'
      },

      pagination: {
        currentPage: 1,
        perPage: 10,
        total: 2
      },
      loading: true,
      ...props
    }
  })

test('renders loading state', () => {
  const wrapper = setup()

  expect(wrapper.text()).toContain('Loading...')
})

test('renders arrows when column is sortable', () => {
  const wrapper = setup({
    props: {
      columns: [
        {
          key: 'id',
          label: '#'
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true
        }
      ],
      sortBy: {
        key: 'name',
        direction: 'desc'
      }
    }
  })
  expect(wrapper.get('[data-testid="base-table-sorting__name"]')).toBeDefined()
})

test('renders empty state', () => {
  const wrapper = setup({
    props: {
      items: [],
      loading: false
    }
  })
  expect(wrapper.get('[data-testid="base-table-no-results"]')).toBeDefined()
})
