import { use } from '../use';
import { emit, inherit } from '../../utils/functional';
import { routeProps, functionalRoute } from '../../utils/router';

const [sfc, bem] = use('button');

function Button(
  h,
  props,
  slots,
  ctx
) {
  const { tag, type, disabled, loading, hairline } = props;
  function onClick(event) {
    if (!loading && !disabled) {
      emit(ctx, 'click', event);
      functionalRoute(ctx);
    }
  }

  function onTouchstart(event) {
    emit(ctx, 'touchstart', event);
  }

  const classes = [
    bem([
      type,
      props.size,
      {
        disabled,
        hairline,
        block: props.block,
        plain: props.plain,
        round: props.round,
        square: props.square
      }
    ]),
    { 'van-hairline--surround': hairline }
  ];

  function Content() {
    const content = [];

    let text;
    text = slots.default ? slots.default() : props.text;

    if (text) {
      content.push(<span class={bem('text')}>{text}</span>);
    }

    return content;
  }

  return (
    <tag
      class={classes}
      type={props.nativeType}
      disabled={disabled}
      onClick={onClick}
      onTouchstart={onTouchstart}
      {...inherit(ctx)}
    >
      {Content()}
    </tag>
  );
}

Button.props = {
  ...routeProps,
  text: String,
  icon: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  nativeType: String,
  loadingText: String,
  loadingType: String,
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'normal'
  },
  loadingSize: {
    type: String,
    default: '20px'
  }
};

export default sfc(Button);
