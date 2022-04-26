const assert = require('assert');
const app = require('../../src/app');

describe('\'step-tasks\' service', () => {
  it('registered the service', () => {
    const service = app.service('step-tasks');

    assert.ok(service, 'Registered the service');
  });
});
