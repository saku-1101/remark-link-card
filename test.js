const fs = require('fs')
const remark = require('remark')
const rlc = require('.')

const doc = fs.readFileSync('fixture.md', 'utf8')

const inlineLinksSample = `
[example](http://example.com/) is inline link

[remark-link-card](https://www.npmjs.com/package/remark-link-card) is inline link
`.trim()

const multipleLinksSample = `
http://example.com/ http://example.com/ http://example.com/
`.trim()

// Bare links are converted link cards.
test('convert bare links to link cards', async () => {
  const result = await remark()
    .use(rlc)
    .process(doc)
  expect(result.contents).toContain('</a>')

  console.log(result.contents);
})

// Inline links are not converted to link cards.
test('Inline links are not converted to link cards.', async () => {
  const result = await remark()
    .use(rlc)
    .process(inlineLinksSample)
  expect(result.contents.trim()).toEqual(inlineLinksSample)

  // console.log(result.contents);
})

// Multiple links in one line are not converted to link cards
test('Multiple links in one line are not converted to link cards', async () => {
  const result = await remark()
    .use(rlc)
    .process(multipleLinksSample)
  expect(result.contents.trim()).toEqual(multipleLinksSample)

  // console.log(result.contents);
})