import { db } from '$lib/server/db/index.ts';
// import { users } from '$lib/server/db/schema/users.ts';
import logger from '$lib/server/log.ts';
// import { UserPermissions } from '$lib/share/user.ts';
// import { env } from '$env/dynamic/private';
import { apps } from '$lib/server/db/schema/apps.ts';
import { AppCategories, AppStatus } from '$lib/share/app.ts';
import { eq, sql } from 'drizzle-orm';

export async function plantingSeed() {
	logger.info(`plainting database seed`);
	// await db.transaction(async (tx) => {
	// 	const count = await tx.$count(users);
	// 	if (count > 0) {
	// 		logger.info('table users already has data, skip plainting');
	// 		return;
	// 	}
	// 	logger.info('table users has not data, plainting');

	// 	const USERNAME = 'ADMIN';
	// 	const PHONE_NUMBER = env.INIT_ADMIN_PHONE;
	// 	await tx.insert(users).values({
	// 		authId: '42a290bf-5b9c-4f9a-a49f-14a458273d89',
	// 		userName: USERNAME,
	// 		phoneNumber: PHONE_NUMBER,
	// 		permissions: [UserPermissions.BaseAccess, UserPermissions.AdminAccess]
	// 	});
	// 	logger.info(`table users plainted, user_name: ${USERNAME}, phone_number: ${PHONE_NUMBER}`);
	// });

	await db.transaction(async (tx) => {
		const count = await tx.$count(apps);
		if (count > 0) {
			logger.info('table apps already has data, skip plainting');
			return;
		}
		logger.info('table apps has not data, plainting');

		for (const item of initApps) {
			const existApp = await tx.query.apps.findFirst({
				where: eq(apps.routeId, item.routeId)
			});

			if (!existApp) {
				await tx.insert(apps).values(item);
			}
		}
	});
}
const initApps = [
	{
		routeId: 10001,
		name: '手办生成',
		category: AppCategories.CreativeDesign,
		description: '用任意图片生成真实手办',
		seoKeywords: [
			'doubao-seedream',
			'Nano Banana',
			'手办生成',
			'AI手办',
			'创意设计',
			'3D模型生成',
			'个性化手办',
			'虚拟模型',
			'动漫周边设计',
			'模型定制',
			'AI建模',
			'3D打印'
		],
		seoDescription:
			'Nano Banana 手办生成与创意设计应用！利用顶尖AI技术，将您的想法一键转化为高精度3D手办模型。实现个性化手办定制、动漫周边设计和虚拟模型创作。您的专属AI建模工作室，让创意直达3D打印！',
		model: 'seedream-4',
		source: '字节跳动',
		icon: '/imgs/10001/icon.webp',
		barImg: '/imgs/10001/banner.webp',
		rate: sql`'5.0'::numeric`,
		useCount: 230,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['手办'],
		prompt:
			'Create a 1/7 scale commercialized figurine of the characters in the picture, in a realistic style, in a real environment. The figurine is placed on a computer desk. The figurine has a round transparent acrylic base, with no text on the base. The content on the computer screen is a 3D modeling process of this figurine. Next to the computer screen is a toy packaging box, designed in a style reminisc'
	},
	{
		routeId: 10002,
		name: '日式四宫格漫画',
		category: AppCategories.CreativeDesign,
		description: '使用人物图片生成日式四宫格漫画',
		seoKeywords: [
			'豆包AI',
			'四宫格漫画',
			'日式漫画',
			'AI漫画',
			'漫画生成器',
			'创意设计',
			'漫画分镜',
			'故事创作',
			'漫画应用',
			'动漫风格',
			'视觉叙事'
		],
		seoDescription:
			'日式四宫格漫画 & 创意设计 神器！一键将文字想法转化为日系动漫风四格漫画。快速生成漫画分镜，轻松进行故事创作和视觉叙事。你的专属AI漫画生成器，让创意无限放大！',
		model: 'seedream-4',
		source: '字节跳动',
		icon: '/imgs/10002/icon.webp',
		barImg: '/imgs/10002/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 219,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['漫画'],
		prompt:
			'四宫格，将原图主体转换成四宫格漫画分镜布局，日式少年漫画风格（类似 Jump 系笔触），每格呈现不同生动表情（包含惊讶张嘴、傲娇瞪眼、害羞带红晕、兴奋怒吼等神态），搭配漫画特效元素（速度线、日文拟声词 、感叹符号 “!!！” 等），四格中间交汇处有爱心边框嵌套原图主体的完整抠图形象，整体为手绘漫画质感、色彩鲜亮，AI 生成宫格漫画形式。'
	},
	{
		routeId: 10003,
		name: '冷艳写真',
		category: AppCategories.EnhanceImages,
		description: '使用人物图片生成冷艳风格的写真',
		seoKeywords: [
			'豆包AI',
			'冷艳写真',
			'创意设计',
			'AI写真',
			'艺术照生成',
			'赛博朋克',
			'极简主义',
			'风格化人像',
			'AI P图',
			'虚拟模特',
			'摄影应用'
		],
		seoDescription:
			'冷艳写真 & 创意设计 专属应用！一键生成高级感、赛博朋克、极简主义等风格化人像。告别复杂P图，用AI快速打造独一无二的冷艳写真和艺术照。您的虚拟模特和设计灵感库！',
		model: 'seedream-4',
		source: '字节跳动',
		icon: '/imgs/10003/icon.webp',
		barImg: '/imgs/10003/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 210,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['美图'],
		prompt:
			'使用参考图片人物的脸;写实风格人像摄影，纯欲风格，乌黑黑长直发女性，厚齐刘海，发丝顺滑自然、光泽感清晰；浅灰色纹理上衣，黑色精致颈饰（黑色蕾丝颈链+黑色小吊坠），姿势冷艳：双臂交叉于身前，姿态优雅冷艳，微微侧身，头微微上扬，眼神微俯视镜头，散发冷艳高傲气场；肤质细腻光滑，五官精致立体；妆容突出：漂亮眼妆，纤长睫毛，高光鼻梁，雾面口红，眼神冷艳神秘，带压迫感；背景由多幅黑白动漫人物插画构成，风格各异，眼神或灵动或冷峻，与主体相互映衬；现实与二次元融合氛围，打破次元壁，奇幻感与真实感共存；柔和光线，高清质感，整体饱和度低，偏冷色调时尚写真氛围，9:16比例，主体写实。'
	},
	{
		routeId: 10004,
		name: '地标建筑',
		category: AppCategories.CreativeDesign,
		description: '用任意图片的主体生成地标建筑',
		seoKeywords: [
			'豆包AI',
			'地标建筑设计',
			'创意设计',
			'建筑概念图',
			'AI建筑生成',
			'城市规划',
			'未来建筑',
			'景观设计',
			'建筑可视化',
			'AI绘图',
			'设计灵感'
		],
		seoDescription:
			'地标建筑 & 创意设计 专属工具！一键生成震撼的未来建筑和城市地标概念图。快速获取建筑设计灵感，轻松实现景观设计和建筑可视化。您的专属AI建筑生成器，激发无限创意，革新城市规划！',
		model: 'seedream-4',
		source: '字节跳动',
		icon: '/imgs/10004/icon.webp',
		barImg: '/imgs/10004/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 210,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['地标', '建筑'],
		prompt:
			'帮我生成图片：图片中的主体放大成巨大，场景是建筑工地，主体有脚手架环绕，脚手架上有工人在活动.原比例.主体写实'
	},
	{
		routeId: 10005,
		name: '清醒系阳光特写',
		category: AppCategories.EnhanceImages,
		description: '生成人物在阳光下的清醒系阳光特写',
		seoKeywords: [
			'萌萌少女特写',
			'细肌十肤',
			'真实质感',
			'魅惑高冷',
			'清醒系阳光',
			'微仰视',
			'散发飘动',
			'眼神闪光',
			'极蓝噪点',
			'蓝白色通透',
			'脸部细节',
			'AI写真'
		],
		seoDescription:
			'【细肌十肤·魅惑高冷少女特写】 真实质感AI写真，微仰视捕捉少女脸部特写。清醒系阳光背景，散乱发丝随风飘动，眼神闪烁魅惑高冷。画面具备极蓝噪点和蓝白色通透的电影级画质。',
		model: 'seedream-4',
		source: '字节跳动',
		icon: '/imgs/10005/icon.webp',
		barImg: '/imgs/10005/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 214,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['美图', '阳光'],
		prompt:
			'帮我生成图片：采用细肌”十肤真实质感的风格，画面中展现了一个不改变原图形象的萌萌少女的脸部特写，通过微仰视的镜头角度进行呈现。人物微微抬并且人物不占太多画面。背景营造出清醒系且阳光的场景氛围，少女有着散乱的头发风飘动的感觉，发型不变，发丝随风飘动，不改变原片发色。她的眼神闪闪发光450其中带着阳光和魅惑的情绪，尽显魅惑高冷的气质。画面着重句勒了少女的面部细节高先处理十分讲究，同时画面虽现出带有影机极蓝噪点的画质，并且有着蓝白色通送效果。原比例'
	},
	{
		routeId: 10006,
		name: 'BJD娃娃',
		category: AppCategories.EnhanceImages,
		description: '生成蓝色湿发BJD娃娃人物',
		seoKeywords: [
			'BJD娃娃少女',
			'妖冶特写',
			'细腻皮肤真实质感',
			'腹黑高冷',
			'俯视角度',
			'暗色系阴郁',
			'湿发粘脸',
			'危险眷恋眼神',
			'极蓝噪点',
			'强烈蓝白色曝光',
			'面部细节刻画',
			'AI艺术肖像'
		],
		seoDescription:
			'【BJD娃娃·腹黑妖冶特写】 采用细腻皮肤真实质感风格，以俯视角度呈现BJD娃娃般妖冶少女的脸部特写。背景暗色阴郁，湿漉长发粘附于脸。少女眼神朦胧，透出危险与眷恋的腹黑高冷气质。画面强调极致面部细节，融合极蓝噪点和强烈蓝白色曝光，营造独特的电影感艺术肖像',
		model: 'seedream-4',
		source: '字节跳动',
		icon: '/imgs/10006/icon.webp',
		barImg: '/imgs/10006/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 213,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['BJD娃娃少女', '美图', '阴郁', '蓝色'],
		prompt:
			'使用图片人物的脸，帮我生成图片:采用细腻皮肤真实质感的风格，画面中展现了一个bjd娃娃形象的妖治少少女的脸部特写，通过俯视的镜头角度进行虽现。背景为暗色，营造出暗色系且阴郁的场景氛围，少女有着散乱的湿漉漉的长发， 发丝粘在脸上，不改变原片发色。他的眼神胧，其中带着危险和眷恋的情绪，尽显腹黑高冷的气质。画面着重句勒了少女的面部细节，高先处理十分讲究，同时画面虽现出带有摄影机极蓝噪点的画质，并且有着强烈的蓝白色曝先效果。原比例。'
	},
	{
		routeId: 10007,
		name: '宫崎骏画风',
		category: AppCategories.CreativeDesign,
		description: '将图片转为宫崎骏动画的风格',
		seoKeywords: [
			'宫崎骏画风转换',
			'吉卜力风格滤镜',
			'AI动画风格化',
			'人物转宫崎骏',
			'背景转吉卜力',
			'手部细节动画化',
			'衣着一致性转换',
			'高清二次元手绘'
		],
		seoDescription:
			'一键将您的照片转换为宫崎骏动画画风！AI智能保持人物风格完全一致。体验高质量吉卜力风格滤镜，生成专属高清二次元动画图。',
		model: 'seedream-4',
		source: '字节跳动',
		icon: '/imgs/10007/icon.webp',
		barImg: '/imgs/10007/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 203,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['漫画', '动画', '宫崎骏'],
		prompt: '转为宫崎骏动画的画风，人物、手部、背景，衣着保持一致'
	},
	{
		routeId: 10008,
		name: '无缝纹理生成',
		category: AppCategories.CreativeDesign,
		keywords: ['纹理', '材质', '无缝贴图', '背景'],
		description: '根据描述生成可重复平铺的PBR材质或背景纹理',
		seoKeywords: ['纹理贴图', 'PBR材质', '游戏设计', '3D建模', '创意设计'],
		seoDescription: '无缝纹理生成，为游戏开发者和3D设计师提供高质量、可无限平铺的背景和材质纹理。',
		model: 'texture-maker-2',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 400,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['纹理', 'PBR', '3D', '游戏', '无缝'],
		prompt: ''
	},
	{
		routeId: 10009,
		name: '情绪可视化',
		category: AppCategories.CreativeDesign,
		keywords: ['情绪', '抽象', '艺术', '心理', '色彩'],
		description: '输入当前情绪和感受，AI将之转化为抽象或具象的视觉艺术作品',
		seoKeywords: ['情绪艺术', '抽象画', '心理疗愈', 'AI创作', '视觉表达'],
		seoDescription: '情绪可视化，用色彩和形状表达你的内心世界。一个独特的艺术疗愈和创意表达工具。',
		model: 'emotion-art-1',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 950,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['情绪', '抽象', '艺术', '心理', '色彩'],
		prompt: ''
	},
	{
		routeId: 10010,
		name: '创意广告海报',
		category: AppCategories.CreativeDesign,
		keywords: ['海报', '广告', '宣传图', '创意合成'],
		description: '根据产品和宣传目标，生成极具视觉冲击力的创意广告海报',
		seoKeywords: ['海报设计', '广告创意', '营销设计', 'AI合成', '视觉营销'],
		seoDescription:
			'创意广告海报生成，让你的产品宣传图瞬间抓住眼球。专业级合成效果，引爆社交媒体。',
		model: 'poster-creator-3',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 1700,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['海报', '广告', '营销', '创意', '合成'],
		prompt: ''
	},
	{
		routeId: 10011,
		name: '虚拟形象设计',
		category: AppCategories.CreativeDesign,
		keywords: ['虚拟形象', '头像', '卡通', 'IP设计'],
		description: '根据用户描述，生成符合设定的二次元或卡通风格虚拟人物形象',
		seoKeywords: ['虚拟人像', 'AI头像', 'IP创作', '二次元', '角色设计'],
		seoDescription: '虚拟形象设计，打造你的专属二次元/卡通角色IP。轻松拥有独特的社交媒体头像。',
		model: 'avatar-maker-2',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 2100,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['虚拟形象', '头像', '二次元', '卡通', 'IP'],
		prompt: ''
	},
	{
		routeId: 10012,
		name: '艺术字纹理化',
		category: AppCategories.CreativeDesign,
		keywords: ['文字特效', '纹理', '材质', '海报'],
		description: '将普通文字转换为具有金属、岩石、火焰等特殊纹理的艺术字',
		seoKeywords: ['文字特效', '艺术字', '纹理化', '创意设计', '海报标题'],
		seoDescription: '艺术字纹理化，让你的文字设计更具震撼力。一键应用逼真的特殊材质效果。',
		model: 'text-texture-1',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 700,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['文字特效', '艺术字', '纹理', '材质', '海报'],
		prompt: ''
	},
	{
		routeId: 10013,
		name: '建筑概念速绘',
		category: AppCategories.CreativeDesign,
		keywords: ['建筑', '概念图', '草图', '景观'],
		description: '输入建筑类型和环境描述，快速生成高质量的建筑概念设计图',
		seoKeywords: ['建筑设计', '概念图', '景观设计', 'AI绘图', '设计草图'],
		seoDescription: '建筑概念速绘，为建筑师和设计师提供快速的初期设计灵感和高质量的概念可视化。',
		model: 'archi-sketch-3',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 350,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['建筑', '概念设计', '草图', '景观', 'AI'],
		prompt: ''
	},
	{
		routeId: 10014,
		name: 'AI配色方案',
		category: AppCategories.CreativeDesign,
		keywords: ['配色', '色彩', '设计', '网站'],
		description: '根据行业或主题关键词，智能生成专业的网站和品牌配色方案',
		seoKeywords: ['配色方案', '色彩设计', 'UI/UX', '品牌色', '创意设计'],
		seoDescription: 'AI配色方案，告别选择困难。智能推荐和谐、专业的色彩组合，提升你的设计质感。',
		model: 'color-palette-1',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 1100,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['配色', '色彩', '设计', 'UI', '品牌'],
		prompt: ''
	},
	{
		routeId: 10015,
		name: '景深模拟器',
		category: AppCategories.CreativeDesign,
		keywords: ['景深', '虚化', '摄影', '后期'],
		description: '为普通照片添加或调整景深效果，模拟单反相机的大光圈虚化',
		seoKeywords: ['景深效果', '照片虚化', 'AI后期', '创意摄影', '图像处理'],
		seoDescription: '景深模拟器，一键让你的手机照片拥有单反级的专业虚化效果，突出主体，美化背景。',
		model: 'depth-of-field-1',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 900,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['摄影', '后期', '景深', '虚化', '照片'],
		prompt: ''
	},
	{
		routeId: 10016,
		name: '几何抽象艺术',
		category: AppCategories.CreativeDesign,
		keywords: ['抽象', '几何', '极简', '艺术'],
		description: '根据颜色和形状的描述，生成极简主义的几何抽象艺术作品',
		seoKeywords: ['抽象艺术', '几何设计', '极简主义', '创意生成', 'AI艺术'],
		seoDescription: '几何抽象艺术，用最纯粹的线条和色彩，创作出富有哲思的极简主义艺术品。',
		model: 'geometric-art-1',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 250,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['抽象', '几何', '极简', '艺术', 'AI'],
		prompt: ''
	},
	{
		routeId: 10017,
		name: '一键卡通化',
		category: AppCategories.CreativeDesign,
		keywords: ['卡通', '动漫', '滤镜', '二次元'],
		description: '上传人像照片，将其转化为各种风格的二次元卡通形象',
		seoKeywords: ['卡通滤镜', '二次元化', '人像转卡通', 'AI美图', '头像制作'],
		seoDescription: '一键卡通化，让你瞬间穿越到二次元世界，生成高质量的动漫风格头像和全身像。',
		model: 'to-anime-filter-2',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 4500,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['卡通', '二次元', '动漫', '滤镜', '头像'],
		prompt: ''
	},
	{
		routeId: 10018,
		name: 'AI排版助手',
		category: AppCategories.CreativeDesign,
		keywords: ['排版', '布局', '设计', '海报'],
		description: '输入图片和文字，AI自动生成多种创意且专业的布局排版设计',
		seoKeywords: ['设计排版', '创意布局', 'AI设计', '海报制作', '平面设计'],
		seoDescription: 'AI排版助手，解决你的设计布局难题。为你的内容提供多种专业、美观的排版方案。',
		model: 'layout-designer-1',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 1600,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['排版', '布局', '设计', '平面', '海报'],
		prompt: ''
	},
	{
		routeId: 10019,
		name: '产品概念渲染',
		category: AppCategories.CreativeDesign,
		keywords: ['产品设计', '渲染', '3D', '概念图'],
		description: '上传产品草图，AI为其生成逼真的材质和场景渲染效果图',
		seoKeywords: ['产品渲染', '概念设计', '3D可视化', 'AI建模', '工业设计'],
		seoDescription: '产品概念渲染，快速将你的产品创意转化为高精度的商业级渲染图，加速产品演示。',
		model: 'product-render-4',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 500,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['产品', '渲染', '3D', '概念', '工业设计'],
		prompt: ''
	},
	{
		routeId: 10020,
		name: '像素艺术转换',
		category: AppCategories.CreativeDesign,
		keywords: ['像素', '复古', '游戏', '艺术'],
		description: '将任意图片转换为各种风格的复古像素艺术（Pixel Art）',
		seoKeywords: ['像素艺术', 'Pixel Art', '复古游戏', 'AI转换', '创意设计'],
		seoDescription: '像素艺术转换，重温经典游戏的魅力。一键将照片变成精美的复古像素画作。',
		model: 'pixel-art-1',
		source: '豆包',
		icon: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
		barImg: '',
		rate: sql`'4.5'::numeric`,
		useCount: 1400,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['像素', 'PixelArt', '复古', '游戏', '艺术'],
		prompt: ''
	}
];
