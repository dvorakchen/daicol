import { describe, it, expect } from 'vitest';
import { extractPromptPlugInFromPrompt, blendPlugInPrompt } from './app.ts'; // 请确保路径正确

// ---
// 设计说明:
// Regex 通过函数生成，每次调用都返回一个新的 /\{(\w+?)\((.+?)\)(?:=([\s\S]+?))\}/gm 实例。
// 这避免了 lastIndex 共享问题，并且模式要求插件必须包含非空的默认值。
// ---

// ---
// ---

describe('extractPromptPlugInFromPrompt', () => {
	// Test Case 1: Single valid plugin
	it('should extract a single plugin with a defined non-empty value', () => {
		const prompt = 'This is a test prompt with {name(Username)=John Doe}.';
		const expected = {
			name: {
				display: 'Username',
				value: 'John Doe'
			}
		};
		expect(extractPromptPlugInFromPrompt(prompt)).toEqual(expected);
	});

	// Test Case 2: Multiple different plugins
	it('should extract multiple different plugins correctly', () => {
		const prompt =
			'Template {type(Document Type)=Report} for user {user(User ID)=123} at {time(Time)=09:00}.';
		const expected = {
			type: {
				display: 'Document Type',
				value: 'Report'
			},
			user: {
				display: 'User ID',
				value: '123'
			},
			time: {
				display: 'Time',
				value: '09:00'
			}
		};
		expect(extractPromptPlugInFromPrompt(prompt)).toEqual(expected);
	});

	// Test Case 3: Plugin value containing newlines (using \s\S ensures multiline content is captured)
	it('should handle plugin values containing newlines or other characters', () => {
		const prompt = 'Test with multiline value: {content(Body)=\nThis is a multiline\nvalue}.';
		const expected = {
			content: {
				display: 'Body',
				value: '\nThis is a multiline\nvalue'
			}
		};
		expect(extractPromptPlugInFromPrompt(prompt)).toEqual(expected);
	});

	// Test Case 4: Invalid plugin format (missing the required value)
	it('should NOT extract a plugin if the required value part is missing', () => {
		const prompt = 'Hello, {name(Username)}! This {valid(ID)=123} is extracted.';
		const expected = {
			valid: {
				display: 'ID',
				value: '123'
			}
		};
		// {name(Username)} 不包含 '=value' 部分，因此不匹配
		expect(extractPromptPlugInFromPrompt(prompt)).toEqual(expected);
	});

	// Test Case 5: Plugin with an empty value
	it('should NOT extract a plugin if the value part is empty (due to + quantifier)', () => {
		// 正则 (?:=([\s\S]+?)) 要求 value 必须至少有一个字符
		const prompt = 'Plugin with empty value: {empty(Test)=}.';
		const expected = {};
		expect(extractPromptPlugInFromPrompt(prompt)).toEqual(expected);
	});
});

// ---
// ---

describe('blendPlugInPrompt', () => {
	// Test Case 1: Single plugin replacement
	it('should replace a single valid plugin with its corresponding value', () => {
		const prompt = 'The author is {user(Username)=unknown}.';
		const plugIn = {
			user: 'Jane Doe'
		};
		const expected = 'The author is Jane Doe.';
		expect(blendPlugInPrompt(prompt, plugIn)).toBe(expected);
	});

	// Test Case 2: Multiple plugin replacements
	it('should replace multiple plugins with their corresponding values', () => {
		const prompt = 'The {item(Object)=thing} is {color(Color)=red}.';
		const plugIn = {
			item: 'apple',
			color: 'green'
		};
		const expected = 'The apple is green.';
		expect(blendPlugInPrompt(prompt, plugIn)).toBe(expected);
	});

	// Test Case 3: Plugin key missing in plugIn map (should keep original plugin structure)
	it('should keep the original plugin string if its key is missing in the plugIn map', () => {
		const prompt = 'Replace this: {present(Key)=default} and keep this: {missing(Key)=default}.';
		const plugIn = {
			present: 'ReplacedValue'
		};
		const expected = 'Replace this: ReplacedValue and keep this: {missing(Key)=default}.';
		// Logic: newValue = undefined => replacer returns the original 'match' string
		expect(blendPlugInPrompt(prompt, plugIn)).toBe(expected);
	});

	// Test Case 5: Prompt containing an invalid plugin (no replacement, should keep invalid part)
	it('should ignore and keep invalid plugin formats (missing value)', () => {
		const prompt = 'Valid {v(V)=1} and Invalid {i(I)}.';
		const plugIn = { v: 'Valid' };
		// 只有 {v(V)=1} 被替换，{i(I)} 因为不匹配新正则而保持不变
		const expected = 'Valid Valid and Invalid {i(I)}.';
		expect(blendPlugInPrompt(prompt, plugIn)).toBe(expected);
	});

	// Test Case 6: Replacement value is an empty string
	it('should replace plugin with an empty string if provided', () => {
		const prompt = 'Replace {r(R)=old} with empty.';
		const plugIn = { r: '' };
		const expected = 'Replace  with empty.';
		// newValue 是 ""，它是 defined 且是 string，所以替换发生
		expect(blendPlugInPrompt(prompt, plugIn)).toBe(expected);
	});
});
