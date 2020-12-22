import FormRender from './form-render.vue';

import Blank from './form-items/blank.vue';
import Checkbox from './form-items/checkbox.vue';
import DatePicker from './form-items/date-picker.vue';
import Input from './form-items/input.vue';
import InputNumber from './form-items/input-number.vue';
import ItemList from './form-items/item-list.vue';
import Radio from './form-items/radio.vue';
import Select from './form-items/select.vue';
import Subform from './form-items/subform.vue';
import Switch from './form-items/switch.vue';

import defaults from './form-items/defaults';
import standardMixin from './form-items/standard-mixin';
import axios from 'axios';

export {
  Blank,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  ItemList,
  Radio,
  Select,
  Subform,
  Switch,
  defaults,
  standardMixin,
  axios,
};

export default FormRender;
