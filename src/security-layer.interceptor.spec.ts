import { SecurityLayerInterceptor } from './security-layer.interceptor';

describe('SecurityLayerInterceptor', () => {
  it('should be defined', () => {
    expect(new SecurityLayerInterceptor()).toBeDefined();
  });
});
