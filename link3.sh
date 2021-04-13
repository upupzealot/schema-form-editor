isVue3=`cat ./node_modules/vue/package.json | grep "\"version\": \"3"`

if [ -z "$isVue3" ]; then
  # link vue
  cd ./node_modules/vue3
  npm link --production
  cd ../../
  npm link vue

  # link vuex
  cd ./node_modules/vuex4
  npm link --production
  cd ../../
  npm link vuex

  # link vuedraggable
  cd ./node_modules/vuedraggable4
  npm link --production
  cd ../../
  npm link vuedraggable

  # link ant-design
  cd ./node_modules/ant-design-vue2
  npm link --production
  cd ../../
  npm link ant-design-vue
fi
