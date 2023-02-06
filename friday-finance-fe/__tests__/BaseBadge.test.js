import { mount } from '@vue/test-utils'
import BaseBadge from '@/components/Base/BaseBadge'

test('renders badge with proper label and color', () => {
  const wrapper = mount(BaseBadge, {
    props: {
      label: 'This is a badge',
      color: '#ff0000'
    }
  })

  expect(wrapper.text()).toContain('This is a badge')
  expect(wrapper.element.style.getPropertyValue('background')).toContain(
    'rgb(255, 0, 0)'
  )
})
