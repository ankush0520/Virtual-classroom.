// tests/course.test.js
const request = require('supertest');
const app = require('../server');

describe('Course API', () => {
  it('should fetch all courses', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);  // Assuming one course exists
  });

  it('should create a new course', async () => {
    const res = await request(app)
      .post('/api/courses')
      .send({ name: 'New Course', description: 'Course description' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('New Course');
  });
});
