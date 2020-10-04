export default {
  computed: {
    nodePlaceholder() {
      return `请输入${this.field.label}`;
    },
    note: {
      get() {
        return this.rule.note === this.nodePlaceholder ? '' : this.rule.note;
      },
      set(noteStr) {
        this.$set(this.rule, 'note', noteStr || undefined)
      }
    },
    trigger: {
      get() {
        if(this.rule.trigger) {
          if(_.isArray(this.rule.trigger)) {
            return this.rule.trigger
          } else {
            return [this.rule.trigger];
          }
        } else {
          return [];
        }
      },
      set(triggers) {
        if(triggers.length === 1) {
          this.$set(this.rule, 'trigger', triggers[0])
        } else {
          this.$set(this.rule, 'trigger', triggers)
        }
      }
    }
  }
}
