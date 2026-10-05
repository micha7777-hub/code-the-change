/**
 * Team photo lookup.
 *
 * Drop an image into  src/assets/team/  named after the member, e.g.
 *   "Evan Honggo Widjojo"  →  evan-honggo-widjojo.jpg
 * and it is picked up automatically. (jpg, jpeg, png, webp, avif)
 *
 * To override, set `photo` on the member in content.js, either to an
 * imported file or to a path under /public (e.g. '/team/evan.jpg').
 */
const files = import.meta.glob('./assets/team/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
})

const byName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase(), url]),
)

export const slugify = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function photoFor(member) {
  if (member.photo) return member.photo
  return byName[slugify(member.name)] || ''
}
