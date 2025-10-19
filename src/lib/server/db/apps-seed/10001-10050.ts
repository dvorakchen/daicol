import { AppCategories, AppStatus } from '$lib/share/app.ts';
import { sql } from 'drizzle-orm';

const appSeeds = [
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
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10001/handled.webp',
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
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10002/handled.webp',
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
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10003/handled.webp',
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
		originImg: '/imgs/original-snoopy.webp',
		handledImg: '/imgs/10004/handled.webp',
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
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10005/handled.webp',
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
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10006/handled.webp',
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
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10007/handled.webp',
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
		name: '森林人像写真',
		category: AppCategories.EnhanceImages,
		description: '生成极具艺术感的楚辞山鬼主题人像写真',
		seoKeywords: [
			'楚辞山鬼写真',
			'暗黑森林人像AI',
			'油画质感梦核写真',
			'高级感艺术人像生成',
			'强光影对比AI艺术',
			'UE5电影级质感人像',
			'意识流惊悚美学',
			'AI绘画高清Prompt'
		],
		seoDescription:
			'生成极具艺术感的楚辞山鬼主题人像写真。融合油画质感、梦核美学与惊悚元素，实现强光影对比、微距面部聚焦和UE5电影级质感。满足您对高级、意识流AI艺术的创作需求。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10008/handled.webp',
		icon: '/imgs/10008/icon.webp',
		barImg: '/imgs/10008/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 199,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['森林', '写真', '艺术', '楚辞山鬼'],
		prompt:
			'参考图片人物的脸。昏暗的森林里，人像写真，全身相，虚实变化，光影交错。楚辞山鬼，长头发，超长耳坠，碎发，超多条细长飞舞的发带，宽松纱衣，露出锁骨肩膀，原始，野性，生命力。线条清晰，明暗对比，超高清，高级感，面部特写，最高画质，朦胧感，微距镜头，面部阴影，面部聚焦，丰满，垂眸，凌乱发丝，高质量，油画质感，细腻肌理，仙气灵气围绕着，油画渲染效果。HDR写实质感，不合逻辑，珠光，反光，暗夜，抽象，意识流，梦核，光线暗、能见度低，有噪点暗角。艺术感强。画面有辉光、耀光、雾感，融合惊悚与梦核元素，梦核美学，数字噪音与失真效果，从错误中寻找创意，对现有系统的颠覆与重塑，强烈的光影对比，仰镜头，强烈的对比色碰撞，惊艳，意识流，随机背景，柔和侧光渲染，写实，失真故障质感暗金色点缀，空间交错、电影镜头、(真实感: 1.5)，柔和的色彩，（鱼眼: 1.1)，全景航拍，微光，宿命感，华丽，曜变，UE5渲染，电影级质感，胶片质感。'
	},
	{
		routeId: 10009,
		name: '老照片修复',
		category: AppCategories.EnhanceImages,
		description: '将您的旧照片转化为充满活力色彩分级的高质量图像',
		seoKeywords: [
			'老照片修复专业',
			'顶级肖像摄影风格',
			'照片质量提升AI',
			'现代色彩分级',
			'专业摄影棚效果',
			'保留人物环境修复',
			'老照片高清重塑',
			'摄影级图像增强'
		],
		seoDescription:
			'AI照片修复，完全保留原场景中人物、服装、姿势和环境。将您的旧照片转化为顶级肖像摄影师使用现代专业设备拍摄的，拥有充满活力色彩分级的高质量图像。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-2.webp',
		handledImg: '/imgs/10009/handled.webp',
		icon: '/imgs/10009/icon.webp',
		barImg: '/imgs/10009/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 199,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['修复', '写真', '照片', '复古'],
		prompt:
			'修复这张照片。目标是在完全保留原场景中人物、服装、姿势和环境的前提下，使其看起来仿佛是由顶级肖像摄影师使用现代专业设备和充满活力的色彩分级风格在今天拍摄的。不要更改场景中的任何元素，而是从根本上提升图像捕捉的质量。'
	},
	{
		routeId: 10010,
		name: '古风油画写真',
		category: AppCategories.EnhanceImages,
		description: '极致超古风油画美学',
		seoKeywords: [
			'超古风油画',
			'厚涂水粉技法',
			'丁达尔效应古风',
			'树枝角色仰视',
			'低饱和高对比油画',
			'人物光影层次感',
			'雾胧景深古风',
			'长发服饰发饰保留'
		],
		seoDescription:
			'极致超古风油画美学：使用厚涂水粉技法，展现颜料涂抹质感。捕捉低空仰视角度下丁达尔效应光影，营造雾胧景深。完美保留角色发型服饰细节，突出高氛围感主体。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10010/handled.webp',
		icon: '/imgs/10010/icon.webp',
		barImg: '/imgs/10010/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 189,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['油画', '写真', '古风'],
		prompt:
			'完整保留角色发型和服饰包括发饰。参考有点油画风格，使用厚度和晕染水粉技法，展现出颜料的涂抹质感，营造超古风主义美学的高氛围感和层次感，低空仰视角度。密密匝匝的树叶和树冠，树叶缝隙中撒下阳光形成丁达尔效应，角色闲适地坐在较粗的一处树枝上，低头，脸上有光影，微微俯身看着镜头，一只手抬起扶着树干，裙摆顺着树枝垂下，裙角随风而去荡起，延伸至画面外，柔顺的长发，精致的头饰，素净的妆容，慵懒，深处，仰式视觉。皮肤苍白，绿意盎然的空间，周围光线营造出雾胧的景深氛围，突出人物主体，弱化边缘背景，近实远虚，雾感光源，颗粒感，丁达尔效应光线，高对比度，低保和。比例9:16  油画风格'
	},
	{
		routeId: 10011,
		name: '大头贴四宫格',
		category: AppCategories.CreativeDesign,
		description: '生成漫画风格大头贴四宫格',
		seoKeywords: [
			'四宫格漫画生成',
			'大头贴风格AI',
			'夸张表情动作漫画',
			'可爱彩色背景自拍',
			'个性化贴纸相机',
			'四格漫画制作',
			'拍大头贴滤镜',
			'Q版人物表情包'
		],
		seoDescription:
			'一键生成搞怪可爱的四宫格大头贴漫画！捕捉夸张表情和动作，搭配彩色不重复背景。制作专属的个性化四格漫画和表情包。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10011/handled.webp',
		icon: '/imgs/10011/icon.webp',
		barImg: '/imgs/10011/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 189,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['大头贴', '漫画', '四宫格'],
		prompt:
			'生成大头贴四宫格漫画，每张照片中的人物有不同的夸张表情和动作，每一格的背景为不相同拍摄大头贴的彩色可爱环境。'
	},
	{
		routeId: 10012,
		name: '时尚冰箱写真',
		category: AppCategories.EnhanceImages,
		description: '生成忧郁克制时尚摄影',
		seoKeywords: [
			'清冷时尚特写',
			'忧郁克制时尚摄影',
			'报纸吊带设计',
			'三分法构图人像',
			'冰箱冷白光剪影',
			'低胸露脐时尚',
			'侧脸低头特写',
			'鸭舌帽造型摆拍'
		],
		seoDescription:
			'清冷克制的时尚大片。三分法构图特写，报纸吊带搭配鸭舌帽，在冰箱冷白光前形成剪影氛围。完美侧脸，眼神忧郁，营造出高级的清冷时尚感。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-asian-gril.webp',
		handledImg: '/imgs/10012/handled.webp',
		icon: '/imgs/10012/icon.webp',
		barImg: '/imgs/10012/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 189,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['忧郁', '摄影', '时尚', '冰箱'],
		prompt:
			'使用参考图片人物的脸。这是一张三分法构图的完美杰作，微微俯拍视角，上半身特写，侧身站立，上身紧贴冰箱，主体侧脸，主体轻微低头，不看镜头，主体的脸型和身材不变，主体穿着报纸做成的紧身时尚吊带，超级短款设计，低胸半球设计，露出肚脐，很凸显身材。戴着一个米白色的鸭舌帽，帽沿微微向下快挡住眼睛，在冰箱前摆拍，背景是一个立式冰箱，环境光暗，冰箱门开着，冰箱中有一些啤酒和饮料。冰箱自然的冷白光很亮，照射主体，形成轻微剪影效果的氛围感，能看清主体的侧脸，眼神有点忧郁。总体体现出清冷感。营造忧郁而克制的时尚氛围。'
	},
	{
		routeId: 10013,
		name: '治愈系宠物雪景',
		category: AppCategories.EnhanceImages,
		description: '捕捉宠物治愈系雪景',
		seoKeywords: [
			'宠物雪景写真',
			'猫咪冬日海边',
			'治愈系宠物照',
			'雪球宠物头顶',
			'蓝色围巾猫咪',
			'富士滤镜宠物',
			'童话雪景猫',
			'惬意宠物特写',
			'温暖治愈猫咪'
		],
		seoDescription:
			'捕捉宠物冬日海边浪漫！特写猫咪惬意神态，头顶雪球，蓝色围巾随风轻扬。富士滤镜下，雪景如童话般宁静治愈，感受独一份的温暖美好。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-cat.webp',
		handledImg: '/imgs/10013/handled.webp',
		icon: '/imgs/10013/icon.webp',
		barImg: '/imgs/10013/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 189,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['雪景', '动物', '治愈'],
		prompt:
			'画面中，将宠物主体抠出，视角拉近只露出宠物上半身，宠物神态惬意又满足，头顶还稳稳顶着一个小雪球，脖子上围着一条蓝色的针织围巾，围巾被风吹起，可爱又治愈。背景是冬日的海边雪景，海面平静，岸边的岩石与地面都覆盖着皑皑白雪，在柔和的光线映照下，整个场景像童话般宁静美好，仿佛猫咪正享受着这独一份的冬日浪漫，让人感受到满满的温暖与治愈。整体叠加一层富士滤镜'
	},
	{
		routeId: 10014,
		name: '玫瑰壁画摄影',
		category: AppCategories.EnhanceImages,
		description: '捕捉宠物治愈系雪景',
		seoKeywords: [
			'AI绘画超广角',
			'移除背景保留特征',
			'玫瑰花头发壁画',
			'梦幻城堡镜面',
			'夏日晴天棉花糖云朵',
			'8K写实大师级',
			'人像近景全景融合',
			'大景深场景生成'
		],
		seoDescription:
			'8K写实大师级AI绘画，移除原背景并完美保留人物外貌特征。生成超广角宏大场景：夏日晴空下的梦幻城堡、镜面地面、玫瑰花构成的巨型壁画。捕捉人物近景与壁画全景的震撼融合。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-asian-gril.webp',
		handledImg: '/imgs/10014/handled.webp',
		icon: '/imgs/10014/icon.webp',
		barImg: '/imgs/10014/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 189,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['玫瑰', '壁画', '梦幻'],
		prompt:
			'去除图中背景，保留人物所有外貌特征不变。夏日晴天，阳光明媚，棉花糖云朵，梦幻城堡的一面墙壁上画着一个巨大图中人物上半身（人物的头发部分由大量的茂盛的和图中人物一样颜色玫瑰花构成，花朵密集，包裹着人物的头顶。这些花密密麻麻覆盖了整个墙头，茂密的长长的花枝垂落下来，地上掉落很多花瓣，花朵细节逼真，花根在一侧墙角一侧），图中人物看着这巨画，人物呈现近景，同时保留巨画的全景。（人物动作符合人物自然工学）背景是城堡，地面是宽阔的无边巨大的镜面，大景深。超广角，写实风格，8k超清，色彩艳丽，大师级作品。'
	},
	{
		routeId: 10015,
		name: '毛绒玩偶挂件',
		category: AppCategories.CreativeDesign,
		description: '按照人物还原为毛绒玩偶挂件',
		seoKeywords: [
			'毛绒玩偶定制',
			'玩偶挂件制作',
			'图片转毛绒公仔',
			'照片定制挂件',
			'去除背景玩偶',
			'个性化毛绒挂件',
			'定制玩偶礼品',
			'毛绒周边制作'
		],
		seoDescription:
			'将您的照片或图片定制为毛绒玩偶挂件！智能去除背景，只保留主体，打造独一无二的个性化毛绒公仔。送礼自用两相宜！',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10015/handled.webp',
		icon: '/imgs/10015/icon.webp',
		barImg: '/imgs/10015/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 189,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['玩偶', '挂件'],
		prompt: '转换为毛绒玩偶挂件，去除背景'
	},
	{
		routeId: 10016,
		name: '宝丽来照片墙',
		category: AppCategories.CreativeDesign,
		description: '电影平面旅行场景照片墙',
		seoKeywords: [
			'8K电影照片墙',
			'宝丽来旅行照片',
			'法罗群岛圣托里尼',
			'冰岛摩洛哥摄影',
			'哈苏135mm',
			'柯达Vision3 250D',
			'lomography颗粒',
			'AI照片墙生成',
			'超逼真电影感'
		],
		seoDescription:
			'生成超逼真8K电影平面照片墙，包含50张宝丽来旅行场景照片（法罗群岛、圣托里尼等）。采用哈苏、柯达Vision3胶片风格，捕捉温暖触感的光影与日记细节。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-asian-gril.webp',
		handledImg: '/imgs/10016/handled.webp',
		icon: '/imgs/10016/icon.webp',
		barImg: '/imgs/10016/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 189,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['旅行', '照片墙'],
		prompt:
			'使用参考图中人物的脸，生成超逼真的8K 电影平面照片墙，包含50张宝丽来照片，照片里展现参考人物在旅行场景中的场景﹣﹣法罗群岛、圣托里尼岛、冰岛、日本、摩洛哥、瑞士阿尔卑斯山、巴厘岛、巴黎、纽约﹣﹣具有独特的灯光、手写标题、日记和欢乐；哈苏135mm、柯达 Vision3 250D、lomography 颗粒、温暖的触觉真实感、充满活力和生机。人物只在照片墙内的宝丽来照片中出现，不显示在照片墙前方'
	},
	{
		routeId: 10017,
		name: '水下时尚写真',
		category: AppCategories.CreativeDesign,
		description: '极致水后时尚人物写真',
		seoKeywords: [
			'水下时尚写真',
			'鱼缸人物特写',
			'小丑鱼互动摄影',
			'清透水感写真',
			'暗调高级感人像',
			'水面折射光纹',
			'棕黑色系时尚',
			'极近距离头部特写',
			'梦幻安静水生摄影'
		],
		seoDescription:
			'极致水后时尚人物写真：极近距离头部特写，脸部水光清透。小丑鱼在鱼缸前景穿梭，手部互动。整体棕黑色系暗调，水面折射出碎光斑点，营造梦幻安静的高级感光影写意大片。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original.webp',
		handledImg: '/imgs/10017/handled.webp',
		icon: '/imgs/10017/icon.webp',
		barImg: '/imgs/10017/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 210,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['写真', '摄影', '水下'],
		prompt:
			'保持脸部不变，水后时尚人物写真，人物头部特写，极近距离拍摄，人物神态自然松弛，清透水感，微光在面部高光浮动。数尾小丑鱼在鱼缸前景缓缓穿梭，尾鳍透明灵动，人物用手和小鱼互动，一只手贴在玻璃上，水面折射出晃动光纹，碎光斑点在脸庞跳跃，水下漂浮粒子环绕，透明水肌理清晰反光。整体氛围梦幻安静，棕黑色系暗调，高级感浓厚，漂浮失焦、动态模糊与细腻胶片颗粒交错，光影写意杰作。整体就是人物在鱼缸玻璃后，和小鱼互动。'
	},
	{
		routeId: 10018,
		name: '洛丽塔宠物摄影',
		category: AppCategories.CreativeDesign,
		description: '洛丽塔宠物摄影浪漫古典',
		seoKeywords: [
			"洛丽塔宠物摄影", "猫咪洛丽塔服装", "复古宠物写真", "粉色蕾丝猫咪", "贵族风宠物照", "优雅猫咪特写", "奢华宠物造型", "中世纪风格宠物"
		],
		seoDescription:
			'极致洛丽塔宠物摄影，捕捉猫咪身着粉色蕾丝华服的优雅瞬间。搭配复古茶具、花艺与贵族家具，营造浪漫古典的奢华氛围。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-cat.webp',
		handledImg: '/imgs/10018/handled.webp',
		icon: '/imgs/10018/icon.webp',
		barImg: '/imgs/10018/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 210,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['宠物', '摄影', '洛丽塔'],
		prompt:
			'帮我生成图片：以这张宠物的照片生成一张洛丽塔风格的宠物特写摄影。猫身穿 粉色的蕾丝服饰  ，搭配同风格帽、造型精致华丽 。周围有粉色花艺、复古茶具、中世纪贵族家具，背景是古典装饰，整体营造出优雅浪漫的复古氛围，保持宠物原来的样子。原比例。'
	},
	{
		routeId: 10019,
		name: '秋日动物摄影',
		category: AppCategories.CreativeDesign,
		description: '秋日动物摄影头顶枫叶，围巾环绕',
		seoKeywords: [
			"秋日动物摄影", "枫叶动物写真", "围巾宠物照", "阳光毛发光晕", "秋景背景替换", "抠图主体突出", "温顺动物神情", "户外碎石路面", "橙红色枫叶", "光影对比摄影"
		],
		seoDescription:
			'极致秋日动物写真！主体安静待着，头顶枫叶、围巾环绕，毛发镀上暖光，背景替换为洒满橙红色枫叶的碎石路面。捕捉宠物好奇温顺神情，呈现阳光下鲜明光影对比与浓郁秋日氛围。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-cat.webp',
		handledImg: '/imgs/10019/handled.webp',
		icon: '/imgs/10019/icon.webp',
		barImg: '/imgs/10019/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 200,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['宠物', '摄影', '秋日', '枫叶'],
		prompt:
			'将主体抠出，画面里，主体安静地待着，头顶俏皮地顶着一片色泽鲜亮的大枫叶，脖子上还围着一条棕色的围巾。阳光透过周围的绿植洒下来，给主体的毛发镀上了一层暖融融的光晕，它睁着眼睛，神情透着几分好奇与温顺，替换背景，背景是秋日户外的地面场景：地面由带有碎石的灰色路面构成，部分区域有开裂、斑驳的质感，旁边散落着大量色泽鲜亮的橙红色枫叶，叶片形态各异，有的完整、有的微微卷曲，为画面增添了浓郁的秋日氛围。画面的明暗关系由侧上方的阳光主导，呈现出鲜明的光影对比与柔和过渡：主体被阳光直接照射的一侧（尤其是面部、耳朵和围巾的受光面），毛发与织物泛着暖金色的明亮高光，轮廓清晰且富有蓬松的质感；而未被阳光直射的另一侧（如身体的背光面、围巾的褶皱暗部），则形成柔和的阴影，让明暗之间的过渡自然、不生硬。背景中，主体与墙面也因光线产生明暗层次，背阴的墙面与地面则偏暗，突出了主体地位'
	},
	{
		routeId: 10020,
		name: '皇冠王子猫',
		category: AppCategories.CreativeDesign,
		description: '捕捉皇冠王子猫的奢华瞬间',
		seoKeywords: [
			"皇冠王子猫", "宫廷风宠物摄影", "复古油画猫咪", "奢华皇家布景", "镜面倒影猫", "宠物艺术照", "古典宫殿猫", "梦幻光影宠物"
		],
		seoDescription:
			'捕捉皇冠王子猫的奢华瞬间！在宫廷风背景中，复古油画质感展现身着王子服饰的猫咪，优雅地对着镜子端详自己，倒影与本体服装完美一致。一张融合古典与梦幻的皇家宠物艺术照。',
		model: 'seedream-4',
		source: '字节跳动',
		originImg: '/imgs/original-cat.webp',
		handledImg: '/imgs/10020/handled.webp',
		icon: '/imgs/10020/icon.webp',
		barImg: '/imgs/10020/banner.webp',
		rate: sql`'4.5'::numeric`,
		useCount: 200,
		points: 1,
		status: AppStatus.Enabled,
		tags: ['宠物', '王子', '宫廷', '宫殿'],
		prompt:
			'在奢华无比的宫廷风背景中，复古的台面上，一只头戴璀璨皇冠、身着王子服饰的小猫优雅地坐着，正对着一面精美的镜子端详自己，镜子中有小猫倒影，倒影的服装和本体一致。周围环绕着华丽至极的皇室布景，光影交错，营造出如梦如幻的氛围，每一处细节都散发着古典油画的质感。'
	}
];

export default appSeeds;
