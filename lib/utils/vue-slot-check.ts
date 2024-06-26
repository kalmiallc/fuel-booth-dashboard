import { Comment, Fragment, Text, type Slot, type VNode } from 'vue';

export function asArray<T>(arg: T | T[] | null) {
  return Array.isArray(arg) ? arg : arg !== null ? [arg] : [];
}

function isVNodeEmpty(vnode: VNode | VNode[] | undefined | null) {
  return (
    !vnode ||
    asArray(vnode).every(
      vnode =>
        vnode.type === Comment ||
        (vnode.type === Text && !vnode.children?.length) ||
        (vnode.type === Fragment && !vnode.children?.length)
    )
  );
}

export function hasSlotContent(slot: Slot | undefined | null, props: any = {}) {
  return !isSlotEmpty(slot, props);
}

export function isSlotEmpty(slot: Slot | undefined | null, props: any = {}) {
  return isVNodeEmpty(slot?.(props));
}
