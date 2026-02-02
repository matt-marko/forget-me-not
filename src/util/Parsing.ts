const HEX_CODE_REGEX = /^#[0-9A-F]{6}/i;

/**
 * Determines whether a colour hex code is valid
 */
export function isValidColourHexCode(hexCode: string): boolean {
  return HEX_CODE_REGEX.test(hexCode);
}