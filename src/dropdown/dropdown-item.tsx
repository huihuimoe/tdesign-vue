import Vue, { VueConstructor } from 'vue';
import { ChevronRightIcon as TIconChevronRight } from 'tdesign-icons-vue';
import TDivider from '../divider';
import { prefix } from '../config';
import itemProps from './dropdown-item-props';
import { STATUS_CLASSNAMES } from '../utils/classnames';
import { DropdownOption } from './type';

import { renderContent } from '../utils/render-tnode';
import { emitEvent } from '../utils/event';
import ripple from '../utils/ripple';

import { TNodeReturnValue } from '../common';

const name = `${prefix}-dropdown__item`;

export interface DropdownItemInstance extends Vue {
  dropdown: {
    handleMenuClick: (data: DropdownOption, context: { e: MouseEvent }) => void
  };
}

export default (Vue as VueConstructor<DropdownItemInstance>).extend({
  name: 'TDropdownItem',
  components: {
    TIconChevronRight,
    TDivider,
  },
  directives: { ripple },
  inject: {
    dropdown: {
      default: undefined,
    },
  },
  props: {
    ...itemProps,
    path: {
      type: String,
      default: '',
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    renderSuffix(): TNodeReturnValue {
      return this.hasChildren ? <TIconChevronRight class={`${name}-icon`} /> : null;
    },
    handleItemClick(e: MouseEvent): void {
      if (!this.hasChildren && !this.disabled) {
        const data = {
          value: this.value,
          path: this.path,
          content: this.content,
        };

        emitEvent(this, 'item-hover', this.path);
        emitEvent(this, 'click', data, { e }); // dropdown item的点击回调
        this.dropdown.handleMenuClick(data, { e });
      }
    },
    handleMouseover(): void {
      emitEvent(this, 'hover', this.path);
    },
  },
  render() {
    const classes = [
      name,
      {
        [`${prefix}-dropdown--suffix`]: this.hasChildren,
        [STATUS_CLASSNAMES.disabled]: this.disabled,
        [STATUS_CLASSNAMES.active]: this.active,
      },
    ];
    return (
      <div>
        <div
          v-ripple
          class={classes}
          onClick={this.handleItemClick}
          onMouseover={this.handleMouseover}
        >
          <div class={`${name}-content`}>
            <span class={`${name}-text`}>{renderContent(this, 'content', 'default')}</span>
          </div>
          {this.renderSuffix()}
        </div>
        {this.divider ? <TDivider /> : null}
      </div>
    );
  },
});
