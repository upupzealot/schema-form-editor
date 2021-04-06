isVue2=`cat ./node_modules/vue/package.json | grep "\"version\": \"2"`

if [ -z "$isVue2" ]; then
  # link vue
  cd ./node_modules/vue2
  npm link --production
  cd ../../
  npm link vue

  # link vuex
  cd ./node_modules/vuex3
  npm link --production
  cd ../../
  npm link vuex

  # link vuedraggable
  cd ./node_modules/vuedraggable2
  npm link --production
  cd ../../
  npm link vuedraggable
fi
