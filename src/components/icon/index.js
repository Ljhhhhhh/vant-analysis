import { use } from '../use';
import { inherit } from '../../utils/functional';
// import Info from '../info';
import { isSrc } from '../../utils/string';



const [sfc] = use('icon');

function Icon(
  h,
  props,
  slots,
  ctx
) {
  const urlIcon = isSrc(props.name);

  return (
    <props.tag
      class={[
        props.classPrefix,
        urlIcon ? 'van-icon--image' : `${props.classPrefix}-${props.name}`
      ]}
      style={{
        color: props.color,
        fontSize: props.size
      }}
      {...inherit(ctx, true)}
    >
      {slots.default && slots.default()}
      {urlIcon && <img src={props.name} />}
    </props.tag>
  );
}

// <Info info={props.info} />

Icon.props = {
  name: String,
  size: String,
  color: String,
  info: [String, Number],
  tag: {
    type: String,
    default: 'i'
  },
  classPrefix: {
    type: String,
    default: 'van-icon'
  }
};

export default sfc(Icon);
