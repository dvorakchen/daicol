import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest';
// 根据你的实际路径调整导入
import { isAdmin } from './auth.ts';
import { isJwtValid, tryGetPayloadSub } from '$lib/server/jwt.ts';
import type { UserRepo } from '$lib/server/repo/users.ts';
import { UserStatus } from '$lib/share/index.ts';

// Mock 外部依赖
vi.mock('$lib/server/jwt');
vi.mock('$lib/server/repo/users');

const mockIsJwtValid = isJwtValid as Mock;
const mockTryGetPayloadSub = tryGetPayloadSub as Mock;

describe('isAdmin', () => {
	const mockJwtToken = 'mock.jwt.token';
	const mockJwtKey = 'secret-key';
	const mockUserId = '123';

	let mockUserRepo: UserRepo;

	beforeEach(() => {
		// 重置所有 mock
		vi.clearAllMocks();

		// 创建 UserRepo mock
		mockUserRepo = {
			getAdminUserById: vi.fn()
			// 添加其他必要的方法以满足类型要求
		} as unknown as UserRepo;
	});

	it('应该返回 false 当 JWT 无效时', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(false);

		// 执行
		const result = await isAdmin(mockJwtToken, mockJwtKey, mockUserRepo);

		// 断言
		expect(result).toBe(false);
		expect(mockIsJwtValid).toHaveBeenCalledWith(mockJwtToken, mockJwtKey);
		expect(mockTryGetPayloadSub).not.toHaveBeenCalled();
		expect(mockUserRepo.getAdminUserById).not.toHaveBeenCalled();
	});

	it('应该返回 false 当无法获取 sub 时', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(true);
		mockTryGetPayloadSub.mockReturnValue(null);

		// 执行
		const result = await isAdmin(mockJwtToken, mockJwtKey, mockUserRepo);

		// 断言
		expect(result).toBe(false);
		expect(mockIsJwtValid).toHaveBeenCalledWith(mockJwtToken, mockJwtKey);
		expect(mockTryGetPayloadSub).toHaveBeenCalledWith(mockJwtToken, mockJwtKey);
		expect(mockUserRepo.getAdminUserById).not.toHaveBeenCalled();
	});

	it('应该返回 false 当用户不存在时', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(true);
		mockTryGetPayloadSub.mockReturnValue(mockUserId);
		(mockUserRepo.getAdminUserById as Mock).mockResolvedValue(null);

		// 执行
		const result = await isAdmin(mockJwtToken, mockJwtKey, mockUserRepo);

		// 断言
		expect(result).toBe(false);
		expect(mockIsJwtValid).toHaveBeenCalledWith(mockJwtToken, mockJwtKey);
		expect(mockTryGetPayloadSub).toHaveBeenCalledWith(mockJwtToken, mockJwtKey);
		expect(mockUserRepo.getAdminUserById).toHaveBeenCalledWith(mockUserId);
	});

	it('应该返回 false 当用户状态不是 Enabled 时', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(true);
		mockTryGetPayloadSub.mockReturnValue(mockUserId);
		(mockUserRepo.getAdminUserById as Mock).mockResolvedValue({
			id: mockUserId,
			status: UserStatus.Disabled // 或者其他非 Enabled 状态
			// 其他用户属性...
		});

		// 执行
		const result = await isAdmin(mockJwtToken, mockJwtKey, mockUserRepo);

		// 断言
		expect(result).toBe(false);
		expect(mockUserRepo.getAdminUserById).toHaveBeenCalledWith(mockUserId);
	});

	it('应该返回 true 当 JWT 有效、用户存在且状态为 Enabled 时', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(true);
		mockTryGetPayloadSub.mockReturnValue(mockUserId);
		(mockUserRepo.getAdminUserById as Mock).mockResolvedValue({
			id: mockUserId,
			status: UserStatus.Enabled
			// 其他用户属性...
		});

		// 执行
		const result = await isAdmin(mockJwtToken, mockJwtKey, mockUserRepo);

		// 断言
		expect(result).toBe(true);
		expect(mockIsJwtValid).toHaveBeenCalledWith(mockJwtToken, mockJwtKey);
		expect(mockTryGetPayloadSub).toHaveBeenCalledWith(mockJwtToken, mockJwtKey);
		expect(mockUserRepo.getAdminUserById).toHaveBeenCalledWith(mockUserId);
	});

	// 边界情况测试
	it('应该正确处理空字符串 token', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(false);

		// 执行
		const result = await isAdmin('', mockJwtKey, mockUserRepo);

		// 断言
		expect(result).toBe(false);
	});

	it('应该正确处理空字符串 key', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(false);

		// 执行
		const result = await isAdmin(mockJwtToken, '', mockUserRepo);

		// 断言
		expect(result).toBe(false);
	});

	// 错误处理测试
	it('应该返回 false 当 userRepo 方法抛出异常时', async () => {
		// 安排
		mockIsJwtValid.mockReturnValue(true);
		mockTryGetPayloadSub.mockReturnValue(mockUserId);
		(mockUserRepo.getAdminUserById as Mock).mockRejectedValue(new Error('Database error'));

		// 执行
		await expect(isAdmin(mockJwtToken, mockJwtKey, mockUserRepo)).rejects.toThrow('Database error');
	});
});
