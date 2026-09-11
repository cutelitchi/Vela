import { pagePath, type Language } from './seo';

export const infoPages = ['about', 'contact', 'privacy'] as const;
export type InfoPage = typeof infoPages[number];
export const projectUrl = 'https://github.com/cutelitchi/Vela';
export const feedbackUrl = `${projectUrl}/issues`;
export const contactEmail = 'henuqin@gmail.com';
const emailLink = { label: contactEmail, href: `mailto:${contactEmail}` };
export const infoPath = (language: Language, page: InfoPage) => `${pagePath(language)}${page}/`;
export const infoLabels = {
  en: { about: 'About', contact: 'Contact', privacy: 'Privacy policy' },
  zh: { about: '关于我们', contact: '联系我们', privacy: '隐私政策' },
};

type Section = { heading: string; paragraphs: string[]; links?: { label: string; href: string }[] };
type PageContent = { title: string; description: string; intro: string; sections: Section[] };
const cloudflare = 'https://www.cloudflare.com/privacypolicy/';
const githubPrivacy = 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement';
const googleData = 'https://policies.google.com/technologies/partner-sites';
const adChoices = 'https://myadcenter.google.com/';

export const infoContent: Record<Language, Record<InfoPage, PageContent>> = {
  en: {
    about: {
      title: 'About PicSizeKit — Local Image Tools',
      description: 'Learn about PicSizeKit, an independent project for resizing, cropping, compressing and framing images directly in your browser.',
      intro: 'Small tools for everyday images. Built to keep the work on your device.',
      sections: [
        { heading: 'An independent project', paragraphs: ['PicSizeKit is an independent image utility maintained through the cutelitchi/Vela project on GitHub. It helps people prepare photos for sharing, websites and everyday tasks without creating an account.'], links: [{ label: 'View the project and its updates', href: projectUrl }] },
        { heading: 'What you can do', paragraphs: ['Resize by pixels or percentage, crop to common or custom ratios, convert JPEG, PNG and WebP, and adjust compression quality. Add square-corner borders in preset colors or custom RGB, compare output sizes, and download images individually or in a batch ZIP.'] },
        { heading: 'Why local processing matters', paragraphs: ['The image editor decodes and processes your selected files in your browser. Image contents are not uploaded to PicSizeKit for processing. The website still needs a network connection to deliver its pages; our privacy policy explains hosting and other data separately.'] },
        { heading: 'Practical limits', paragraphs: ['Very large images and batches depend on your device memory and browser. Output images are still images; animations are not preserved. Enlarging a photo cannot restore missing detail. ID photo presets set crop ratios, so always check the receiving organization’s pixel and document requirements.'] },
        { heading: 'Help improve the tools', paragraphs: ['Bug reports and suggestions help guide improvements. Describe what you were trying to do and the result you expected. Use a non-sensitive example if an image is needed.'], links: [{ label: 'Contact the maintainer', href: '/contact/' }] },
      ],
    },
    contact: {
      title: 'Contact PicSizeKit — Feedback & Support',
      description: 'Contact PicSizeKit by email for support and privacy questions, or use the project’s GitHub Issues channel for public bug reports and suggestions.',
      intro: 'Found a problem or have an idea? Here is how to reach the project maintainer.',
      sections: [
        { heading: 'Email the maintainer', paragraphs: ['For support, suggestions or privacy questions, email the project maintainer at the address below. The link opens your email application; there is no contact form on this website.'], links: [emailLink] },
        { heading: 'Public bug reports', paragraphs: ['You can also use the public Issues area of cutelitchi/Vela. Browse existing reports or sign in to GitHub to create a new issue.'], links: [{ label: 'Open GitHub Issues', href: feedbackUrl }] },
        { heading: 'What to include in a bug report', paragraphs: ['Include your device, browser, the tool you used, steps to reproduce the problem, and what you expected to happen. The image format and approximate dimensions can be useful. If necessary, use a test image without personal information.'] },
        { heading: 'Privacy questions', paragraphs: ['Please use email for privacy requests and share only the information needed to describe the issue. GitHub Issues are public: do not post private photos, identity documents, passwords, access tokens or other sensitive information.'], links: [emailLink, { label: 'Read our privacy policy', href: '/privacy/' }] },
        { heading: 'Responses', paragraphs: ['PicSizeKit is an independent project. Reports are handled by the maintainer as time allows; there is no guaranteed response time. Check existing issues for known problems and updates.'] },
      ],
    },
    privacy: {
      title: 'Privacy Policy | PicSizeKit',
      description: 'How PicSizeKit handles local image processing, website requests, feedback and advertising. Read about your choices and third-party services.',
      intro: 'This policy applies to picsizekit.com and explains what stays on your device and what happens when you visit the website.',
      sections: [
        { heading: 'Who operates this website', paragraphs: ['PicSizeKit is an independent project maintained through cutelitchi/Vela on GitHub. For questions about this policy, use the contact channel listed on our Contact page.'], links: [{ label: 'Contact the maintainer', href: '/contact/' }] },
        { heading: 'Images and editing data', paragraphs: ['Selected images, file names, dimensions, crop selections and output images are used locally in your browser to provide the editor. The editor does not upload these files or their contents to PicSizeKit or an image-hosting service.', 'The editor uses temporary browser memory and image URLs. It does not provide cloud storage or server-side recovery of your work. Closing or refreshing the page ends the editing session; files you download remain on your device until you remove them.', 'EXIF metadata is removed from outputs by default. You may choose to preserve it for JPEG-to-JPEG processing. Review this setting before sharing a downloaded photo.'] },
        { heading: 'Website delivery and request data', paragraphs: ['Cloudflare hosts and delivers the site. Loading pages sends ordinary connection information, such as your IP address, requested URL, browser information and request time, to the hosting infrastructure. Cloudflare may process technical and security data to deliver and protect the service. This is separate from your image contents, which the editor does not upload.', 'Infrastructure data handling, retention and international processing are subject to the provider’s applicable policies. We do not specify a fixed retention period for records controlled by that provider.'], links: [{ label: 'Cloudflare privacy policy', href: cloudflare }] },
        { heading: 'Cookies, local storage and analytics', paragraphs: ['The current editor does not set advertising or analytics cookies and does not store your images in localStorage. The page URL determines the interface language. An older version saved a language preference under picsizekit-language-v2; the current version does not read it, and you can remove it through your browser’s site-data settings.', 'Hosting or security features may use necessary technical storage according to the provider’s policies. The application currently includes no third-party analytics script.'] },
        { heading: 'Advertising and your choices', paragraphs: ['As of the update date below, the application publishes an ads.txt authorization file but does not load the Google AdSense advertising script. An ads.txt file itself does not display ads or set advertising cookies.', 'If Google advertising is enabled, third-party vendors including Google may use cookies to serve ads based on previous visits to this and other websites. Google advertising cookies can enable Google and its partners to personalize ads. You can manage personalized advertising through Google My Ad Center; third-party opt-out choices are also available through AboutAds.', 'Before enabling advertising, we will update this policy to reflect the services actually used and provide any required notices and consent controls. Where required, advertising will be subject to your consent choices. The privacy policy alone does not collect consent.'], links: [{ label: 'How Google uses information from partner sites', href: googleData }, { label: 'Google My Ad Center', href: adChoices }, { label: 'Third-party advertising choices', href: 'https://www.aboutads.info/choices/' }] },
        { heading: 'Feedback and external links', paragraphs: ['If you email henuqin@gmail.com, the maintainer receives your email address, message and any attachments to respond to your request. This mailbox uses Gmail, which processes email under Google’s applicable policies. Messages remain in the support mailbox unless removed; you can email a request to delete your correspondence. Provider-controlled records and backups follow the provider’s rules. Send only information needed for your request.', 'If you post an issue on GitHub, the maintainer can read the information you provide to respond to your request. Issues and attachments are public and remain subject to GitHub’s storage and deletion controls. Do not post sensitive information.', 'Following an external link sends you to a service with its own data practices.'], links: [emailLink, { label: 'Google privacy policy', href: 'https://policies.google.com/privacy' }, { label: 'GitHub privacy statement', href: githubPrivacy }] },
        { heading: 'Your controls and policy changes', paragraphs: ['You can clear this site’s browser data, close the editor and delete downloaded files using your device controls. PicSizeKit has no server copy of your processed images to retrieve or erase. For questions or requests about information shared through feedback, contact the maintainer without posting sensitive details.', 'We will update this page when our practices change. The date below identifies the latest revision.'] },
      ],
    },
  },
  zh: {
    about: {
      title: '关于 PicSizeKit — 本地图片处理工具',
      description: '了解 PicSizeKit 独立图片工具项目，在浏览器中完成缩放、裁剪、压缩、格式转换和添加边框。',
      intro: '专注日常图片处理的小工具，让编辑工作留在你的设备上。',
      sections: [
        { heading: '一个独立项目', paragraphs: ['PicSizeKit 是通过 GitHub 上 cutelitchi/Vela 项目维护的独立图片工具，帮助用户为日常分享、网站和其他用途准备照片，无需创建账户。'], links: [{ label: '查看项目与更新', href: projectUrl }] },
        { heading: '可以完成哪些工作', paragraphs: ['按像素或百分比缩放，按常见或自定义比例裁剪，转换 JPEG、PNG、WebP 并调整压缩质量。还可以添加预设配色或自定义 RGB 的直角边框，比较输出体积，单张下载或批量打包 ZIP。'] },
        { heading: '为什么采用本地处理', paragraphs: ['编辑器在浏览器内解码和处理所选图片，不会将图片内容上传到 PicSizeKit 进行处理。加载网页仍需要网络连接，隐私政策会单独说明网站托管与其他数据处理。'] },
        { heading: '使用限制', paragraphs: ['大型图片和批量任务的处理能力取决于设备内存及浏览器。输出为静态图片，不保留动画；放大图片不能恢复缺失细节。证件照预设用于设置裁剪比例，请另行核对接收机构的像素与材料要求。'] },
        { heading: '帮助我们改进', paragraphs: ['问题反馈与功能建议有助于改进工具。请说明操作目标及预期结果，必要时使用不包含隐私的示例图片。'], links: [{ label: '联系维护者', href: '/zh/contact/' }] },
      ],
    },
    contact: {
      title: '联系 PicSizeKit — 问题反馈与支持',
      description: '通过邮箱联系 PicSizeKit 维护者获取支持、提交建议和隐私请求，或通过 GitHub Issues 公开反馈图片工具问题。',
      intro: '发现问题或有新的想法？可以通过以下渠道联系项目维护者。',
      sections: [
        { heading: '邮件联系维护者', paragraphs: ['如需使用支持、提出建议或询问隐私问题，请发送邮件至下方地址。点击链接会打开你的邮件应用，本网站没有在线联系表单。'], links: [emailLink] },
        { heading: '公开问题反馈', paragraphs: ['你也可以使用 cutelitchi/Vela 的公开 Issues 页面，查看已有反馈，或登录 GitHub 创建新的问题。'], links: [{ label: '打开 GitHub Issues', href: feedbackUrl }] },
        { heading: '反馈问题时请说明', paragraphs: ['请提供设备、浏览器、使用的工具、复现步骤和预期结果。图片格式与大致尺寸也有助于排查；如需示例，请使用不包含个人信息的测试图片。'] },
        { heading: '隐私相关问题', paragraphs: ['隐私请求请通过邮件联系，仅提供描述问题所需的信息。GitHub Issues 对外公开，请勿发布私人照片、身份证件、密码、访问令牌或其他敏感信息。'], links: [emailLink, { label: '阅读隐私政策', href: '/zh/privacy/' }] },
        { heading: '回复说明', paragraphs: ['PicSizeKit 是独立项目，维护者会在时间允许时处理反馈，不承诺固定回复时限。提交前可先查看已有问题及更新记录。'] },
      ],
    },
    privacy: {
      title: '隐私政策 | PicSizeKit',
      description: '了解 PicSizeKit 如何处理本地图片、网页访问、反馈与广告相关数据，以及用户选择和第三方服务。',
      intro: '本政策适用于 picsizekit.com，说明哪些内容保留在你的设备上，以及访问网站时可能发生的数据处理。',
      sections: [
        { heading: '网站维护者', paragraphs: ['PicSizeKit 是通过 GitHub 上 cutelitchi/Vela 项目维护的独立项目。如对本政策有疑问，请使用联系我们页面列出的渠道。'], links: [{ label: '联系维护者', href: '/zh/contact/' }] },
        { heading: '图片与编辑数据', paragraphs: ['所选图片、文件名、尺寸、裁剪选区和输出图片在浏览器本地用于提供编辑功能。编辑器不会将这些文件或其内容上传到 PicSizeKit 或图床服务。', '编辑器使用临时浏览器内存和图片地址，不提供云端保存或服务器恢复。关闭或刷新页面会结束编辑会话；已下载文件保留在你的设备上，直到你自行删除。', '默认从输出图片移除 EXIF 元数据。JPEG 转 JPEG 时可选择保留，分享下载结果前请检查这一设置。'] },
        { heading: '网页分发与访问数据', paragraphs: ['网站由 Cloudflare 托管和分发。加载网页时，IP 地址、请求网址、浏览器信息及请求时间等普通连接信息会发送给托管基础设施。Cloudflare 可能处理提供服务和保护网站所需的技术与安全数据。这与图片内容不同，编辑器不会上传图片内容。', '基础设施数据的处理、保留及跨境处理适用服务提供方的相关政策。我们不为服务提供方控制的记录承诺固定保留期限。'], links: [{ label: 'Cloudflare 隐私政策', href: cloudflare }] },
        { heading: 'Cookie、本地存储与统计', paragraphs: ['当前编辑器不设置广告或分析 Cookie，也不会将图片存入 localStorage。界面语言由网址决定。旧版曾使用 picsizekit-language-v2 保存语言偏好，当前版本不读取该值，你可通过浏览器的网站数据设置将其删除。', '托管或安全功能可能按服务提供方政策使用必要的技术存储。当前应用未接入第三方统计脚本。'] },
        { heading: '广告与用户选择', paragraphs: ['截至下方更新日期，应用已发布 ads.txt 授权文件，但尚未加载 Google AdSense 广告脚本。ads.txt 文件本身不会展示广告，也不会设置广告 Cookie。', '如果启用 Google 广告，包括 Google 在内的第三方供应商可能根据用户此前访问本网站或其他网站的情况，使用 Cookie 提供广告。Google 广告 Cookie 可用于 Google 及其合作伙伴的个性化广告。你可以通过 Google 我的广告中心管理个性化广告，也可通过 AboutAds 查看第三方广告退出选项。', '启用广告前，我们会根据实际使用的服务更新本政策，并提供适用的告知及同意管理控件。在需要用户同意的情况下，广告将受你的同意选择约束。隐私政策页面本身不用于收集同意。'], links: [{ label: 'Google 如何使用合作网站的信息', href: googleData }, { label: 'Google 我的广告中心', href: adChoices }, { label: '第三方广告选择', href: 'https://www.aboutads.info/choices/' }] },
        { heading: '反馈与外部链接', paragraphs: ['发送邮件至 henuqin@gmail.com 后，维护者会收到你的邮箱地址、消息及附件，用于处理请求和回复。联系邮箱使用 Gmail，邮件处理适用 Google 的相关政策。邮件会保留在支持邮箱中，除非被删除；你可以通过邮件请求删除相关通信，服务提供方控制的记录和备份遵循其自身规则。请仅提供请求所需的信息。', '通过 GitHub 提交 Issue 后，维护者可读取你主动提供的信息以处理反馈。问题及附件公开可见，其保留和删除受 GitHub 的相关机制约束，请勿发布敏感信息。', '访问外部链接后，将适用对应服务自身的数据处理规则。'], links: [emailLink, { label: 'Google 隐私政策', href: 'https://policies.google.com/privacy' }, { label: 'GitHub 隐私声明', href: githubPrivacy }] },
        { heading: '你的选择与政策更新', paragraphs: ['你可以清除浏览器中的本站数据、关闭编辑器，并通过设备管理工具删除下载文件。PicSizeKit 没有可供取回或删除的处理图片服务器副本。如需询问或处理通过反馈渠道提供的信息，请联系维护者，并避免公开敏感细节。', '当我们的处理方式变化时，会更新本页面；下方日期表示最近修订时间。'] },
      ],
    },
  },
};
