import FillbackSchema from './fillback.schema.json'

describe('复选框：全选', () => {
  const wrapper = wrap({
    propsData: {
      schema: FillbackSchema,
      data: {
        'checkbox-1': ['option1'],
      }
    }
  });

  test.todo('全选')
})
