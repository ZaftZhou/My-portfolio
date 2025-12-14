/**
 * 将字符串转换为 URL 友好的 slug
 * @param {string} text - 原始字符串
 * @returns {string} - slug 格式字符串
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')     // 空格替换为连字符
    .replace(/--+/g, '-');    // 多个连字符合并为一个
};

/**
 * 根据 slug 查找项目
 * @param {Array} projects - 项目数组
 * @param {string} slug - URL slug
 * @returns {Object|null} - 找到的项目或 null
 */
export const findProjectBySlug = (projects, slug) => {
  return projects.find((project) => project.slug === slug) || null;
};
