/**
 * 防抖装饰器
 * @param wait 间隔等待时间
 * @param startImmediate 首次是否立即执行
 * @returns 操作防抖实例
 */
function useDebounce(
  wait: number = 100,
  startImmediate: boolean = true
): MethodDecorator {
  return <T>(
    target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> | void => {
    let timer: number;
    const original: Function = descriptor.value as Function;
    (descriptor.value as any) = function (...params: Array<any>): void {
      if (startImmediate) {
        startImmediate = false;
        timer = window.setTimeout((): void => {
          original.call(target, ...params);
        });
      } else {
        if (timer) {
          clearTimeout(timer);
        }
        timer = window.setTimeout((): void => {
          original.call(target, ...params);
        }, wait);
      }
    };
  };
}

/**
 * 节流装饰器
 * @param wait 间隔等待时间
 * @param startImmediate 首次是否立即执行
 * @returns 节流防抖实例
 */
function useThrottle(
  wait: number = 100,
  startImmediate: boolean = true
): MethodDecorator {
  return <T>(
    target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> | void => {
    const locker: Int8Array = new Int8Array([0]);
    const original: Function = descriptor.value as Function;
    (descriptor.value as any) = (...params: Array<any>): void => {
      if (startImmediate) {
        startImmediate = false;
        original.call(target, ...params); // 粗暴的方案
      } else {
        if (locker[0]) {
          return;
        }
        Atomics.xor(locker, 0, 1);
        setTimeout((): void => {
          original.call(target, ...params);
          Atomics.xor(locker, 0, 1);
        }, wait);
      }
    };
  };
}

function effectA<T>(
  _target: Object,
  _propertyKey: string | symbol,
  _descriptor: TypedPropertyDescriptor<T>
): void {
  console.log("effect A");
}

function effectB(): MethodDecorator {
  return (): void => {
    console.log("effect B");
  };
}

export { useDebounce, useThrottle, effectA, effectB };
