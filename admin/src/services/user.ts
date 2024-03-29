import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function prelogin(): Promise<any> {
  return request('/admin/user/prelogin');
}

export async function login(data: object): Promise<any> {
  return request.post('/admin/user/login', { data });
}
