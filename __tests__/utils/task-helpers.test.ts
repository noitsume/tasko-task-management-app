import { getPriorityColor, getPriorityText, getStatusColor } from '@/utils/task-helpers'

describe('Task Helpers', () => {
  describe('getPriorityColor', () => {
    it('should return correct color for high priority', () => {
      expect(getPriorityColor('tinggi')).toBe('text-red-400')
    })

    it('should return correct color for medium priority', () => {
      expect(getPriorityColor('sedang')).toBe('text-yellow-400')
    })

    it('should return correct color for low priority', () => {
      expect(getPriorityColor('rendah')).toBe('text-green-400')
    })

    it('should return default color for unknown priority', () => {
      expect(getPriorityColor('unknown')).toBe('text-gray-400')
    })
  })

  describe('getPriorityText', () => {
    it('should return correct text for priorities', () => {
      expect(getPriorityText('tinggi')).toBe('High')
      expect(getPriorityText('sedang')).toBe('Medium')
      expect(getPriorityText('rendah')).toBe('Low')
    })
  })

  describe('getStatusColor', () => {
    it('should return correct colors for statuses', () => {
      expect(getStatusColor('done')).toBe('text-green-400')
      expect(getStatusColor('in-progress')).toBe('text-blue-400')
      expect(getStatusColor('to-do')).toBe('text-gray-400')
    })
  })
})