import { EMPTY } from 'rxjs';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { QS_REDIRECT_KEY } from '$lib/share/index.ts';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export type Headers = Readonly<Record<string, string>>;

export const HTTP_SERVER_KEY = Symbol.for('httpDIServerKey');

export interface Http {
	get<T>(url: string, headers?: Headers): Promise<T>;
	post<T>(url: string, body?: unknown, headers?: Headers): Promise<T>;
	delete<T>(url: string, body?: unknown, headers?: Headers): Promise<T>;
	put<T>(url: string, body?: unknown, headers?: Headers): Promise<T>;
	postFile<T>(url: string, files: File[], listData: Record<string, string>): Promise<T>;
}

export class AxiosHttp implements Http {
	private instance;

	constructor(apiHost: string) {
		this.instance = axios.create({
			baseURL: apiHost,
			timeout: 60_000
		});

		this.instance.interceptors.response.use(undefined, (error) => {
			switch (error.response?.status) {
				case 401: {
					redirectToSignin();
					return EMPTY;
				}
				case 400:
				case 422: {
					throw error;
				}
				default: {
					throw error;
				}
			}
		});
	}
	/**
	 * 基础请求方法，用于处理 GET, POST, DELETE
	 */
	private async request<T>(
		method: 'get' | 'post' | 'delete' | 'put',
		url: string,
		headers: Headers = {},
		body?: unknown
	): Promise<T> {
		const finalHeaders = {
			...headers
		};

		// 默认 Content-Type 为 application/json，除非明确设置或 body 为 FormData
		if (!(body instanceof FormData) && !finalHeaders['Content-Type']) {
			finalHeaders['Content-Type'] = 'application/json';
		}

		// Axios 配置
		const config: AxiosRequestConfig = {
			url,
			method,
			headers: finalHeaders,
			data: body // POST, DELETE 请求体使用 data 字段
		};

		try {
			// 发起请求
			const response: AxiosResponse<T> = await this.instance.request(config);
			return response.data; // 返回响应体数据
		} catch (error) {
			if (
				axios.isAxiosError(error) &&
				(error.response?.status === 400 || error.response?.status === 422)
			) {
				throw error.response?.data; // 抛出响应体数据，通常包含业务错误信息
			}

			// 对于其他未被拦截器特殊处理的错误（如超时、网络错误等），直接抛出
			throw error;
		}
	}

	// 实现 Http 接口方法
	get<T>(url: string, headers?: Headers): Promise<T> {
		// GET 请求不发送 body
		return this.request<T>('get', url, headers);
	}

	post<T>(url: string, body?: unknown, headers?: Headers): Promise<T> {
		return this.request<T>('post', url, headers, body);
	}

	delete<T>(url: string, body?: unknown, headers?: Headers): Promise<T> {
		return this.request<T>('delete', url, headers, body);
	}

	put<T>(url: string, body?: unknown, headers?: Headers): Promise<T> {
		return this.request<T>('delete', url, headers, body);
	}

	postFile<T>(url: string, files: File[], listData: Record<string, string> = {}): Promise<T> {
		const formData = new FormData();

		files.forEach((file) => {
			formData.append(`file`, file);
		});
		Object.entries(listData).forEach(([key, value]) => {
			formData.append(key, value);
		});

		// 文件上传请求，body 是 FormData，Content-Type 会被浏览器/axios 自动设置为 multipart/form-data
		return this.request<T>('post', url, {}, formData);
	}
}

const redirectToSignin = () => {
	console.warn('401');
	goto(`/signin?${QS_REDIRECT_KEY}=${page.url.pathname}`, {
		replaceState: true
	});
};
