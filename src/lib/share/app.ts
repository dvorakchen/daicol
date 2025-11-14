export enum AppStatus {
	Enabled = 'Enabled',
	Disabled = 'Disabled',
	Unknowed = 'Unknowed'
}

export enum AppCategories {
	CreativeDesign = '创意设计',
	EnhanceImages = '美图'
}

export enum AccessType {
	PageView = 'PageView',
	ClickGenerate = 'ClickGenerate'
}

export enum RankTypes {
	Week = 'Week',
	Month = 'Month',
	Total = 'Total'
}

export type GetAppFilter = {
	routeId?: number;
	name?: string;
	size: number;
	offset: number;
};

export function promptPlugInRegex() {
	return /\{(\w+?)\(([^)]+?)\)(?:=([\s\S]+?))\}/gm;
}

export type PromptPlugInType = Record<string, { display: string; value: string }>;

export function extractPromptPlugInFromPrompt(prompt: string): PromptPlugInType {
	const matches: PromptPlugInType = {};
	let match;

	const PROMPT_PLUG_IN_REGEX = promptPlugInRegex();
	while ((match = PROMPT_PLUG_IN_REGEX.exec(prompt)) !== null) {
		const key = match[1];
		const display = match[2];
		const value = match[3] || null;

		matches[key] = {
			display: display ?? '',
			value: value ?? ''
		};
	}

	return matches;
}

export function blendPlugInPrompt(prompt: string, plugIn: Record<string, string>): string {
	const PROMPT_PLUG_IN_REGEX = promptPlugInRegex();
	return prompt.replace(PROMPT_PLUG_IN_REGEX, (match, key) => {
		// 确保 plugIn[key] 存在且是字符串
		const newValue = plugIn[key];
		return newValue !== undefined && typeof newValue === 'string' ? newValue : match;
	});
}
