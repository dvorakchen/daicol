import type { PromptBaseIntro, PromptBaseIntroGenerator } from '$lib/server/generator/index.ts';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

export class DeepSeekGenerator implements PromptBaseIntroGenerator {
	async genInfoByPrompt(prompt: string): Promise<PromptBaseIntro> {
		const openai = new OpenAI({
			baseURL: 'https://api.deepseek.com',
			apiKey: env.DEEPSEEK_API_KEY
		});

		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'system',
					content: `用户会输入一段描述，根据描述，帮我生成适用于 SEO 的keywords 和 description, keywords 用数组方式一行给出，description不要太长。
生成一个简短的标题，在10个字以内，要高度概括内容。
生成一个简短的介绍，在20个字以内，简单说明主要内容。
生成数个 tag 词语，用于检索内容。如："写真"，"宠物"，"甜妹"，和内容相关的词语

EXAMPLE INPUT: 
帮我生成图片。不要改变图一的脸！参考图二，使用图二的构图！忽略图二的五官！使用图一的脸！使用图一的脸！重复！使用图一的脸！使用图二的构图！
清冷感少女脸部特写，黑色自然碎发垂落脸颊，妆容是清透伪素颜妆（粉调淡腮红+水润粉唇+纤长自然睫毛+大直径棕褐色美瞳），皮肤呈现通透的牛奶肌质感；光线为柔和的侧光（在鼻梁、脸颊形成自然高光，发丝边缘带轻微光晕），背景是浅淡的冷调纯色墙面，画面聚焦于面部细节（唇色光泽、睫毛纹理、皮肤肌理），正视镜头。整体氛围干净空灵，高清细腻，竖构图，3:4

EXAMPLE JSON OUTPUT:
{
  "keywords": ["keyword_1", "keyword_2"],
  "description": "description",
  "title": "标题",
  "summary": "简短的介绍",
  "tags": "写真"，"宠物"，"甜妹"]
}`
				},
				{ role: 'user', content: prompt }
			],
			model: 'deepseek-chat',
			response_format: {
				type: 'json_object'
			}
		});

		const res = completion.choices[0].message.content ?? '';

		const json: PromptBaseIntro = JSON.parse(res);

		return json;
	}
}
