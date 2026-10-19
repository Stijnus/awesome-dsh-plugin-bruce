/** Descriptive coverage metrics; missing metadata is not an installation rejection. */
import semver from 'semver'

export const DISCOVERY_HOST_VERSION = '0.2.1-rc.2'

export function presentationQuality(index) {
  const plugins = index.plugins
  const count = test => plugins.filter(test).length
  const localized = value => typeof value === 'string' ? value : value?.zh ?? value?.en ?? ''
  return {
    targetHostVersion: DISCOVERY_HOST_VERSION,
    total: plugins.length,
    withIcon: count(p => !!p.icon),
    packageNameTitle: count(p => localized(p.title) === p.name),
    withChineseDescription: count(p => /\p{Script=Han}/u.test(localized(p.description))),
    missingDescription: count(p => !p.description),
    missingAuthor: count(p => !p.author),
    missingHomepage: count(p => !p.homepage),
    missingRepository: count(p => !p.repository),
    emptyKeywords: count(p => !p.metadata?.keywords?.length),
    withChineseKeywords: count(p => p.metadata?.keywords?.some(keyword => /\p{Script=Han}/u.test(keyword))),
    withoutMatchingVersion: count(p => !p.versions.some(v => !v.engines?.dsh || semver.satisfies(DISCOVERY_HOST_VERSION, v.engines.dsh, { includePrerelease: true }))),
    note: '按声明范围测算，不考虑用户豁免；有匹配版本不代表已通过实机验证。缺失展示元数据不阻止发布。',
  }
}
