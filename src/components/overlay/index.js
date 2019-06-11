import { use } from '../use';
import { emit, inherit } from '../../utils/functional';

const [sfc, bem] = use('overlay');

function Overlay(
  h,
  props,
  slots,
  ctx
) {
  const style = {
    zIndex: props.zIndex,
    ...props.customStyle
  };

  return (
    <transition name="van-fade">
      <div
        vShow={props.visible}
        style={style}
        class={[bem(), props.className]}
        onTouchmove={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onClick={(event) => {
          emit(ctx, 'click', event);
        }}
        {...inherit(ctx, true)}
      />
    </transition>
  );
}

Overlay.props = {
  zIndex: Number,
  className: null,
  visible: Boolean,
  customStyle: Object
};

export default sfc(Overlay);
