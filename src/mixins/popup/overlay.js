import Overlay from '../../components/overlay';
import { context } from './context';
import { mount } from '../../utils/functional';

const defaultConfig = {
  className: '',
  customStyle: {}
};

let overlay;

// close popup when click overlay && closeOnClickOverlay is true
function onClickOverlay() {
  if (context.top) {
    const { vm } = context.top;
    vm.$emit('click-overlay');

    if (vm.closeOnClickOverlay) {
      if (vm.onClickOverlay) {
        vm.onClickOverlay();
      } else {
        vm.close();
      }
    }
  }
}

export function updateOverlay() {
  if (!overlay) {
    overlay = mount(Overlay, {
      on: {
        click: onClickOverlay
      }
    });
  }

  if (context.top) {
    const { vm, config } = context.top;

    const el = vm.$el;
    const target = el && el.parentNode ? el.parentNode : document.body;
    if (target) {
      target.appendChild(overlay.$el);
    }

    Object.assign(overlay, defaultConfig, config, {
      visible: true
    });
  } else {
    overlay.visible = false;
  }
}

export function openOverlay(vm, config){
  if (!context.stack.some(item => item.vm === vm)) {
    context.stack.push({ vm, config });
    updateOverlay();
  }
}

export function closeOverlay(vm){
  const { stack } = context;

  if (stack.length) {
    if (context.top.vm === vm) {
      stack.pop();
      updateOverlay();
    } else {
      context.stack = stack.filter(item => item.vm !== vm);
    }
  }
}
