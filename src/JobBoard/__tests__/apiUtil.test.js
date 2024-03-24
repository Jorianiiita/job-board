import { getjobdetails } from './../apiUtil';

global.fetch = jest.fn();

afterAll(() => jest.clearAllMocks());

// beforeAll(() => jest.spyOn(window, 'fetch'));

it('fetches job details correspinding to jobId', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 39541631 }),
  });

  const jobId = 39541631;
  const data = await getjobdetails(jobId);
  expect(data.id).toEqual(39541631);
});
