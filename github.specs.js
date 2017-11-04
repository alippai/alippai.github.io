import { expect } from 'chai';
import { remote } from 'webdriverio';

describe('my webdriverio tests', () => {
  let client;

  before(async () => {
    client = remote({
      path: '/',
      port: 9515,
      desiredCapabilities: {
        browserName: 'chrome',
      },
    });
    await client.init();
  });

  it('Github test', async () => {
    await client.url('https://github.com/');

    const result = await client.getElementSize('.header-logo-invertocat .octicon.octicon-mark-github');
    expect(result.height).to.equal(32);
    expect(result.width).to.equal(32);

    const title = await client.getTitle();
    expect(title).to.equal('The world’s leading software development platform · GitHub');

    const cssResult = await client.getCssProperty('nav a[href="/pricing"]', 'color');
    expect(cssResult.value).to.equal('rgba(255,255,255,1)');
  });

  after(async () => {
    await client.end();
  });
});
