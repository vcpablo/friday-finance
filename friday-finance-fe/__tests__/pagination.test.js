import { paginate } from '../utils/pagination'

test('returns pagination items', () => {
  expect(paginate(1, 10)).toEqual([1, 2, 3, '...', 10])
})
