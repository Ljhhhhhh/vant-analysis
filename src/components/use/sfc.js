/**
 * Create a basic component with common options
 */
import Vue from 'vue';
import { camelize } from '../../utils/string';
import { SlotsMixin } from '../../utils/slots';

const arrayProp = {
  type: Array,
  default: () => []
};

const numberProp = {
  type: Number,
  default: 0
};

function defaultProps(props) {
  Object.keys(props).forEach(key => {
    if (props[key] === Array) {
      props[key] = arrayProp;
    } else if (props[key] === Number) {
      props[key] = numberProp;
    }
  });
}

/**
 * 
 * @param {*} Vue 
 * @param {*} opt 
 */

function install() {
  // Vue.use(Button) this 指向utton
  const { name } = this;
  Vue.component(name, this);
  Vue.component(camelize(`-${name}`), this);
}

// unify slots & scopedSlots
export function unifySlots(context) {
  // use data.scopedSlots in lower Vue version
  const scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
  const slots = context.slots();
  Object.keys(slots).forEach(key => {
    if (!scopedSlots[key]) {
      scopedSlots[key] = () => slots[key];
    }
  });
  return scopedSlots;
}

// should be removed after Vue 3
function transformFunctionComponent(pure){
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: (h, context) => {
      return pure(h, context.props, unifySlots(context), context)
    }
  };
}

export function useSFC(name) {
  return function (sfc) {
    if (typeof sfc === 'function') {
      sfc = transformFunctionComponent(sfc);
    }

    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(SlotsMixin);
    }

    if (sfc.props) {
      defaultProps(sfc.props);
    }

    sfc.name = name;
    sfc.install = install;

    return sfc;
  };
}
