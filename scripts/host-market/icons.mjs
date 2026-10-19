/** Keep package artwork in format-1 JSON, including icons above the inline limit. */
import sharp from 'sharp'
import { createHash } from 'node:crypto'

export async function inlineIcon(display, iconFile, report) {
  if (!iconFile) return
  try {
    const input = Buffer.from(iconFile.bytes)
    // One small static frame is enough for the host's 36px artwork slot.
    const output = await sharp(input, { limitInputPixels: 16 * 1024 * 1024, pages: 1 })
      .resize(96, 96, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toBuffer()
    if (output.length > 32768) throw Error('optimized icon exceeds 32 KiB')
    display.icon = `data:image/webp;base64,${output.toString('base64')}`
    report({ code: 'icon_optimized', status: 'info', reason: '包内原始图标压缩为不超过 96px 的 WebP 后内联',
      inputSha256: createHash('sha256').update(input).digest('hex'),
      outputSha256: createHash('sha256').update(output).digest('hex'),
      inputBytes: input.length, outputBytes: output.length })
  } catch (error) {
    delete display.icon
    report({ code: 'metadata_warning', status: 'warning', reason: `图标压缩失败，已省略：${error.message}` })
  }
}
