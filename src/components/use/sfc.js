/**
 * Create a basic component with common options
 */
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

//  const tmp = {
//   render: function(createElement) {
//     var self = this;
//     return createElement('div', {//一个包含模板相关属性的数据对象
//         'class': {
//             foo: true,
//             bar: false
//         },
//         on: {
//           click: () => {
//             console.log('hello');
//           }
//         },
//         style: {
//             color: 'red',
//             fontSize: '14px'
//         },
//         attrs: {
//             id: 'foo'
//         },
//         domProps: {
//             innerHTML: 'baz'
//         }
//     });
//   }
// }

function install(Vue, opt) {
  console.log(opt, 'opt');
  const { name } = opt;
  Vue.component(name, opt);
  Vue.component(camelize(`-${name}`), opt);
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
