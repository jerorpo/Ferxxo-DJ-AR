import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'AbrirSpotify',

  schema: {
    url: ecs.string,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('esperando')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {

        const {url} = schemaAttribute.get(eid)

        if (url) {
          window.open(url, '_blank')
        }
      })
  },
})